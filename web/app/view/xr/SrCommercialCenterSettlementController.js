Ext.define('iFlat.view.xr.SrCommercialCenterSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-srcommercialcenteraettlement',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        var store = Ext.create('iFlat.store.workflow.BusinessObj', {
            model: 'iFlat.model.xr.SrSettlement',
            proxy: {
                extraParams: {
                    'processInstanceId': newValue
                }
            }
        });
        store.reload({
            callback: function(records, option, success) {
                Flat.util.unmask();
                if (!success) {
                    Flat.util.tip(response.responseText);
                } else {
                    if (records != null && records.length > 0) {
                        var record = records[0];
                        record.set('id', newValue);
                        record.set('comment', '');
                        var form = field.up('form');
                        form.loadRecord(record);

                        var id = record.get('xrSrSettlement.id');
                        srCommercialCenterSettlementDetailStore.getProxy().extraParams['srSettlementDetl.pid'] = id;
                        srCommercialCenterSettlementDetailStore.reload({
                            callback: function () {
                                var amount = 0;
                                for (var i = 0; i < srCommercialCenterSettlementDetailStore.getCount(); i++) {
                                    amount += srCommercialCenterSettlementDetailStore.getAt(i).get('srSettlementDetl.amountFirst');
                                }
                                Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-sum').setValue(amount);
                                Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-act').setValue(amount);
                            }
                        });
                    }
                }
            }
        })
    },
    
    // 刷新grid数据
    refresh: function (btn) {
        btn.up('grid').getStore().reload()
    },

    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },

    completeTask: function (btn) {
        var amount = Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-sum').getValue();
        if (amount == 0) {
            this.calcAmountFirstSum();
        }
        var panel = btn.up('xr-srcommercialcenteraettlement');
        var form = panel.down('form');
        var comment = form.down('textarea[name=comment]');
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        var param = {
            'outGoingName': text
        }
        if (Flat.util.isEmpty(comment.getValue())) {
            var c = text === 'pass' ? '同意' : '不同意';
            comment.setValue(c);
        }

        var url = 'xr_approveSrSettlement.action';
        if (text == 'pass') {
            url = 'xr_approveSrSettlementWithSave.action';
        }
        var canSubmit = false;
        if (form.isValid() || text != 'pass') {
            canSubmit = true
        }

        var vali = true;
        if (text != 'pass') {
            vali = false;
        }
        if (canSubmit) {
            form.submit({
                clientValidation: vali,
                url: url,
                waitMsg: '提交中...',
                method: 'POST',
                params: param,
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    form.down('textarea[name=comment]').setValue('');
                    form.up('window').hide()
                    workflowTaskStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    form.down('textarea[name=comment]').setValue('');
                    form.up('window').hide()
                    workflowTaskStore.reload();
                }
            })
        }
    },

    showComment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'xr_listSrSettlementComment.action',
                extraParams: {
                    'xrSrSettlement.id':
                        grid.up('window').down('textfield[name=xrSrSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    showAssess: function (button) {
        var win = Ext.getCmp('xr-srassess');
        if (!win) {
            win = Ext.create('iFlat.view.xr.SrAssess');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.xr.SrAssess', {
            proxy: {
                url: 'xr_listSrAssess.action',
                extraParams: {
                    'srAssess.settId':
                        button.up('window').down('textfield[name=xrSrSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-srcommercialcenteraettlement-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    updateDetail: function(editor, context, eOpts) {
        Flat.util.mask();
        var rec = context.record;
        //rec.set('srSettlementDetl.priceFirst', rec.get('srSettlementDetl.priceSecond'));
        //rec.set('srSettlementDetl.amountFirst', rec.get('srSettlementDetl.amountSecond'));
        Ext.Ajax.request({
            url: 'xr_saveSrSettlementDetl.action',
            method: 'post',
            params: rec.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                srCommercialCenterSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < srCommercialCenterSettlementDetailStore.getCount(); i++) {
                            amount += srCommercialCenterSettlementDetailStore.getAt(i).get('srSettlementDetl.amountFirst');
                        }
                        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-sum').setValue(amount);
                        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-act').setValue(amount);
                    }
                });
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                srCommercialCenterSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < srCommercialCenterSettlementDetailStore.getCount(); i++) {
                            amount += srCommercialCenterSettlementDetailStore.getAt(i).get('srSettlementDetl.amountFirst');
                        }
                        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-sum').setValue(amount);
                        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-act').setValue(amount);
                    }
                });
            }
        });
    },
    
    calcAmountFirst: function(tf, newV, oldV) {
        var isQuota = Ext.getCmp('xr-srcommercialcenteraettlement-isquota').getValue();
        var degree = Ext.getCmp('xr-srcommercialcenteraettlement-degree').getValue();
        var price = Ext.getCmp('xr-srcommercialcenteraettlement-pricefirst').getValue();
        var amount;
        if (isQuota) {
            var quota = Ext.getCmp('xr-srcommercialcenteraettlement-quota').getValue();
            amount = price * quota * degree;
        } else {
            var qty = Ext.getCmp('xr-srcommercialcenteraettlement-adjustqty').getValue();
            amount = price * qty * degree;
        }
        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst').setValue(amount);
    },

    calcAmountFirstSum: function (cmp, newV, oldV, op) {
        var amount = 0;
        for (var i = 0; i < srCommercialCenterSettlementDetailStore.getCount(); i++) {
            amount += srCommercialCenterSettlementDetailStore.getAt(i).get('srSettlementDetl.amountFirst');
        }
        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-sum').setValue(amount);
        Ext.getCmp('xr-srcommercialcenteraettlement-amountfirst-act').setValue(amount);
    }
});