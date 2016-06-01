Ext.define('iFlat.view.sm.temp.TecSettlementApproveBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-tecsettlementapprovebatch',

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
                    record.set('tecSettlement.id', obj['id']);
                    record.set('tecSettlement.projNo', obj['projNo']);
                    record.set('tecSettlement.projName', obj['projName']);
                    record.set('tecSettlement.deptName', obj['deptName']);
                    record.set('tecSettlement.status', obj['status']);
                    var form = field.up('form');
                    form.loadRecord(record);

                    // 加载二级结算单列表
                    var grid = form.down('grid');
                    var store = grid.getStore();
                    store.getProxy().extraParams['tecSettlement.projNo'] = record.get('projNo');
                    store.getProxy().extraParams['tecSettlement.deptName'] = record.get('deptName');
                    store.getProxy().extraParams['tecSettlement.status'] = record.get('status');
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
        var xtype = 'sm-tecsettlementapprovebatchinfo';
        var win = Ext.getCmp(xtype);
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.TecSettlementApproveBatchInfo');
        }
        var store = win.down('grid').getStore();
        store.getProxy().extraParams['tecSettlementDetail.pid'] = record.get('id');
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

        var panel = btn.up('sm-tecsettlementapprovebatch');
        var form = panel.down('form');
        if (form.isValid()) {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            form.submit({
                url: 'sm_approveTecSettlementBatch.action',
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
                url: 'sm_listTecSettlementComment.action',
                extraParams: {
                    'tecSettlement.id':
                        grid.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },

});