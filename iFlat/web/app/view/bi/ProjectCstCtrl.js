Ext.define('iFlat.view.bi.ProjectCstCtrl', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-projectcstctrl',
    xtype: 'bi-projectcstctrl',

    controller: 'bi-projectcstctrl',
    store: biProjectCstCtrlStore = Ext.create('iFlat.store.bi.ProjectCstCtrl'),
    id: 'bi-projectcstctrl',
    tbar: [{
        text: '新增',
        id: 'bi-projectcstctrl-add',
        ui: 'orig-blue',
        handler: 'addProjectCstCtrlRecord',
    }, {
        xtype: 'form',
        id: 'bi-projectcstctrl-import',
        items: [{
            xtype: 'fileuploadfield',
            name: 'upload',
            buttonText: '选择...',
            width: 300,
            margin: '0 0 0 0',
        }, ]
    }, {
        xtype: 'button',
        text: '导入',
        ui: 'orig-blue',
        handler: 'uploadFile'
    }, '->', {
        text: '下载模板',
        id: 'bi-projectcstctrl-template',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'bi-projectcstctrl-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        biProjectCstCtrlRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'bi-projectcstctrl-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateProjectCstCtrlRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: 'id',
        dataIndex: 'projectCstCtrl.id',
        hidden: true,
        editor: {
            disabled: true,
        }
    }, {
        header: '工号',
        dataIndex: 'projectCstCtrl.projNo',
        width: 180,
        flex: true,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: biProjectCstCtrlProjectStore = Ext.create('iFlat.store.bi.Project'),
            id: 'bi-projectcstctrl-projno-combo',
            queryMode: 'local',
            editable: false,
            forceSelection : true,
            valueField : 'projNo',
            displayField : 'shortName',
        }
    }, {
        header: '部门',
        width: 150,
        dataIndex: 'projectCstCtrl.dept',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '类型',
        dataIndex: 'projectCstCtrl.type',
        width: 150,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            bind: {
                store: '{costCtrlType}',
            },
            id: 'bi-projectcstctrl-type-combo',
            queryMode: 'local',
            editable: false,
            forceSelection : true,
        }
    }, {
        header: '目标成本',
        width: 150,
        dataIndex: 'projectCstCtrl.target',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            allowBlank: true,
        }
    }, {
        header: '实际成本',
        width: 150,
        dataIndex: 'projectCstCtrl.actual',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            allowBlank: true,
        }
    }, {
        header: '注释',
        width: 150,
        dataIndex: 'projectCstCtrl.comment',
        editor: {
            allowBlank: true,
        }
    }, {
        text: '删除',
        id: 'bi-projectcstctrl-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProjectCstCtrl',
        editor: {
            xtype: 'label',
        }
    }],

});