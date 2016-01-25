Ext.define('iFlat.view.report.bi.DeptCstCtrl', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-bi-deptcstctrl',

    requires: [
        'Ext.pivot.Grid',
        'Ext.pivot.plugin.Exporter'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    tbar: [{
        xtype: 'datefield',
        id: 'rpt-bi-deptcstctrl-date',
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
        id: 'rpt-bi-deptcstctrl-grid',
        plugins: [{
            ptype: 'pivotexporter'
        }],
        store: rptBiDeptCstCtrlGridStore = Ext.create('iFlat.store.report.bi.DeptCstCtrl'),

        selModel: {
            type: 'cellmodel'
        },

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
            renderer: function(a, b, c, d, e) {
                a = financeFormat(a, 2);
                //b.style = 'font-size: 15px;' + b.style;
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
            header: '部门',
            width: 180,
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