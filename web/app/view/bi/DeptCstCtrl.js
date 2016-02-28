Ext.define('iFlat.view.bi.DeptCstCtrl', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-deptcstctrl',
    xtype: 'bi-deptcstctrl',

    controller: 'bi-deptcstctrl',
    store: biDeptCstCtrlStore = Ext.create('iFlat.store.bi.DeptCstCtrl'),
    id: 'bi-deptcstctrl',
    tbar: [{
        text: '新增',
        id: 'bi-deptcstctrl-add',
        ui: 'orig-blue',
        handler: 'addDeptCstCtrlRecord',
    }, {
        xtype: 'form',
        id: 'bi-deptcstctrl-import',
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
        id: 'bi-deptcstctrl-template',
        handler: 'downloadTemplate'
    }, {
        text: '刷新',
        id: 'bi-deptcstctrl-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        biDeptCstCtrlRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'bi-deptcstctrl-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateDeptCstCtrlRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: '时间',
        dataIndex: 'deptCstCtrl.month',
        width: 150,
        flex: true,
        renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
            return Ext.Date.format(value, 'Y-m');
        },
        editor: {
            xtype: 'datefield',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            format: 'Y-m',
        }
    }, {
        header: '部门',
        width: 150,
        dataIndex: 'deptCstCtrl.dept',
        editor: {
            allowBlank: true,
        }
    }, {
        header: '类型',
        dataIndex: 'deptCstCtrl.type',
        width: 150,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            bind: {
                store: '{deptCtrlType}',
            },
            id: 'bi-deptcstctrl-type-combo',
            queryMode: 'local',
            editable: false,
            forceSelection : true,
        }
    }, {
        header: '预算',
        width: 150,
        dataIndex: 'deptCstCtrl.budget',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            allowBlank: true,
        }
    }, {
        header: '实际',
        width: 150,
        dataIndex: 'deptCstCtrl.actual',
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            allowBlank: true,
        }
    }, {
        header: '注释',
        width: 150,
        dataIndex: 'deptCstCtrl.comment',
        editor: {
            allowBlank: true,
        }
    }, {
        text: '删除',
        id: 'bi-deptcstctrl-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteDeptCstCtrl',
        editor: {
            xtype: 'label',
        }
    }],

});