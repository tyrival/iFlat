Ext.define('iFlat.view.report.bi.ProjectCstCtrl', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-bi-projectcstctrl',

    requires: [
        'Ext.pivot.Grid',
        'Ext.pivot.plugin.Exporter'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-bi-projectcstctrl-combo',
        store: rptBiProjectCstCtrlComboStore = Ext.create('iFlat.store.bi.Project'),
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
    }, {
        xtype: 'label',
        text: '金额单位： 万元',
        style: 'font-size: 16px'
    },'->',{
        text: '导出',
        handler: 'exportToExcel'
    }, {
        text: '刷新',
        handler: 'refresh'
    }],

    items: [{
        xtype: 'pivotgrid',
        id: 'rpt-bi-projectcstctrl-grid',
        plugins: [{
            ptype: 'pivotexporter'
        }],
        store: rptBiProjectCstCtrlGridStore = Ext.create('iFlat.store.report.bi.ProjectCstCtrl'),

        selModel: {
            type: 'rowmodel'
        },
        flex: 1,
        viewLayoutType: 'outline',
        startRowGroupsCollapsed: false,
        rowGrandTotalsPosition: 'none',
        colGrandTotalsPosition: 'none',
        aggregate: [{
            dataIndex: 'value',
            align: 'right',
            flex: true,
            aggregator: 'sum',
            renderer: function(value, metaData, c, d,e,f,g,h,i) {
                if(value > 0 && metaData.columnIndex == 4) {
                    metaData.style = 'color:#FF0000;' + metaData.style;
                }
                return financeFormat(value, 2);
            }
        }],

        leftAxis: [{
            dataIndex: 'left',
            header: '部门',
            width: 180,
            sorterFn: function( o1, o2 ) {
                debugger;
                var sorterIndex = function sorterIndex(o) {
                    var v;
                    switch (o.sortValue) {
                        case '造船事业部': v = 1; break;
                        case '造船加工车间': v = 2; break;
                        case '造船船体车间': v = 3; break;
                        case '造船安装车间': v = 4; break;
                        case '造船模块车间': v = 5; break;
                        case '造船启东工程部': v = 6; break;
                        case '造船如皋工程部': v = 7; break;
                        case '设计部': v = 8; break;
                        case '研发部': v = 9; break;
                        case '物资部': v = 10; break;
                        case '营销中心': v = 11; break;
                        case '质量部': v = 12; break;
                        case '财务部': v = 13; break;
                        default: v = 99;
                    }
                    return v;
                }
                var v1 = sorterIndex(o1);
                var v2 = sorterIndex(o2);
                return v1 - v2;
            }
        },{
            dataIndex: 'leftSub',
            header: '项目',
            align: 'center',
            sortable: true,
            width: 180,
            sorterFn: function( o1, o2 ) {
                debugger
                var sorterIndex = function sorterIndex(o) {
                    debugger
                    var v;
                    switch (o.sortValue) {
                        case '劳务工费': v = 1; break;
                        case '本工薪酬': v = 2; break;
                        case '制造费用': v = 3; break;
                        case '动力费': v = 4; break;
                        case '外协加工费': v = 5; break;
                        case '设备工装费': v = 6; break;
                        case '专项协作费': v = 7; break;
                        case '试航费': v = 8; break;
                        case '保修费': v = 9; break;
                        case '加帐人工费': v = 10; break;
                        default: v = 99;
                    }
                    return v;
                }
                var v1 = sorterIndex(o1);
                var v2 = sorterIndex(o2);
                return v1 - v2;
            }
        }],

        topAxis: [{
            dataIndex: 'top',
            sorterFn: function() {},  //不加排序函数的话，排序会出问题
        }],
    }]
});