Ext.define('iFlat.view.bi.Contract', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-contract',
    xtype: 'bi-contract',

    controller: 'bi-contract',
    store: biContractStore = Ext.create('iFlat.store.bi.Contract'),
    id: 'bi-contract',
    tbar: [{
        text: '新增',
        id: 'bi-contract-add',
        ui: 'orig-blue',
        handler: 'showContractEdit',
    }, '->', {
        text: '刷新',
        id: 'bi-contract-refresh',
        handler: 'refreshList',
    }],
    columns: [{
        header: 'id',
        dataIndex: 'contract.id',
        hidden: true,
    }, {
        header: 'fixed',
        dataIndex: 'contract.fixed',
        hidden: true,
    }, {
        header: 'version',
        dataIndex: 'contract.version',
        hidden: true,
    }, {
        header: '工号',
        dataIndex: 'contract.projNo',
    }, {
        header: '船东',
        dataIndex: 'contract.owner',
    }, {
        header: '船检',
        dataIndex: 'contract.surveyor',
    }, {
        header: '交船日',
        dataIndex: 'contract.deliveryDate',
        formatter: 'date("Y-m-d")'
    }, {
        header: '合同价',
        dataIndex: 'contract.amount',
    }, {
        header: '币种',
        dataIndex: 'contract.currency',
    }, {
        header: '合同汇率',
        dataIndex: 'contract.contractRate',
    }, {
        header: '结算美元',
        dataIndex: 'contract.usd',
    }, {
        header: '实际汇率',
        dataIndex: 'contract.actualRate',
    }, {
        header: '结算人民币',
        dataIndex: 'contract.cny',
    }, {
        header: '加帐美元',
        dataIndex: 'contract.usdAdd',
    }, {
        header: '加帐人民币',
        dataIndex: 'contract.cnyAdd',
    }, {
        header: '佣金比例',
        dataIndex: 'contract.commissionPct',
    }, {
        text: '编辑',
        id: 'bi-contract-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showContractEdit',
        editor: {
            xtype: 'label',
        }
    }, {
        text: '删除',
        id: 'bi-contract-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteContract',
        editor: {
            xtype: 'label',
        }
    }],

});