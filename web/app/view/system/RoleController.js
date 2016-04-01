Ext.define('iFlat.view.system.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-role',

    refreshList: function() {
        sysRoleStore.reload();
    },

    addRoleRecord: function() {
        sysRoleRowEditing.cancelEdit();
        var role = Ext.create('iFlat.model.system.Role', {
            'role.status': true,
        });
        sysRoleStore.insert(0, role);
        sysRoleRowEditing.startEdit(0, 0);
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["role.roleId"];
        if(id == "") {
            sysRoleStore.remove(context.record);
        }
    },

    changeRoleStatus: function(column, rowIndex, checked, eOpts) {
        var id = sysRoleStore.getData().items[rowIndex].data.roleId;
        Ext.Ajax.request({
            url: 'system_activeRole.action?role.roleId=' + id + '&role.status=' + checked,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
        })
    },

    deleteRole: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['role.roleId'];
        if(id == undefined || id == '') {
            sysRoleStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该角色吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'system_deleteRole.action?role.roleId=' + id,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data['object']) {
                                sysRoleStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },
    updateRoleRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'system_saveRole.action',
            method: 'post',
            params: record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    sysRoleStore.remove(record);
                }
                if(result['object']) {
                    record.set('role.roleId', result['object']['roleId']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    }
});