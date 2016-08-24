Ext.define('iFlat.view.xr.TrSupportDeptSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-trsupportdeptaettlement',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        var store = Ext.create('iFlat.store.workflow.BusinessObj', {
            model: 'iFlat.model.xr.TrSettlement',
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

                        var id = record.get('trSettlement.id');
                        trSupportDeptSettlementDetailStore.getProxy().extraParams['trSettlementDetl.pid'] = id;
                        trSupportDeptSettlementDetailStore.reload({
                            callback: function () {
                                var amount = 0;
                                for (var i = 0; i < trSupportDeptSettlementDetailStore.getCount(); i++) {
                                    amount += trSupportDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountFirst');
                                }
                                Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-sum').setValue(amount);
                                Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-act').setValue(amount);
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
        var amount = Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-sum').getValue();
        if (amount == 0) {
            this.calcAmountFirstSum();
        }
        var panel = btn.up('xr-trsupportdeptaettlement');
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
        if (form.isValid()) {
            form.submit({
                url: 'xr_approveTrSettlementWithSave.action',
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
                url: 'xr_listTrSettlementComment.action',
                extraParams: {
                    'trSettlement.id':
                        grid.up('window').down('textfield[name=trSettlement.id]').getValue()
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
                        button.up('window').down('textfield[name=trSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-trsupportdeptaettlement-down');
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
        //rec.set('trSettlementDetl.priceFirst', rec.get('trSettlementDetl.priceSecond'));
        //rec.set('trSettlementDetl.amountFirst', rec.get('trSettlementDetl.amountSecond'));
        Ext.Ajax.request({
            url: 'xr_saveTrSettlementDetl.action',
            method: 'post',
            params: rec.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                trSupportDeptSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < trSupportDeptSettlementDetailStore.getCount(); i++) {
                            amount += trSupportDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountFirst');
                        }
                        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-sum').setValue(amount);
                        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-act').setValue(amount);
                    }
                });
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                trSupportDeptSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < trSupportDeptSettlementDetailStore.getCount(); i++) {
                            amount += trSupportDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountFirst');
                        }
                        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-sum').setValue(amount);
                        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-act').setValue(amount);
                    }
                });
            }
        });
    },
    
    calcAmountFirst: function(tf, newV, oldV) {
        var qty = Ext.getCmp('xr-trsupportdeptaettlement-qty').getValue();
        var price = Ext.getCmp('xr-trsupportdeptaettlement-price').getValue();
        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst').setValue(price * qty);
    },

    calcAmountFirstSum: function (cmp, newV, oldV, op) {
        var amount = 0;
        for (var i = 0; i < trSupportDeptSettlementDetailStore.getCount(); i++) {
            amount += trSupportDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountFirst');
        }
        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-sum').setValue(amount);
        Ext.getCmp('xr-trsupportdeptaettlement-amountfirst-act').setValue(amount);
    }
});