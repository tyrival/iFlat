Ext.define('iFlat.view.report.bi.ProjectInfo', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-bi-projectinfo',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'render'
    },
    tbar: [{
        xtype: 'combo',
        id: 'rpt-bi-projectinfo-combo',
        bind: {
            store: '{month}',
        },
        queryMode: 'local',
        allowBlank: false,
        editable: false,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 250,
        fieldLabel: '年月',
        labelAlign: 'right',
        labelWidth: 40
    }, {
        text: '查询',
        handler: 'search'
    },'->',{
        text: '刷新',
        handler: 'refresh'
    }],

    items: [{
        xtype: 'grid',
        id: 'rpt-bi-projectinfoproj-grid1',
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptBiProjectInfoStore = Ext.create('iFlat.store.bi.ProjectInfo'),
        columns: [{
            text: '船名',
            flex: true,
            dataIndex: 'projectInfo.shortName',
        }, {
            text: '产品编号',
            flex: true,
            dataIndex: 'projectInfo.code',
        }, {
            text: '建造地点',
            flex: true,
            dataIndex: 'projectInfo.actualPlace',
        }, {
            text: '订货单位',
            flex: true,
            dataIndex: 'projectInfo.owner',
        }, {
            text: '合同交货期',
            flex: true,
            dataIndex: 'projectInfo.deliveryDate',
            renderer: 'columnRenderer'
        }, ]
    }, {
        xtype: 'grid',
        id: 'rpt-bi-projectinfoproj-grid2',
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        columns: [{
            text: '船名',
            flex: true,
            dataIndex: 'projectInfo.shortName',
        }, {
            text: '开工',
            flex: true,
            dataIndex: 'projectInfo.commenceAct',
            renderer: 'columnRenderer'
        }, {
            text: '上船台',
            flex: true,
            dataIndex: 'projectInfo.shipwayAct',
            renderer: 'columnRenderer'
        }, {
            text: '下水',
            flex: true,
            dataIndex: 'projectInfo.launchAct',
            renderer: 'columnRenderer'
        }, {
            text: '试航',
            flex: true,
            dataIndex: 'projectInfo.seaTrialAct',
            renderer: 'columnRenderer'
        }, {
            text: '交船',
            flex: true,
            dataIndex: 'projectInfo.deliveryAct',
            renderer: 'columnRenderer'
        }, ]
    }, {
        xtype: 'grid',
        id: 'rpt-bi-projectinfoproj-grid3',
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        columns: [{
            text: '船名',
            flex: true,
            dataIndex: 'projectInfo.shortName',
        }, {
            text: '分段周期',
            flex: true,
            dataIndex: 'projectInfo.blockPrdAct',
        }, {
            text: '船台周期',
            flex: true,
            dataIndex: 'projectInfo.shipwayPrdAct',
        }, {
            text: '码头周期',
            flex: true,
            dataIndex: 'projectInfo.dockPrdAct',
        }, {
            text: '建造总周期',
            flex: true,
            dataIndex: 'projectInfo.buildPrdAct',
        }]
    }]
});