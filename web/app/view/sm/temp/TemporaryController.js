Ext.define('iFlat.view.sm.TemporaryApproveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-temporaryapprove',

    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                Flat.util.unmask();
                var obj = Ext.JSON.decode(response.responseText)['object'];
                var id = '';
                if (obj) {
                    var record = Ext.create('iFlat.model.sm.Temporary', obj);
                    id = obj['id'];
                    // 为了避免此处的id与taskId冲突
                    record.set('temporary.id', id);
                }
                var form = field.up('form');
                form.loadRecord(record);

                // 刷新store
                if (!Flat.util.isEmpty(id)) {
                    var store = panel.down('grid').getStore();
                    store.getProxy().extraParams['temporaryDetail.pid'] = id;
                    store.reload();
                }
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    showComment: function (btn) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listTemporaryComment.action',
                extraParams: {
                    'temporary.id': btn.up('window').down('textfield[name=id]').getValue()
                }
            }
        }))
        win.show();
    },

    refresh: function (btn) {
        btn.up('grid').getStore().reload()
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = field.up('form').down('button[name=down]');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    completeTask: function (btn) {

        var win = btn.up('window');
        var form = win.down('form[name=amount]');
        if (form.isValid()) {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            form.submit({
                url: 'sm_approveTemporary.action',
                waitMsg: '提交中...',
                params: {
                    'temporary.id':win.down('textfield[name=temporary.id]').getValue(),
                    'outGoingName': text,
                },
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textarea[name=comment]').setValue('');
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textarea[name=comment]').setValue('');
                }
            })
        }
    }

});