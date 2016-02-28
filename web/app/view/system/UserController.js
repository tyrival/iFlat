Ext.define('iFlat.view.system.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-user',

    onOrgTreeRowClick: function(treePanel, record, tr, rowIndex, e, eOpts ) {
        var orgId = record.get('orgId');
        sysUserStore.proxy.extraParams.orgId = orgId;
        sysUserStore.reload();

    },

    refreshList: function() {
        sysUserStore.proxy.extraParams.orgId = "";
        sysUserOrgTreeStore.reload();
        sysRoleStore.reload();
        sysUserStore.reload();
        if (Ext.getCmp('system-userroleedit')) {
            sysRoleStore.reload();
        }
    },

    addUserdRecord: function() {
        sysUserRowEditing.cancelEdit();
        if(Ext.getCmp('system-user-orgtree').getSelection()[0] == undefined) {
            Ext.Msg.show({
                title:'提示',
                message: '请先选择一个组织部门。',
            });
        } else {
            var orgId = Ext.getCmp('system-user-orgtree').getSelection()[0].get('orgId');
            var r = Ext.create('iFlat.model.system.User', {
                'user.orgId': orgId,
                'user.status': true,
            });
            sysUserStore.insert(0, r);
            sysUserRowEditing.startEdit(0, 0);
        }
    },

    updateUserRecord: function(editor, context, eOpts) {
        debugger;
        var record = context.record;
        Ext.Ajax.request({
            url: 'system_saveUser.action',
            method: 'post',
            params: record.data,
            success: function(response, opts) {
                tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    sysUserStore.remove(record);
                }
                if(result['object']) {
                    record.set('user.userId', result['object']['userId']);
                }
            },
            failure: function(response, opts) {
                tip(response.responseText);
            }
        });
    },

    changeUserStatus: function(column, rowIndex, checked, eOpts) {
        var id = sysUserStore.getData().items[rowIndex].data.userId;
        Ext.Ajax.request({
            url: 'system_activeUser.action?user.userId=' + id + '&user.status=' + checked,
            success: function(response, opts) {
                tip(response.responseText);
            },
            failure: function(response, opts) {
                tip(response.responseText);
            }
        })
    },

    resetUserPassword: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['user.userId'];
        Ext.Ajax.request({
            url: 'system_resetPassword.action?user.userId=' + id + '&user.password=123',
            success: function(response, opts) {
                tip(response.responseText);
            },
            failure: function(response, opts) {
                tip(response.responseText);
            }
        })
    },

    deleteUser: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['user.userId'];
        if(id == undefined || id == '') {
            sysUserStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该用户吗?",function(btn) {
                var account = record.data.account;
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'system_deleteUser.action?user.account=' + account,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                sysUserStore.remove(record);
                            }
                            tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    showUserEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('system-useredit');
        if(!win) {
             win = Ext.create('iFlat.view.system.UserEdit');
        }
        win.down('form').loadRecord(record);
        win.show();
    },

    submitUserEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_editUserInfo.action',
            success: function(form, action) {
                win.hide();
                tip(action.response.responseText);
                sysUserStore.reload();
            },
            failure: function(form, action) {
                tip(action.response.responseText);
            }
        });
    },

    showUserRoleEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('system-userroleedit');
        if(!win) {
            win = Ext.create('iFlat.view.system.UserRoleEdit');
        }
        win.down('form').loadRecord(record);
        Ext.Ajax.request({
            url: 'system_listUserRoleAsString.action?userRole.account=' + record.get('account'),
            success: function(response, opts) {
                var data = Ext.JSON.decode(response.responseText);
                Ext.getCmp('system-userroleedit-itemselector').setValue(data.object);
            },
        });
        win.show();
    },

    submitUserRoleEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_saveUserRole.action',
            success: function(form, action) {
                Ext.getCmp('system-userroleedit-itemselector').setValue("");
                win.hide();
                tip(action.response.responseText);
            },
            failure: function(form, action) {
                tip(action.response.responseText);
            }
        });
    },
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["user.userId"];
        if(id == "") {
            sysUserStore.remove(context.record);
        }
    }
});