Ext.define('iFlat.view.bi.ProjectInProcess', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-projectinprocess',
    xtype: 'bi-projectinprocess',

    controller: 'bi-projectinprocess',
    store: biProjectInProcessStore = Ext.create('iFlat.store.bi.ProjectInProcess'),
    id: 'bi-projectinprocess',
    tbar: [{
        text: '新增',
        id: 'bi-projectinprocess-add',
        ui: 'orig-blue',
        handler: 'addProjectInProcessRecord',
    }, {
        xtype: 'form',
        id: 'bi-projectinprocess-import',
        items: [{
            xtype: 'fileuploadfield',
            width: 300,
            name: 'upload',
            buttonText: '选择...',
            margin: '0 0 0 0',
        }, ]
    }, {
        xtype: 'button',
        text: '导入',
        ui: 'orig-blue',
        handler: 'uploadFile'
    }, '->', {
        text: '下载模板',
        id: 'bi-projectinprocess-template',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'bi-projectinprocess-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        biProjectInProcessRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'bi-projectinprocess-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateProjectInProcessRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: '工号',
        dataIndex: 'projectInProcess.projNo',
        width: 180,
        flex: true,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: biProjectInProcessProjectStore = Ext.create('iFlat.store.bi.Project'),
            id: 'bi-projectinprocess-projno-combo',
            queryMode: 'local',
            forceSelection : true,
            valueField : 'projNo',
            displayField : 'shortName',
            editable: true,
            width: 370,
            typeAhead: true,
            minChars: 0,
            anyMatch: true,
        }
    }, {
        header: '时间',
        dataIndex: 'projectInProcess.month',
        width: 150,
        allowBlank: false,
        editable: false,
        forceSelection : true,
        flex: true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return Ext.Date.format(value, 'Y-m');
        },
        editor: {
            xtype: 'datefield',
            format: 'Y-m',
        }
    }, {
        header: '类型',
        dataIndex: 'projectInProcess.type',
        width: 150,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            bind: {
                store: '{projectInProcess}',
            },
            queryMode: 'local',
            editable: false,
            forceSelection : true,
        }
    }, {
        header: '目标',
        width: 200,
        dataIndex: 'projectInProcess.target',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            allowBlank: true,
        }
    }, {
        header: '实际',
        width: 200,
        dataIndex: 'projectInProcess.actual',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            allowBlank: true,
        }
    }, {
        text: '删除',
        id: 'bi-projectinprocess-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProjectInProcess',
        editor: {
            xtype: 'label',
        }
    }],

});