Ext.define('iFlat.view.report.bi.ProjectInProcess', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-bi-projectinprocess',

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
        id: 'rpt-bi-projectinprocess-stage',
        bind: {
            store: '{projectInProcessStage}'
        },
        queryMode: 'local',
        allowBlank: false,
        editable: false,
        forceSelection : true,
        anyMatch: true,
        displayField: 'name',
        valueField: 'projNo',
        width: 250,
        fieldLabel: '阶段',
        labelAlign: 'right',
        labelWidth: 40
    }, {
        xtype: 'datefield',
        id: 'rpt-bi-projectinprocess-date',
        allowBlank: false,
        editable: false,
        forceSelection : true,
        format: 'Y-m',
        width: 250,
        fieldLabel: '时间',
        labelAlign: 'right',
        labelWidth: 40
    }, {
        text: '查询',
        handler: 'search'
    },'->',{
        text: '导出',
        handler: 'exportToExcel'
    }, {
        text: '刷新',
        handler: 'refresh'
    }],

    items: [{
        xtype: 'pivotgrid',
        id: 'rpt-bi-projectinprocess-grid',
        plugins: [{
            ptype: 'pivotexporter'
        }],
        store: rptBiProjectInProcessGridStore = Ext.create('iFlat.store.report.bi.ProjectInProcess'),

        selModel: {
            type: 'spreadsheet'
        },
        flex: 1,
        border: true,
        collapsible: false,
        viewLayoutType: 'outline',
        startRowGroupsCollapsed: false,
        startColGroupsCollapsed: false,
        rowSubTotalsPosition: 'none',
        colSubTotalsPosition: 'none',
        rowGrandTotalsPosition: 'none',
        colGrandTotalsPosition: 'none',
        enableLocking: true,
        aggregate: [{
            dataIndex: 'value',
            align: 'right',
            width: 110,
            flex: true,
            renderer: function(a, b, c, d, e) {
                a = Flat.util.financeFormat(a, 2);
                //b.style = 'font-size: 14px;' + b.style;
                if(e % 3 == 2 && a) {
                    if(a > 0) {
                        b.style = 'color:#FF0000;' + b.style;
                    }
                    a = a + '%';
                }
                return a;
            }
        }],

        leftAxis: [{
            dataIndex: 'left',
            header: '船名',
            width: 300,
            align: 'center',
        }],

        topAxis: [{
            dataIndex: 'leftSub',
            sorterFn: function() {},  //不加排序函数的话，排序会出问题
        }, {
            dataIndex: 'top',
            sorterFn: function() {},  //不加排序函数的话，排序会出问题
        }],
    }]
});