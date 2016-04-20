Ext.define('iFlat.view.sm.SrCommercialCenterSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srcommercialcentersettlement',

    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                Flat.util.unmask();
                var obj = Ext.JSON.decode(response.responseText)['object'];
                var type = '';
                var id = '';
                if (obj) {
                    var record = Ext.create('iFlat.model.sm.SrSettlement', obj);
                    type = obj['type'];
                    id = obj['id'];
                    // 为了避免此处的id与taskId冲突
                    record.set('srSettlement.id', id);
                }
                var form = field.up('form');
                form.loadRecord(record);
                
                // 根据type选择相应的grid嵌入窗口
                var panel = field.up('window').down('panel[name=detail]');
                var items = panel.items.items;
                var xtype = 'sm-detail-srsettlementfirst' + type.toLowerCase();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.setHidden(!item.isXType(xtype));
                }
                // 刷新store
                if (!Flat.util.isEmpty(id)) {
                    var store = panel.down(xtype).getStore();
                    store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
                    store.reload();
                }

                //根据type显示或隐藏部分元素
                form.down('textfield[name=team]').setHidden(type != 'Sys');
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    changeSummaryAmount: function(field, newValue, oldValue, eOpts) {
        var sumField = field.up('window').down('textfield[name=summaryAmount]');
        var sum = parseFloat(sumField.getValue());
        if (!sum) {
            sum = 0;
        }
        // 如果是材料费，则变为减
        var diff = newValue - oldValue;
        if (field.getName() == "srSettlement.materialAmount") {
            diff = 0 - diff;
        }
        sum += diff;
        sumField.setValue(sum);
    },

    loadOrigRecord: function(field, newValue, oldValue, eOpts) {
        field.up('window')
            .down('textfield[name=srSettlement.' + field.getName() + ']')
            .setValue(newValue);
    },

    updateDetail: function (editor, context, eOpts) {
        var r = context.record;
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_saveSrSettlementDetlFirst.action',
            method: 'post',
            params: r.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

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

    refresh: function (btn) {
        btn.up('grid').getStore().reload()
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = field.up('form').down('button[name=down]');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    completeTask: function (btn) {

        var win = btn.up('window');
        var form = win.down('form[name=amount]');
        if (form.isValid()) {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            form.submit({
                url: 'sm_approveSrSettlementFirst.action',
                waitMsg: '提交中...',
                params: {
                    'srSettlement.id':win.down('textfield[name=srSettlement.id]').getValue(),
                    'outGoingName': text,
                },
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textfield[name=srSettlement.consumableAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.performanceAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.materialAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.laborAmount]').setValue(0);
                    form.down('textarea[name=comment]').setValue(0);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                }
            })
        }
    } 
    
});