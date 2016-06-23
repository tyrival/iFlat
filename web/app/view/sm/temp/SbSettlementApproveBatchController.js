Ext.define('iFlat.view.sm.temp.SbSettlementApproveBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sbsettlementapprovebatch',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                var obj = Ext.JSON.decode(response.responseText)['object'];
                if (obj) {
                    var record = Ext.create('iFlat.model.sm.SrSettlement', obj);
                    record.set('sbSettlement.id', obj['id']);
                    record.set('sbSettlement.projNo', obj['projNo']);
                    record.set('sbSettlement.projName', obj['projName']);
                    record.set('sbSettlement.deptName', obj['deptName']);
                    record.set('sbSettlement.status', obj['status']);
                    var form = field.up('form');
                    form.loadRecord(record);

                    // 加载二级结算单列表
                    var grid = form.down('grid');
                    var store = grid.getStore();
                    store.getProxy().extraParams['sbSettlement.projNo'] = record.get('projNo');
                    store.getProxy().extraParams['sbSettlement.deptName'] = record.get('deptName');
                    store.getProxy().extraParams['sbSettlement.status'] = record.get('status');
                    store.reload({
                        callback: function (records, operation, success) {
                            Flat.util.unmask();
                            var sum = 0;
                            for (var i = 0; i < records.length; i++) {
                                sum += records[i].get('summaryAmount');
                            }
                            grid.down('textfield[name=summaryAmount]').setValue(sum);
                        }
                    })
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

    // 刷新grid数据
    refresh: function (btn) {
        var grid = btn.up('grid');
        grid.getStore().reload({
            callback: function (records, operation, success) {
                Flat.util.unmask();
                var sum = 0;
                for (var i = 0; i < records.length; i++) {
                    sum += records[i].get('summaryAmount');
                }
                grid.down('textfield[name=summaryAmount]').setValue(sum);
            }
        })
    },

    info: function (view, rowIndex, colIndex, item, e, record, row) {
        var xtype = 'sm-sbsettlementapprovebatchinfo';
        var win = Ext.getCmp(xtype);
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.SbSettlementApproveBatchInfo');
        }
        var store = win.down('grid').getStore();
        store.getProxy().extraParams['sbSettlementDetail.pid'] = record.get('id');
        store.reload();

        win.show();
    },

    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },

    completeTask: function (btn) {
        var panel = btn.up('sm-sbsettlementapprovebatch');
        var form = panel.down('form');
        var grid = form.down('grid');
        var arr = grid.getSelectionModel().getSelection();
        var param = Flat.util.arrayToUrlParamList(arr, 'sbSettlementList', true);
        var comment = form.down('textarea[name=comment]');
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        param['outGoingName'] = text;
        if (Flat.util.isEmpty(comment.getValue())) {
            var c = text === 'pass' ? '同意' : '不同意';
            comment.setValue(c);
        }
        if (form.isValid()) {
            form.submit({
                url: 'sm_approveSbSettlementBatch.action',
                waitMsg: '提交中...',
                params: param,
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    grid.getSelectionModel().deselectAll();
                    grid.getStore().reload({
                        callback: function (records, operation, success) {
                            if (records.length == 0) {
                                btn.up('window').hide();
                            }
                        }
                    })
                    form.down('textarea[name=comment]').setValue('');
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    grid.getSelectionModel().deselectAll();
                    grid.getStore().reload({
                        callback: function (records, operation, success) {
                            if (records.length == 0) {
                                btn.up('window').hide();
                            }
                        }
                    })
                    form.down('textarea[name=comment]').setValue('');
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
                url: 'sm_listSbSettlementComment.action',
                extraParams: {
                    'sbSettlement.id':
                        grid.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },

});