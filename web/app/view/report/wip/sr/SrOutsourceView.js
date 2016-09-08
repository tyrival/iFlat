Ext.define('iFlat.view.report.wip.sr.SrOutsourceView', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-wip-sr-sroutsourceview',
    xtype: 'rpt-wip-sr-sroutsourceview',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    columnLines: true,
    controller: 'rpt-wip-sr-sroutsourceview',
    store: rptWipSrOutsourceViewStore = Ext.create('iFlat.store.wip.SrOutsourceView'),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-wip-sr-sroutsourceview-from',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '起始时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            xtype: 'datefield',
            id: 'rpt-wip-sr-sroutsourceview-to',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '截止时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            text: '查询',
            ui: 'orig-blue',
            handler: 'search'
        }, '->', {
            text: '导出',
            handler: 'exportToExcel'
        }, {
            text: '刷新',
            handler: 'refresh'
        }],
    }],
    columns: [{
        header: '供应商单位名称',
        dataIndex: 'srOutsourceView.vendorType',
        width: 200,
    }, {
        text: '供方资质',
        columns: [{
            header: '合格供方',
            dataIndex: 'srOutsourceView.vendorType1',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '准入供方',
            dataIndex: 'srOutsourceView.vendorType2',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '临时供方',
            dataIndex: 'srOutsourceView.vendorType3',
            align: 'center',
            renderer: 'columnRenderer'
        }]
    }, {
        header: '船名',
        dataIndex: 'srOutsourceView.projName',
    }, {
        header: '工号',
        dataIndex: 'srOutsourceView.projNo',
    }, {
        header: '项目名称',
        dataIndex: 'srOutsourceView.name',
    }, {
        header: '规格尺寸',
        dataIndex: 'srOutsourceView.specs',
    }, {
        text: '委外类型',
        columns: [{
            header: '外包',
            dataIndex: 'srOutsourceView.type1',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '外协',
            dataIndex: 'srOutsourceView.type2',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '外购',
            dataIndex: 'srOutsourceView.type3',
            align: 'center',
            renderer: 'columnRenderer'
        }]
    }, {
        header: '合同签订日期',
        dataIndex: 'srOutsourceView.contDate',
        formatter: 'date("Y-m-d")'
    }, {
        text: '竞价方式',
        columns: [{
            header: '封闭报价',
            dataIndex: 'srOutsourceView.bidType1',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '招投标',
            dataIndex: 'srOutsourceView.bidType2',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '客户指定',
            dataIndex: 'srOutsourceView.bidType3',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '单一来源',
            dataIndex: 'srOutsourceView.bidType4',
            align: 'center',
            renderer: 'columnRenderer'
        }, {
            header: '传真比价',
            dataIndex: 'srOutsourceView.bidType5',
            align: 'center',
            renderer: 'columnRenderer'
        }]
    }, {
        header: '单一供方说明',
        dataIndex: 'srOutsourceView.bidComment',
    }, {
        header: '目标成本（万元）',
        dataIndex: 'srOutsourceView.targetCst',
    }, {
        header: '报价金额（万元）',
        dataIndex: 'srOutsourceView.settAmountFirst',
    }, {
        header: '数量',
        dataIndex: 'srOutsourceView.qty',
    }, {
        header: '单位',
        dataIndex: 'srOutsourceView.unit',
    }, /*{
        header: '合同单价',
        dataIndex: 'srOutsourceView.description',
    }, */{
        header: '合同总价',
        dataIndex: 'srOutsourceView.contAmount',
    }, {
        header: '节约金额（万元）',
        dataIndex: 'srOutsourceView.settAmountDiff',
    }, {
        header: '合同号',
        dataIndex: 'srOutsourceView.contNo',
    }, {
        header: '结算价格（万元）',
        dataIndex: 'srOutsourceView.settAmountSecond',
    }, {
        header: '有无质保金',
        dataIndex: 'srOutsourceView.retention',
    }],

});