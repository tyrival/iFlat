Ext.define('iFlat.view.sm.ScCommercialCenterSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-scsettlement',

// 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                var obj = Ext.JSON.decode(response.responseText)['object'];
                if (obj) {
                    var record = Ext.create('iFlat.model.sm.ScSettlement', obj);
                    record.set('scSettlement.id', obj['id']);
                    var form = field.up('form');
                    form.loadRecord(record);
                    field.up('window').down('textarea[name=comment]').setValue('');

                } else {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                }
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    updateDetail: function(editor, context, eOpts) {
        var rec = context.record;
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_saveScSettlementDetail.action',
            method: 'post',
            params: rec.getData(),
            success: function(response, opts) {
                smScCommercialCenterSettlementDetailStore.reload();
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                smScCommercialCenterSettlementDetailStore.reload();
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },
    
    comment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listScSettlementComment.action',
                extraParams: {
                    'scSettlement.id': Ext.getCmp('sm-sccommercialcentersettlement-id').getValue()
                }
            }
        }))
        win.show();
    },

    /**
     * 自动更新明细行数据
     */
    loadDetail: function (field, newValue, oldValue, eOpts) {

        smScCommercialCenterSettlementDetailStore.getProxy()
            .extraParams['scSettlementDetail.pid'] = newValue;
        smScCommercialCenterSettlementDetailStore.reload();
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('sm-scsettlementapproveinfo-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    completeTask: function (btn) {
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        var comment = Ext.getCmp('sm-sccommercialcentersettlement-comment').getValue();
        if (Flat.util.isEmpty(comment)) {
            comment = text === 'pass' ? '同意' : '不同意';
        }
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_approveScSettlement.action',
            method: 'post',
            params: {
                'scSettlement.id': Ext.getCmp('sm-sccommercialcentersettlement-id')
                    .getValue(),
                'outGoingName': text,
                'comment': comment,
            },
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                Ext.getCmp('sm-sccommercialcentersettlement').hide();
                Ext.getCmp('sm-sccommercialcentersettlement-comment').setValue('');
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                Ext.getCmp('sm-sccommercialcentersettlement').hide();
                Ext.getCmp('sm-sccommercialcentersettlement-comment').setValue('');
            }
        });
    },

    calcAmount: function (textfield, newValue, oldValue, eOpts) {
        var name = textfield.getName();
        var price;
        var qty;
        var amount;
        price = textfield;
        qty = textfield.nextSibling('textfield[name=scSettlementDetail.matQty]');
        if (Flat.util.isEmpty(qty)) {
            qty = textfield.previousSibling('textfield[name=scSettlementDetail.matQty]');
        };
        amount = textfield.nextSibling('textfield[name=scSettlementDetail.amount]');
        if (Flat.util.isEmpty(amount)) {
            amount = textfield.previousSibling('textfield[name=scSettlementDetail.amount]');
        };

        var a = price.getValue() * qty.getValue();
        amount.setValue(a);
    }
});