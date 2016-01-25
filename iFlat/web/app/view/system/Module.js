Ext.define('iFlat.view.system.Module', {
    extend: 'Ext.tree.Panel',
    alias: 'widget.system-module',
    xtype: 'system-module',


    require: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.tree.*',
        'Ext.tip.*',
        'Ext.ux.form.SearchField',
    ],

    id: 'system-module',
    columnLines: true,
    rowLines: true,
    store: sysModuleStore = Ext.create('iFlat.store.system.Module'),
    controller: 'system-module',
    collapsible: true,
    useArrows: true,
    rootVisible: false,
    multiSelect: true,
    tbar: [{
        text: '新增',
        ui: 'orig-blue',
        id: 'system-module-add',
        handler : 'showModuleAdd'
    }, '->', {
        text: '刷新',
        id: 'system-module-refresh',
        handler: 'refreshModuleStore',
    }],
    columns: [{
        xtype: 'treecolumn',
        header: '模块名',
        dataIndex: 'module.nodeName',
        locked: true,
        width: 150,
        flex: true,
    }, {
        header: '排序',
        dataIndex: 'module.sequence',
        width: 80,
    }, {
        header: '图标',
        dataIndex: 'aweIcon',
        width: 60,
    }, {
        header: '命名空间',
        dataIndex: 'module.nameSpace',
        width: 80,
    }, {
        header: '模块名',
        dataIndex: 'module.moduleName',
        width: 80,
    }, {
        header: 'View',
        dataIndex: 'module.viewName',
        width: 90,
    }, {
        header: 'Controller',
        dataIndex: 'module.controller',
        width: 90,
    }, {
        header: 'Url',
        dataIndex: 'Url',
        width: 60,
        flex: true,
    }, {
        text: '表/视图',
        id: 'system-module-tableview',
        width: 80,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '表/视图',
        align: 'center',
        iconCls: 'x-fa fa-database',
        handler: 'showTableViewEdit',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.childNodes.length > 0;
        },
    }, {
        text: '操作',
        id: 'system-module-operating',
        width: 80,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '操作',
        align: 'center',
        iconCls: 'x-fa fa-edit ',
        handler: 'showOperatingEdit',
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.childNodes.length > 0;
        },
    }, {
        xtype: 'checkcolumn',
        id: 'system-module-status',
        header: '启用',
        dataIndex: 'module.status',
        width: 50,
        listeners: {
            checkchange: 'changeModuleStatus',
        }
    }, {
        text: '编辑',
        id: 'system-module-edit',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showModuleEdit',
        //根节点不可编辑
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('module.nodeId') == '00000000-0000-0000-0000-000000000000';
        },
    }, {
        text: '删除',
        id: 'system-module-delete',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteModule',
        //根节点不可编辑
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('module.nodeId') == '00000000-0000-0000-0000-000000000000';
        },
    }, {
        header: 'NodeId',
        dataIndex: 'module.nodeId',
        hidden: true,
    }, {
        header: '父节点ID',
        dataIndex: 'module.parentNodeId',
        hidden: true,
    }],
    listeners: {
        afterrender: 'instantiateModuleEdit',
        destroy: 'destroyModuleEdit',
    }
});
