Ext.define('iFlat.view.report.complex.bi.DeptCstCtrl', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-complex-bi-deptcstctrl',

    requires: [
        'Ext.pivot.Grid',
        'iFlat.view.report.complex.bi.DeptCstCtrlController'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'init',
    },

    items: [{
        xtype: 'datefield',
        id: 'rpt-complex-bi-deptcstctrl-period',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'pivotgrid',
        store: rptComplexBiDeptCstCtrlGridStore = Ext.create('iFlat.store.report.bi.DeptCstCtrl'),
        selModel: {
            type: 'cellmodel'
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