Ext.define('iFlat.view.report.complex.Bi', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-complex-bi',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    bodyStyle: {
        background: '#EEE',
    },

    dockedItems: {
        dock: 'top',
        xtype: 'toolbar',
        style: {
            background: '#EEE',
        },
        items: [{
            xtype: 'datefield',
            id: 'rpt-complex-bi-period',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            format: 'Y-m',
            width: 250,
            fieldLabel: '期间',
            labelAlign: 'right',
            labelWidth: 40,
            listeners: {
                change: 'selectionChange'
            }
        }, {
            xtype: 'combo',
            id: 'rpt-complex-bi-project',
            store: rptComplexBiProject = Ext.create('iFlat.store.bi.Project'),
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : true,
            anyMatch: true,
            displayField: 'name',
            valueField: 'projNo',
            width: 350,
            fieldLabel: '船名',
            labelAlign: 'right',
            labelWidth: 40,
            listeners: {
                change: 'selectionChange'
            }
        }, /*{
            xtype: 'combo',
            id: 'rpt-complex-bi-stage',
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
        }, */{
            xtype: 'button',
            text: '报表',
            id: 'rpt-complex-bi-btn',
            menu: [{
                text:'全部打开',
                handler: 'openAll',
            }, '-', {
                text:'完工船情况',
                value: 'ProjectInfo',
                handler: 'addSubPanel',
            }, {
                text:'单船总成本',
                value: 'ProjectCost',
                handler: 'addSubPanel',
            }, {
                text:'器材费',
                value: 'ProjectDevMatCost',
                handler: 'addSubPanel',
            },  {
                text:'主要设备费用',
                value: 'MajorDevCst',
                handler: 'addSubPanel',
            },  {
                text:'主要材料费用',
                value: 'MajorMatCst',
                handler: 'addSubPanel',
            },  {
                text:'主要材料用量',
                value: 'MajorMatQty',
                handler: 'addSubPanel',
            }, {
                text:'加工费',
                value: 'ProjectManuCost',
                handler: 'addSubPanel',
            }, {
                text:'加工费构成',
                value: 'ManuCstCompose',
                handler: 'addSubPanel',
            }, {
                text:'专项费',
                value: 'ProjectAuxCost',
                handler: 'addSubPanel',
            }, {
                text:'专项费构成',
                value: 'AuxCstCompose',
                handler: 'addSubPanel',
            }, {
                text:'加帐',
                value: 'AdditionalBill',
                handler: 'addSubPanel',
            }, {
                text:'目标成本任务书',
                value: 'ProjectCstCtrl',
                handler: 'addSubPanel',
            }, {
                text:'在建船舶',
                value: 'ProjectInProcess',
                handler: 'addSubPanel',
            }, {
                text:'部门可控费用',
                value: 'DeptCstCtrl',
                handler: 'addSubPanel',
            }, ]
        }]
    },


    items: [{
        xtype: 'tabpanel',
        plain: true,
        flex: 1,
        id: 'rpt-complex-bi-tabpanel',
        listeners: {
            tabchange: 'activateTab'
        },
        items: [{
            title: '',
            closable: false,
            hidden: true
        }]
    }]
});