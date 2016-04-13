Ext.define('iFlat.view.sm.temp.detail.SrApplyMisc', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-detail-srapplymisc',

    requires: [
        'iFlat.view.sm.temp.SrSettlementController'
    ],
    controller: 'sm-srsettlement',

    width: 800,
    scrollable: true,
    border: true,
    columnLines: true,
    store: smSrApplyMiscDetailStore = Ext.create('iFlat.store.sm.SrSettlementDetlFirst'),

    tbar: [{
        xtype: 'button',
        text: '新增',
        ui: 'orig-blue',
        name: 'sm-srsettlementedit-detail-add',
        handler: 'addDetail'
    }, '->', {
        text: '刷新',
        handler: 'refreshDetail',
    }],
    plugins: [
        smSrApplyMiscDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-srapplymiscedit-detail-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateDetail',
                cancelEdit: 'deleteEmptyRecord',
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
        header: 'ID',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.content',
        hidden: true
    }, {
        header: '类型',
        width: 120,
        dataIndex: 'srSettlementDetlFirst.type',
        editor: {
            allowBlank: false,
        }
    }, {
        header: '施工内容',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.applyContent',
        editor: {
            allowBlank: false,
        }
    }, {
        header: '规格',
        dataIndex: 'srSettlementDetlFirst.spec',
        editor: {
        }
    }, {
        header: '单位',
        dataIndex: 'srSettlementDetlFirst.unit',
        editor: {
        }
    }, {
        header: '数量',
        dataIndex: 'srSettlementDetlFirst.applyQty1',
        editor: {
        }
    }, {
        header: '备注',
        width: 150,
        dataIndex: 'srSettlementDetlFirst.comment',
        editor: {
        }
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'srSettlementDetlFirst.amount',
    }, {
        header: '施工内容（确认）',
        width: 200,
        dataIndex: 'srSettlementDetlFirst.adjustContent',
    }, {
        header: '数量（确认）',
        dataIndex: 'srSettlementDetlFirst.adjustQty1',
    }, ],
});
