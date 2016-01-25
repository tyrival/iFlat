Ext.define('iFlat.view.system.Authority', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.system-authority',
    xtype: 'system-authority',

    controller: 'system-authority',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    tbar: [{
        text: '保存',
        id: 'system-authority-edit',
        ui: 'orig-blue',
        handler: 'saveAuthModule',
    }, {
        text: '借用权限',
        id: 'system-authority-duplicate',
        ui: 'orig-blue',
        handler: 'showAuthWindowEdit',
    }, {
        text: '清除权限',
        id: 'system-authority-clear',
        ui: 'orig-blue',
        handler: 'showAuthWindowEdit',
    }, '->', {
        text: '刷新',
        handler: 'refreshPage',
    }],
    items: [{
        xtype: 'treepanel',
        itemId: 'system-authority-userroletree',
        id: 'system-authority-userroletree',
        border: true,
        width: 230,
        singleExpand: true,
        expanderFirst: false,
        expanderOnly: true,
        rootVisible: false,
        rowLines: true,
        useArrows: true,
        store: sysAuthorityURTreeStore = Ext.create('iFlat.store.system.UserRoleTree'),
        listeners: {
            selectionchange: 'showUserRoleAuthority',
        }
    }, {
        xtype: 'treepanel',
        id: 'system-authority-moduletree',
        border: true,
        width: 230,
        flex: true,
        scrollable: true,
        columnLines: true,
        rowLines: true,
        head: false,
        useArrows: true,
        rootVisible: false,
        store: sysAuthorityModuleStore = Ext.create('iFlat.store.system.AuthModule'),
        columns: [{
            xtype: 'treecolumn',
            header: '模块名',
            dataIndex: 'nodeName',
            width: 200,
            flex: true,
        }, {
            xtype: 'checkcolumn',
            id: 'system-authority-activeam',
            header: '启用',
            dataIndex: 'amStatus',
            width: 100,
            listeners: {
                checkchange: 'changeAuthModuleStatus',
            }
        }, {
            text: '操作权限',
            id: 'system-authority-activeao',
            width: 100,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '操作权限',
            align: 'center',
            iconCls: 'x-fa fa-shield',
            handler: 'showAuthEdit',
        }, {
            text: '数据权限',
            id: 'system-authority-activead',
            width: 100,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '删除',
            align: 'center',
            iconCls: 'x-fa fa-server',
            handler: 'showAuthEdit',
        }],
    }]
})