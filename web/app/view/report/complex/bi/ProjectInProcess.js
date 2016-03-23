Ext.define('iFlat.view.report.complex.bi.ProjectInProcess', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-complex-bi-projectinprocess',

    requires: [
        'Ext.pivot.Grid',
        'iFlat.view.report.complex.bi.ProjectInProcessController'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'init',
    },

    tbar: [{
        xtype: 'combo',
        id: 'rpt-complex-bi-projectinprocess-combo-stage',
        bind: {
            store: '{projectInProcessStage}'
        },
        queryMode: 'local',
        allowBlank: false,
        editable: false,
        forceSelection : true,
        displayField: 'name',
        valueField: 'projNo',
        width: 250,
        fieldLabel: '阶段',
        labelAlign: 'right',
        labelWidth: 40,
        listeners: {
            change: 'selectionChange'
        }
    },],

    items: [{
        xtype: 'datefield',
        id: 'rpt-complex-bi-projectinprocess-period',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'textfield',
        id: 'rpt-complex-bi-projectinprocess-stage',
        hidden: true,
        listeners: {
            change: 'reload'
        }
    }, {
        xtype: 'pivotgrid',
        id: 'rpt-complex-bi-projectinprocess-grid',
        store: rptComplexBiProjectInProcessGridStore = Ext.create('iFlat.store.report.bi.ProjectInProcess'),

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