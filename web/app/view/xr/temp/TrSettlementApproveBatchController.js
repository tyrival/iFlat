Ext.define('iFlat.view.xr.temp.TrSettlementApproveBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-trsettlementapprovebatch',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                var obj = Ext.JSON.decode(response.responseText)['object'];
                if (obj) {
                    var record = Ext.create('iFlat.model.xr.TrSettlement', obj);
                    record.set('trSettlement.id', obj['id']);
                    record.set('trSettlement.projNo', obj['projNo']);
                    record.set('trSettlement.projName', obj['projName']);
                    record.set('trSettlement.status', obj['status']);
                    var form = field.up('form');
                    form.loadRecord(record);
                    form.down('textarea[name=comment]').setValue('');

                    // 加载二级结算单列表
                    var grid = form.down('grid');
                    var store = grid.getStore();
                    store.getProxy().extraParams['trSettlement.projNo'] = record.get('projNo');
                    store.getProxy().extraParams['trSettlement.status'] = record.get('status');
                    store.reload({
                        callback: function (records, operation, success) {
                            Flat.util.unmask();
                            var sum1 = 0;
                            var sum2 = 0;
                            var sum3 = 0;
                            for (var i = 0; i < records.length; i++) {
                                sum1 += records[i].get('amountFirst');
                                sum2 += records[i].get('amountSecond');
                                sum3 += records[i].get('amountWithDiscount');
                            }
                            grid.down('textfield[name=summaryAmountFirst]').setValue(sum1);
                            grid.down('textfield[name=summaryAmountSecond]').setValue(sum2);
                            grid.down('textfield[name=summaryAmountWithDiscount]').setValue(sum3);
                            grid.down('textfield[name=summaryAmountDiff]').setValue(sum1 - sum2);
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
                var sum1 = 0;
                var sum2 = 0;
                var sum3 = 0;
                for (var i = 0; i < records.length; i++) {
                    sum1 += records[i].get('amountFirst');
                    sum2 += records[i].get('amountSecond');
                    sum3 += records[i].get('amountWithDiscount');
                }
                grid.down('textfield[name=summaryAmountFirst]').setValue(sum1);
                grid.down('textfield[name=summaryAmountSecond]').setValue(sum2);
                grid.down('textfield[name=summaryAmountWithDiscount]').setValue(sum3);
                grid.down('textfield[name=summaryAmountDiff]').setValue(sum1 - sum2);
            }
        })
    },

    info: function (view, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('xr-trsettlementapprovebatchinfo');
        if (!win) {
            win = Ext.create('iFlat.view.xr.temp.TrSettlementApproveBatchInfo');
        }
        var store = win.down('grid').getStore();
        store.getProxy().extraParams['trSettlementDetl.pid'] = record.get('id');
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
        debugger
        var panel = btn.up('xr-trsettlementapprovebatch');
        var form = panel.down('form');
        var comment = form.down('textarea[name=comment]');
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        var grid = form.down('grid');
        var arr = grid.getSelectionModel().getSelection();
        var param = Flat.util.arrayToUrlParamList(arr, 'trSettlementList', true, true);
        param['outGoingName'] = text;
        if (Flat.util.isEmpty(comment.getValue())) {
            var c = text === 'pass' ? '同意' : '不同意';
            comment.setValue(c);
        }
        if (form.isValid()) {
            form.submit({
                url: 'xr_approveTrSettlementBatch.action',
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

   /* showComment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'xr_listTrSettlementComment.action',
                extraParams: {
                    'trSettlement.id':
                        grid.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },*/

});