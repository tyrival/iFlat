Ext.define('iFlat.view.sm.SrWorkshopSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srworkshopsettlement',

    // 根据processInstanceId查询对应的business对象，并加载到form中
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                var obj = Ext.JSON.decode(response.responseText)['object'];
                var type = '';
                var id = '';
                if (obj) {
                    var record = Ext.create('iFlat.model.sm.SrSettlement', obj);
                    type = obj['type'];
                    id = obj['id'];
                    record.set('srSettlement.id', id);
                }
                field.up('form').loadRecord(record);

                // 加载二级结算已分配的列表
                if (!Flat.util.isEmpty(id)) {
                    var panel = field.up('window').down('panel[name=detail]');
                    var store;
                    if (type != 'Sys') {
                        Flat.util.unmask();
                        store = panel.down('sm-detail-srsettlementsecondgrid').getStore();
                        store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
                        store.reload();
                    } else {
                        store = panel.down('sm-detail-srsettlementseconddetailsys').getStore();
                        store.reload({
                            proxy: {
                                type: 'ajax',
                                url: 'sm_listSrSettlementDetlSecondBySrSettlement.action',
                                extraParams: {
                                    'srSettlement.id': id
                                },
                            },
                            callback: function(records, option, success) {
                                Flat.util.unmask();
                            }
                        });
                    }
                }
                
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    // 根据单据类型，显示或隐藏部分元素
    changeEleByType: function (field, newValue, oldValue, eOpts) {
        var win = field.up('window');
        var team = win.down('textfield[name=team]');
        var amount = win.down('textfield[name=summaryAmountSecond]');
        var second = win.down('container[name=sysSecond]');
        var completeProcess = win.down('button[name=completeProcess]');
        var panel = win.down('panel[name=detail]');
        
        team.setHidden(newValue != 'Sys');
        amount.setHidden(newValue != 'Sys');
        second.setHidden(newValue != 'Sys');
        completeProcess.setHidden(newValue == 'Sys');
        panel.down('sm-detail-srsettlementsecondgrid').setHidden(newValue == 'Sys');
        panel.down('sm-detail-srsettlementseconddetailsys').setHidden(newValue != 'Sys');
    },

    // 根据输入的金额，自动计算总额，仅限于机电修理
    changeSummaryAmount: function(field, newValue, oldValue, eOpts) {
        var sumField = field.up('window').down('textfield[name=summaryAmountSecond]');
        var sum = parseFloat(sumField.getValue());
        if (!sum) {
            sum = 0;
        }
        sum += (newValue - oldValue);
        sumField.setValue(sum);
    },

    // 显示历史批注
    showComment: function (btn) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listSrSettlementComment.action',
                extraParams: {
                    'srSettlement.id': btn.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },

    // 刷新grid数据
    refresh: function (btn) {
        btn.up('grid').getStore().reload()
    },

    // 根据是否有附件，显示附件下载按钮
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = field.up('form').down('button[name=down]');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    // 获取部门总结余
    getBalanceOfDept: function(field, newValue, oldValue, eOpts) {
        var dept = newValue;
        var balance = field.up('window').down('textfield[name=balance]');
        //Flat.util.mask('加载中...');
        Ext.Ajax.request({
            url: 'sm_listSrSettlementBalance.action',
            method: 'post',
            params: {
                'srSettlementBalance.deptName': dept
            },
            success: function(response, opts) {
                var list = Ext.JSON.decode(response.responseText)['list'];
                balance.setValue(list[0]['amount']);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    // 完成Task，后台根据单据类型不同，来分别处理机电修理和主体/零星
    completeTask: function (btn) {

        var win = btn.up('window');
        var form = win.down('form[name=approve]');
        if (form.isValid()) {
            form.submit({
                url: 'sm_approveSrSettlementSecond.action',
                params: {
                    'srSettlement.id':win.down('textfield[name=id]').getValue()
                },
                method: 'POST',
                waitMsg: '保存中...',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                }
            })
        }
    },

    completeProcess: function (btn) {

        var me = btn;
        var firstTip = "结束流程将使此一级结算单不再向后流转，通常，当同一部门出现多个一级结算流程，并且都未进行二级结算时，为了将多个一级结算流程合并为一个二级结算流程时，可在某个一级结算流程上进行分配，并且将其他一级结算流程通过此操作结束。请问是否满足上述情形？";
        Ext.Msg.confirm("提示!", firstTip, function(btn) {

            if (btn == 'no') {
                return;
            }
            
            Ext.Msg.confirm ("提示!", "结束流程操作为单向操作，不可恢复，是否继续？", function (btn) {
                
                if (btn == "no") {
                    return;
                }
                
                var win = me.up('window');
                var form = win.down('form[name=approve]');
                if (form.isValid()) {
                    form.submit({
                        url: 'workflow_completeTask.action',
                        params: {
                            'taskId': win.down('textfield[name=id]').getValue(),
                            'outGoingName': 'completeProcess'
                        },
                        method: 'POST',
                        waitMsg: '正在结束流程...',
                        success: function (fp, o) {
                            Flat.util.tip(o.response.responseText);
                            win.hide();
                            Ext.getCmp('main-view-tabpanel').getActiveTab()
                                .getStore().reload();
                        },
                        failure: function (fp, o) {
                            Flat.util.tip(o.response.responseText);
                            win.hide();
                            Ext.getCmp('main-view-tabpanel').getActiveTab()
                                .getStore().reload();
                        }
                    })
                }
            })
        })
    },

    /**
     * 机电修理单据
     */
});