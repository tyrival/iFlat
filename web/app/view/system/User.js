Ext.define('iFlat.view.system.User', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.system-user',
    xtype: 'system-user',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    id: 'system-user',
    tbar: [{
        text: '新增',
        id: 'system-user-add',
        ui: 'orig-blue',
        handler: 'addUserdRecord',
    }, '->', {
        text: '刷新',
        id: 'system-user-refresh',
        handler: 'refreshList',
    }],
    controller: 'system-user',
    items: [{
        xtype: 'treepanel',
        id: 'system-user-orgtree',
        store: sysUserOrgTreeStore = Ext.create('iFlat.store.system.OrganizationTree'),
        border: false,
        useArrows: true,
        rootVisible: false,
        width: 230,
        listeners: {
            rowclick: 'onOrgTreeRowClick',
        }
    }, {
        xtype: 'gridpanel',
        id: 'system-user-list',
        border: true,
        store: sysUserStore = Ext.create('iFlat.store.system.User'),
        flex: 1,
        plugins: [
            sysUserRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                pluginId: 'system-user-edit',
                clicksToMoveEditor: 1,
                autoCancel: true,
                listeners: {
                    edit: 'updateUserRecord',
                    canceledit: 'deleteEmptyRecord',
                }
            })
        ],
        columns: [{
            header: 'id',
            dataIndex: 'user.userId',
            hidden: true,
        }, {
            header: '帐号',
            dataIndex: 'user.account',
            width: 300,
            flex: true,
            editor: {
                allowBlank: false
            }
        }, {
            header: '姓名',
            dataIndex: 'user.userName',
            width: 300,
            flex: true,
            editor: {
                allowBlank: false
            }
        }, {
            header: '职位',
            dataIndex: 'user.title',
            hidden: true,
        }, {
            header: '排序',
            dataIndex: 'user.sequence',
            hidden: true,
        }, {
            header: '办公电话',
            dataIndex: 'user.officeTel',
            hidden: true,
        }, {
            header: '手机',
            dataIndex: 'user.mobileTel',
            hidden: true,
        }, {
            header: '宅电',
            dataIndex: 'user.homeTel',
            hidden: true,
        }, {
            header: 'Email',
            dataIndex: 'user.email',
            hidden: true,
        }, {
            header: '地址',
            dataIndex: 'user.address',
            hidden: true,
        }, {
            header: 'QQ',
            dataIndex: 'user.qq',
            hidden: true,
        }, {
            header: 'Skype',
            dataIndex: 'user.skype',
            hidden: true,
        }, {
            header: '传真',
            dataIndex: 'user.fax',
            hidden: true,
        }, {
            header: '职称',
            dataIndex: 'user.rank',
            hidden: true,
        }, {
            header: '备注',
            dataIndex: 'user.comment',
            hidden: true,
        }, {
            xtype: 'checkcolumn',
            id: 'system-user-status',
            header: '启用',
            dataIndex: 'user.status',
            width: 90,
            editor: {
                xtype: 'checkbox',
            },
            listeners: {
                checkchange: 'changeUserStatus',
            }
        }, {
            text: '重置密码',
            id: 'system-user-reset',
            xtype: 'actioncolumn',
            align: 'center',
            width: 90,
            iconCls: 'x-fa fa-undo',
            handler: 'resetUserPassword',
            editor: {
                xtype: 'label',
            }
        }, {
            text: '角色',
            id: 'system-user-editrole',
            width: 90,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '编辑',
            align: 'center',
            iconCls: 'x-fa fa-bookmark',
            handler: 'showUserRoleEdit',
            editor: {
                xtype: 'label',
            }
        }, {
            text: '详细信息',
            id: 'system-user-editinfo',
            width: 90,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '编辑',
            align: 'center',
            iconCls: 'x-fa fa-edit',
            handler: 'showUserEdit',
            editor: {
                xtype: 'label',
            }
        }, {
            text: '删除',
            id: 'system-user-delete',
            width: 90,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '删除',
            align: 'center',
            iconCls: 'x-fa fa-close',
            handler: 'deleteUser',
            editor: {
                xtype: 'label',
            }
        }]
    }]
});