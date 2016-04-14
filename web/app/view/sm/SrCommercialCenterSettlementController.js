Ext.define('iFlat.view.sm.SrCommercialCenterSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srcommercialcentersettlement',

    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
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
                }
                field.up('form').loadRecord(record);
                
                // 根据type选择相应的grid嵌入窗口
                var panel = field.up('window').down('panel[name=detail]');
                var xtype = 'sm-detail-srsettlementfirst' + type.toLowerCase();
                panel.add({ xtype : xtype });

                // 刷新store
                if (!Flat.util.isEmpty(id)) {
                    var store = panel.down(xtype).getStore();
                    store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
                    store.reload();
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    updateDetail: function (editor, context, eOpts) {
        var r = context.record;
        Ext.Ajax.request({
            url: 'sm_saveSrSettlementDetlFirst.action',
            method: 'post',
            params: r.getData(),
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },
/*

    amountFormat: function(value, metaData) {
        return Flat.util.financeFormat(value,2);
    },

    renderType: function(value, metaData) {
        return this.convertTypeToName(value);
    },

    convertTypeToName: function (type) {
        switch (type) {
            case "Main":
                type = "修船主体工程";
                break;
            case "Misc":
                type = "修船零星工程";
                break;
            case "Sys":
                type = "修船机电修理工程";
                break;
        }
        return type;
    },
*/

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
        var btnDown = Ext.getCmp('sm-srcommercialcentersettlementedit-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    completeTask: function (btn) {

        var comment = Ext.getCmp('sm-srcommercialcentersettlementedit-comment').getValue();
        if (Flat.util.isEmpty(comment)) {
            Ext.Msg.show({
                title:'警告',
                message: '请填写审批意见。',
            });
        } else {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            Ext.Ajax.request({
                url: 'sm_approveSrSettlement.action',
                method: 'post',
                params: {
                    'srSettlement.id': Ext.getCmp('sm-srcommercialcentersettlementedit-id')
                        .getValue(),
                    'outGoingName': text,
                    'comment': comment,
                },
                success: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-srcommercialcentersettlementedit').hide();
                    var active = Ext.WindowManager.getActive();
                    if (active && active.isXType('window')) {
                        active.down('grid').getStore().reload();
                    }
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-srcommercialcentersettlementedit').hide();
                    var active = Ext.WindowManager.getActive();
                    if (active && active.isXType('window')) {
                        active.down('grid').getStore().reload();
                    }
                }
            });
        }
    }
    
});