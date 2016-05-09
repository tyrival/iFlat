Ext.define('iFlat.view.sm.temp.TemporaryApproveBatchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-temporaryapprovebatch',

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
                    record.set('temporary.id', obj['id']);
                    record.set('temporary.dept', obj['dept']);
                    record.set('temporary.status', obj['status']);
                    var form = field.up('form');
                    form.loadRecord(record);

                    // 加载二级结算单列表
                    var grid = form.down('grid');
                    var store = grid.getStore();
                    store.getProxy().extraParams['temporary.status'] = record.get('status');
                    store.reload({
                        callback: function (records, operation, success) {
                            Flat.util.unmask();
                            var sum = 0;
                            for (var i = 0; i < records.length; i++) {
                                sum += records[i].get('amount');
                            }
                            grid.down('textfield[name=amount]').setValue(sum);
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
                    sum += records[i].get('amount');
                }
                grid.down('textfield[name=amount]').setValue(sum);
            }
        })
    },

    info: function (view, rowIndex, colIndex, item, e, record, row) {
        var xtype = 'sm-temporaryapprovebatchinfo';
        var win = Ext.getCmp(xtype);
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.TemporaryApproveBatchInfo');
        }
        var store = win.down('grid').getStore();
        store.getProxy().extraParams['temporaryDetail.pid'] = record.get('id');
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

        var panel = btn.up('sm-temporaryapprovebatch');
        var form = panel.down('form');
        if (form.isValid()) {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            form.submit({
                url: 'sm_approveTemporaryBatch.action',
                waitMsg: '提交中...',
                params: {
                    'outGoingName': text,
                },
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    btn.up('window').hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textarea[name=comment]').setValue('');
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    btn.up('window').hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textarea[name=co`mment]').setValue('');
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
                url: 'sm_listTemporaryComment.action',
                extraParams: {
                    'temporary.id':
                        grid.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },

});