Ext.define('iFlat.view.sm.SbTargetCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-sbtargetcost',

    requires: [
        'iFlat.view.sm.SbTargetCostController'
    ],

    controller: 'sm-sbtargetcost',

    store: smSbTargetCostStore = Ext.create('iFlat.store.sm.SbTargetCost'),

    tbar: [{
        xtype: 'combo',
        id: 'sm-sbtargetcost-combo',
        store: smSbTargetCostComboStore = Ext.create('iFlat.store.bi.Project'),
        queryMode: 'local',
        allowBlank: false,
        editable: true,
        typeAhead: true,
        minChars: 0,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 350,
        fieldLabel: '船名',
        labelAlign: 'right',
        labelWidth: 40
    }, {
        text: '查询',
        handler: 'search'
    }, '->', {
        text: '刷新',
        id: 'sm-sbtargetcost-refresh',
        handler: 'refresh',
    }],

    columns: [{
        text: '分解',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'split',
    }, {
        header: 'id',
        dataIndex: 'sbTargetCost.id',
        hidden: true
    }, {
        header: '工号',
        width: 150,
        dataIndex: 'sbTargetCost.projNo',
    }, {
        header: '船名',
        flex: true,
        dataIndex: 'sbTargetCost.projName',
    }, {
        header: '部门',
        width: 200,
        dataIndex: 'sbTargetCost.deptName',
    }, {
        header: '金额',
        width: 200,
        dataIndex: 'sbTargetCost.amount',
    }],
});
