Ext.define('iFlat.view.system.Role', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.system-role',
    xtype: 'system-role',

    controller: 'system-role',
    store: sysRoleStore = Ext.create('iFlat.store.system.Role'),
    id: 'system-role',
    tbar: [{
        text: '新增',
        id: 'system-role-add',
        ui: 'orig-blue',
        handler: 'addRoleRecord',
    }, '->', {
        text: '刷新',
        id: 'system-role-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        sysRoleRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'system-role-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateRoleRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: 'id',
        dataIndex: 'role.roleId',
        hidden: true,
        editor: {
            disabled: true,
        }
    }, {
        header: '类别',
        dataIndex: 'role.category',
        width: 120,
        editor: {
        }
    }, {
        header: '角色',
        dataIndex: 'role.roleName',
        width: 200,
        editor: {
            allowBlank: false
        }
    }, {
        header: '描述',
        dataIndex: 'role.description',
        width: 350,
        flex: true,
        editor: {
        }
    }, {
        xtype: 'checkcolumn',
        id: 'system-role-status',
        header: '启用',
        dataIndex: 'role.status',
        width: 90,
        editor: {
            xtype: 'checkbox',
        },
        listeners: {
            checkchange: 'changeRoleStatus',
        }
    }, {
        text: '删除',
        id: 'system-role-delete',
        width: 90,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteRole',
        editor: {
            xtype: 'label',
        }
    }],

});