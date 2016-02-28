Ext.define('iFlat.view.bi.ProjectCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-projectcost',
    xtype: 'bi-projectcost',

    controller: 'bi-projectcost',
    store: biProjectCostStore = Ext.create('iFlat.store.bi.ProjectCost'),
    id: 'bi-projectcost',
    tbar: [{
        text: '新增',
        id: 'bi-projectcost-add',
        ui: 'orig-blue',
        handler: 'showEditWindow',
    }, '->',{
        text: '刷新',
        id: 'bi-projectcost-refresh',
        handler: 'refreshList',
    }],
    columns: [{
        header: '工号',
        dataIndex: 'projectCost.projNo',
    }, {
        header: '类型',
        dataIndex: 'projectCost.type',
    }, {
        header: '销售收入',
        flex: 1,
        align: 'right',
        dataIndex: 'projectCost.salesRevenue',
        renderer: 'renderer'
    }, {
        header: '总成本',
        flex: 1,
        align: 'right',
        dataIndex: 'projectCost.costAdj',
        renderer: 'renderer'
    }, {
        header: '毛利',
        flex: 1,
        align: 'right',
        dataIndex: 'projectCost.grossProfit',
        renderer: 'renderer'
    }, {
        header: '毛利率%',
        flex: 1,
        align: 'right',
        dataIndex: 'projectCost.profitMargin',
        renderer: 'renderer'
    }, {
        header: '器材费比例%',
        dataIndex: 'projectCost.matPct',
        hidden: true
    }, {
        header: '加工费比例%',
        dataIndex: 'projectCost.manuPct',
        hidden: true
    }, {
        header: '专项费比例%',
        dataIndex: 'projectCost.auxPct',
        hidden: true
    }, {
        text: '总成本',
        id: 'bi-projectcost-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '总成本',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showEditWindow',
        editor: {
            xtype: 'label',
        }
    }, {
        text: '主要设备费',
        id: 'bi-majordevcst-editinfo',
        width: 100,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '主要设备费',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showEditWindow',
        editor: {
            xtype: 'label',
        }
    }, {
        text: '主材费',
        id: 'bi-majormatcst-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '主材费',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showEditWindow',
        editor: {
            xtype: 'label',
        }
    }, {
        text: '主材用量',
        id: 'bi-majormatqty-editinfo',
        width: 80,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '主材用量',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showEditWindow',
        editor: {
            xtype: 'label',
        }
    }, {
        text: '删除',
        id: 'bi-projectcost-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProjectCost',
        editor: {
            xtype: 'label',
        }
    }],

});