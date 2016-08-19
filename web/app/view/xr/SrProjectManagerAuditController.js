Ext.define('iFlat.view.xr.SrProjectManagerAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-srprojectmanageraudit',

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
        var assess = Ext.create('iFlat.store.xr.SrAssess', {
            autoLoad: false,
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
                        srProjectManagerAuditDetailStore.getProxy().extraParams['srSettlementDetl.pid'] = id;
                        srProjectManagerAuditDetailStore.reload();

                        assess.getProxy().extraParams['srAssess.settId'] = id;
                        assess.getProxy().extraParams['srAssess.type'] = '总管';
                        assess.reload({
                            callback: function(rcs, option, scs) {
                                if (!scs) {
                                    Flat.util.tip(response.responseText);
                                } else {
                                    var rec;
                                    if (rcs != null && rcs.length > 0) {
                                        rec = rcs[0];
                                    } else {
                                        rec = Ext.create('iFlat.model.xr.SrAssess', {
                                            'srAssess.settId': id,
                                            'srAssess.type': '总管'
                                        })
                                    }
                                    form.loadRecord(rec);
                                }
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
        var panel = btn.up('xr-srprojectmanageraudit');
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
                url: 'xr_approveSrSettlementWithAssess.action',
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
    
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-srprojectmanageraudit-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    updateDetail: function(editor, context, eOpts) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'xr_saveSrSettlementDetl.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                srProjectManagerAuditDetailStore.reload();
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },
});