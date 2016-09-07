Ext.define('iFlat.view.xr.TrHrReAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-trhrreaudit',

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
                        trHrReAuditDetailStore.getProxy().extraParams['trSettlementDetl.pid'] = id;
                        trHrReAuditDetailStore.reload({
                            callback: function (records, option, success) {
                                var amount = 0;
                                for (var i = 0; i < records.length; i++) {
                                    amount += records[i].get('trSettlementDetl.amountSecond');
                                }
                                Ext.getCmp('xr-trhrreaudit-sum').setValue(amount);
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
        var panel = btn.up('xr-trhrreaudit');
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
        var url = 'xr_approveTrSettlement.action';
        if (text == 'pass') {
            url = 'xr_approveTrSettlementWithSave.action';
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
                url: 'xr_listTrSettlementComment.action',
                extraParams: {
                    'trSettlement.id':
                        grid.up('window').down('textfield[name=trSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-trhrreaudit-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-trhrreaudit-down2');
         btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },
});