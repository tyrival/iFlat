Ext.define('iFlat.view.sm.temp.detail.SrAdjustSys', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-sradjustsys',

    requires: [
        'iFlat.view.sm.SrProfessionalManagerAuditController'
    ],
    controller: 'sm-srprofessionalmanageraudit',

    width: 830,
    scrollable: true,
    border: true,
    columnLines: true,
    store: smSrAdjustSysDetailStore = Ext.create('iFlat.store.sm.SrSettlementDetlFirst'),

    tbar: ['->', {
        text: '刷新',
        handler: 'refresh',
    }],
    plugins: [
        smSrAdjustSysDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-sradjustsysedit-detail-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateDetail',
            }
        })
    ],

    columns: [{
        text: '删除',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-close',
        name: 'sm-srsettlementedit-detail-delete',
        handler: 'deleteDetail',
        editor: {
            xtype: 'label'
        }
    }, {
        header: '类型',
        width: 120,
        dataIndex: 'srSettlementDetlFirst.type',
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.applyContent',
        shrinkWrap: 1,
    }, {
        header: '施工内容（确认）',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.adjustContent',
        shrinkWrap: 1,
        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
            if (value == record.get('srSettlementDetlFirst.applyContent')) {
                return '';
            } else {
                return value;
            }
        },
        editor: {
        }
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlFirst.applyQty1',
    }, {
        header: '数量（确认）',
        dataIndex: 'srSettlementDetlFirst.adjustQty1',
        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
            if (value == record.get('srSettlementDetlFirst.applyQty1')) {
                return '';
            } else {
                return value;
            }
        },
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlFirst.spec',
    }, {
        header: '单位',
        dataIndex: 'srSettlementDetlFirst.unit',
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementDetlFirst.comment',
        shrinkWrap: 1,
    }],
});
