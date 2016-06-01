Ext.define('iFlat.view.sm.temp.ScSettlementApproveBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-scsettlementapprovebatch',

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
                    record.set('scSettlement.id', obj['id']);
                    record.set('scSettlement.projNo', obj['projNo']);
                    record.set('scSettlement.projName', obj['projName']);
                    record.set('scSettlement.deptName', obj['deptName']);
                    record.set('scSettlement.status', obj['status']);
                    var form = field.up('form');
                    form.loadRecord(record);

                    // 加载二级结算单列表
                    var grid = form.down('grid');
                    var store = grid.getStore();
                    store.getProxy().extraParams['scSettlement.projNo'] = record.get('projNo');
                    store.getProxy().extraParams['scSettlement.deptName'] = record.get('deptName');
                    store.getProxy().extraParams['scSettlement.status'] = record.get('status');
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
        btn.up('grid').getStore().reload({
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
        var xtype = 'sm-scsettlementapprovebatchinfo';
        var win = Ext.getCmp(xtype);
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.ScSettlementApproveBatchInfo');
        }
        var store = win.down('grid').getStore();
        store.getProxy().extraParams['scSettlementDetail.pid'] = record.get('id');
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

        var panel = btn.up('sm-scsettlementapprovebatch');
        var form = panel.down('form');
        if (form.isValid()) {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            form.submit({
                url: 'sm_approveScSettlementBatch.action',
                waitMsg: '提交中...',
                params: {
                    'outGoingName': text,
                },
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    btn.up('window').hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textarea[name=comment]').setValue('同意');
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    btn.up('window').hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textarea[name=co`mment]').setValue('同意');
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
                url: 'sm_listScSettlementComment.action',
                extraParams: {
                    'scSettlement.id':
                        grid.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },

});