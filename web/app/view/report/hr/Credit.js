Ext.define('iFlat.view.report.hr.Credit', {
    extend: 'Ext.grid.Panel',
    xtype: 'rpt-hr-credit',

    requires: [
        'iFlat.view.report.hr.CreditController',
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],
    
    controller: 'rpt-hr-credit',
    store: rptHrCreditStore = Ext.create('iFlat.store.hr.Credit', {
        autoLoad: false,
        pageSize: 0,
        proxy: {
            enablePaging: true,
            url: 'hr_listCredit.action',
            reader: {
                type: 'json',
                rootProperty: 'list',
            },
        },
    }),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-hr-credit-type',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection: true,
            width: 180,
            labelAlign: 'right',
            labelWidth: 60,
            fieldLabel: '类型',
            bind: {
                store: '{hrCreditType}',
            },
        }, {
            xtype: 'combo',
            id: 'rpt-hr-credit-dept',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 250,
            fieldLabel: '部门',
            labelAlign: 'right',
            labelWidth: 60,
            bind: {
                store: '{hrDept}'
            },
            listeners: {
                select: 'onDeptInfoChange',
            }
        }, {
            xtype: 'combo',
            id: 'rpt-hr-credit-personname',
            queryMode: 'local',
            allowBlank: true,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            anyMatch: true,
            minChars: 0,
            displayField: 'name',
            valueField: 'name',
            width: 200,
            fieldLabel: '人员',
            labelAlign: 'right',
            labelWidth: 60,
            store: rptHrCreditEmployeeStore = Ext.create('iFlat.store.code.Employee'),
        }],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-hr-credit-from',
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
            id: 'rpt-hr-credit-to',
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
        header: '日期',
        dataIndex: 'credit.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '责任部门',
        dataIndex: 'credit.creatorDept',
    }, {
        header: '工号',
        dataIndex: 'credit.projNo',
    }, {
        header: '船名',
        dataIndex: 'credit.projName',
    }, {
        header: '类型',
        dataIndex: 'credit.type',
    }, {
        header: '部门',
        dataIndex: 'credit.dept',
    }, {
        header: '科室/队伍',
        dataIndex: 'credit.team',
    }, {
        header: '班组',
        dataIndex: 'credit.group',
    }, {
        header: '负责人',
        dataIndex: 'credit.manager',
    }, {
        header: '区域',
        dataIndex: 'credit.area',
    }, {
        header: '描述',
        dataIndex: 'credit.description',
    }, {
        text: '附件',
        dataIndex: 'credit.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a href='" + v + "'>附件</a>";
            }
        },
    }, {
        header: '区域长',
        dataIndex: 'credit.areaMgr',
    }, {
        header: '总管',
        dataIndex: 'credit.projMgr',
    }, {
        header: '主管',
        dataIndex: 'credit.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'credit.workMgr',
    }, {
        header: '班长',
        dataIndex: 'credit.groupMgr',
    }, {
        header: '责任人',
        dataIndex: 'credit.personName',
    }, {
        header: '证件号',
        dataIndex: 'credit.personAcc',
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'credit.amount',
    }, {
        header: '扣分',
        align: 'right',
        dataIndex: 'credit.score',
    }, {
        header: '登记人',
        dataIndex: 'credit.creatorName',
        hidden: true
    }, {
        header: '登记日期',
        dataIndex: 'credit.createTime',
        formatter: 'date("Y-m-d")',
        hidden: true
    }],
});