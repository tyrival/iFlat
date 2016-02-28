Ext.define('iFlat.view.bi.Project', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-project',
    xtype: 'bi-project',

    controller: 'bi-project',
    store: biProjectStore = Ext.create('iFlat.store.bi.Project'),
    id: 'bi-project',
    tbar: [{
        text: '新增',
        id: 'bi-project-add',
        ui: 'orig-blue',
        handler: 'addProjectRecord',
    }, '->', {
        text: '刷新',
        id: 'bi-project-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        biProjectRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'bi-project-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateProjectRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: 'id',
        dataIndex: 'project.id',
        hidden: true,
        editor: {
            disabled: true,
        }
    }, {
        header: '工号',
        dataIndex: 'project.projNo',
        editor: {
            allowBlank: false,
        }
    }, {
        header: '船名',
        dataIndex: 'project.name',
        width: 200,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '简称',
        dataIndex: 'project.shortName',
        flex: true,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '船号',
        dataIndex: 'project.code',
        editor: {
            allowBlank: false,
        }
    }, {
        header: '计划船位',
        dataIndex: 'project.plannedPlace',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '实际船位',
        dataIndex: 'project.actualPlace',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '器材费指标',
        dataIndex: 'project.materialPct',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '加工费指标',
        dataIndex: 'project.manufacturingPct',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '专项费指标',
        dataIndex: 'project.auxiliaryPct',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '分析日期',
        width: 100,
        dataIndex: 'project.analyseDate',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        text: '删除',
        id: 'bi-project-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProject',
        editor: {
            xtype: 'label',
        }
    }],

});