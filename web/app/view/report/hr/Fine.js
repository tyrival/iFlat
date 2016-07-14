Ext.define('iFlat.view.report.hr.Fine', {
    extend: 'Ext.grid.Panel',
    xtype: 'rpt-hr-fine',

    requires: [
        'iFlat.view.report.hr.FineController',
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],
    
    controller: 'rpt-hr-fine',
    store: rptHrFineStore = Ext.create('iFlat.store.sm.Fine', {
        autoLoad: false,
        pageSize: 0,
        proxy: {
            enablePaging: true,
        },
    }),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-hr-fine-dept',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '部门',
            labelAlign: 'right',
            labelWidth: 50,
            bind: {
                store: '{smDept}'
            },
            listeners: {
                select: 'onTeamInfoChange',
            }
        },{
            xtype: 'combo',
            id: 'rpt-hr-fine-team',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            displayField: 'teamName',
            valueField: 'teamName',
            width: 300,
            fieldLabel: '施工队',
            labelAlign: 'right',
            labelWidth: 60,
            store: rptHrFineTeamStore = Ext.create('iFlat.store.code.Team'),
            listeners: {
                select: 'onTeamInfoChange',
            }
        }, {
            xtype: 'combo',
            id: 'rpt-hr-fine-group',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            displayField: 'groupName',
            valueField: 'groupName',
            width: 220,
            fieldLabel: '班组',
            labelAlign: 'right',
            labelWidth: 40,
            store: rptHrFineGroupStore = Ext.create('iFlat.store.code.Group'),
            listeners: {
                select: 'onTeamInfoChange',
            }
        }, {
            xtype: 'combo',
            id: 'rpt-hr-fine-personname',
            queryMode: 'local',
            allowBlank: true,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            minChars: 0,
            displayField: 'name',
            valueField: 'name',
            width: 180,
            fieldLabel: '人员',
            labelAlign: 'right',
            labelWidth: 50,
            store: rptHrFineWorkerStore = Ext.create('iFlat.store.code.Worker'),
        }],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-hr-fine-type',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection: true,
            width: 180,
            labelAlign: 'right',
            labelWidth: 50,
            fieldLabel: '类型',
            bind: {
                store: '{smFineType}',
            },
        }, {
            xtype: 'datefield',
            id: 'rpt-hr-fine-from',
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
            id: 'rpt-hr-fine-to',
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
        header: '工号',
        dataIndex: 'fine.projNo',
    }, {
        header: '船名',
        dataIndex: 'fine.projName',
    }, {
        header: '日期',
        dataIndex: 'fine.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '考核类',
        dataIndex: 'fine.type',
    }, {
        header: '类别',
        dataIndex: 'fine.category',
    }, {
        header: '部门',
        dataIndex: 'fine.dept',
    }, {
        header: '施工队',
        dataIndex: 'fine.team',
    }, {
        header: '班组',
        dataIndex: 'fine.group',
    }, {
        header: '人员卡号',
        dataIndex: 'fine.personAcc',
        hidden: true
    }, {
        header: '人员',
        dataIndex: 'fine.personName',
    }, {
        header: '描述',
        dataIndex: 'fine.description',
    }, {
        text: '附件',
        dataIndex: 'fine.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a href='" + v + "'>附件</a>";
            }
        },
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'fine.amount',
    }, {
        header: '扣分',
        dataIndex: 'fine.score',
    }, {
        header: '签发人',
        dataIndex: 'fine.issuer',
    }],
});