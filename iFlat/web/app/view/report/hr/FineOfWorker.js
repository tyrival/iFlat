Ext.define('iFlat.view.report.hr.FineOfWorker', {
    extend: 'Ext.panel.Panel',

    controller: 'rpt-hr-fineofworker',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-hr-fineofworker-dept',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 220,
            fieldLabel: '部门',
            labelAlign: 'right',
            labelWidth: 60,
            bind: {
                store: '{smDept}'
            },
            listeners: {
                select: 'onTeamInfoChange',
            }
        },{
            xtype: 'combo',
            id: 'rpt-hr-fineofworker-team',
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
            store: rptHrFineOfWorkerTeamStore = Ext.create('iFlat.store.code.Team'),
            listeners: {
                select: 'onTeamInfoChange',
            }
        }, {
            xtype: 'combo',
            id: 'rpt-hr-fineofworker-group',
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
            store: rptHrFineOfWorkerGroupStore = Ext.create('iFlat.store.code.Group'),
            listeners: {
                select: 'onTeamInfoChange',
            }
        }, '->', {
            text: '刷新',
            handler: 'refresh'
        }],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-hr-fineofworker-personname',
            queryMode: 'local',
            allowBlank: true,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            minChars: 0,
            displayField: 'name',
            valueField: 'name',
            width: 220,
            fieldLabel: '施工人员',
            labelAlign: 'right',
            labelWidth: 60,
            store: rptHrFineOfWorkerWorkerStore = Ext.create('iFlat.store.code.Worker'),
        }, {
            xtype: 'datefield',
            id: 'rpt-hr-fineofworker-from',
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
            id: 'rpt-hr-fineofworker-to',
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
            text: '导出-质量',
            handler: 'exportToExcel'
        }, {
            text: '导出-安全',
            handler: 'exportToExcel'
        }],
    }],

    items: [{
        xtype: 'grid',
        id: 'rpt-hr-fineofworker-grid1',
        title: '质量奖惩',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptHrFineOfWorkerQmStore = Ext.create('iFlat.store.report.qm.QualityFine'),
        columns: [{
            header: '工号',
            dataIndex: 'qualityFine.projNo',
        }, {
            header: '船名',
            dataIndex: 'qualityFine.projName',
        }, {
            header: '日期',
            dataIndex: 'qualityFine.date',
            formatter: 'date("Y-m-d")'
        }, {
            header: '专业',
            dataIndex: 'qualityFine.profession',
        }, {
            header: '部门',
            dataIndex: 'qualityFine.dept',
        }, {
            header: '施工队',
            dataIndex: 'qualityFine.team',
        }, {
            header: '班组',
            dataIndex: 'qualityFine.group',
        }, {
            header: '人员卡号',
            dataIndex: 'qualityFine.personAcc',
        }, {
            header: '人员',
            dataIndex: 'qualityFine.personName',
        }, {
            header: '描述',
            dataIndex: 'qualityFine.description',
        }, {
            text: '附件',
            dataIndex: 'qualityFine.attachment',
            width: 60,
            renderer: function(v) {
                if(!v || v == '') {
                    return '';
                } else {
                    return "<a href='" + v + "'>附件</a>";
                }
            },
        }, {
            header: '考核性质',
            dataIndex: 'qualityFine.category',
        }, {
            header: '金额',
            align: 'right',
            dataIndex: 'qualityFine.amount',
        }, {
            header: '考核人',
            dataIndex: 'qualityFine.qc',
        }, {
            header: '备注',
            dataIndex: 'qualityFine.comment',
        }, {
            header: '登记人',
            dataIndex: 'qualityFine.creator',
            hidden: true
        }, {
            header: '登记日期',
            dataIndex: 'qualityFine.createTime',
            hidden: true
        }]
    }, {
        xtype: 'grid',
        id: 'rpt-hr-fineofworker-grid2',
        title: '安全奖惩',
        plugins: [{
            ptype: 'gridexporter'
        }],
        margin: '10 0 0 0',
        border: true,
        columnLines: true,
        flex: 1,
        store: rptHrFineOfWorkerSsStore = Ext.create('iFlat.store.report.ss.SafetyFine'),
        columns: [{
            header: '工号',
            dataIndex: 'safetyFine.projNo',
        }, {
            header: '船名',
            dataIndex: 'safetyFine.projName',
        }, {
            header: '日期',
            dataIndex: 'safetyFine.date',
            formatter: 'date("Y-m-d")'
        }, {
            header: '类型',
            dataIndex: 'safetyFine.type',
        }, {
            header: '部门',
            dataIndex: 'safetyFine.dept',
        }, {
            header: '施工队',
            dataIndex: 'safetyFine.team',
        }, {
            header: '班组',
            dataIndex: 'safetyFine.group',
        }, {
            header: '人员卡号',
            dataIndex: 'safetyFine.personAcc',
        }, {
            header: '人员',
            dataIndex: 'safetyFine.personName',
        }, {
            header: '描述',
            dataIndex: 'safetyFine.description',
        }, {
            text: '附件',
            dataIndex: 'qualityFine.attachment',
            width: 60,
            renderer: function(v) {
                if(!v || v == '') {
                    return '';
                } else {
                    return "<a href='" + v + "'>附件</a>";
                }
            },
        }, {
            header: '位置',
            dataIndex: 'safetyFine.position',
        }, {
            header: '地点',
            dataIndex: 'safetyFine.place',
        }, {
            header: '金额',
            align: 'right',
            dataIndex: 'safetyFine.amount',
        }, {
            header: '整改措施',
            dataIndex: 'safetyFine.measure',
        }, {
            header: '整改期限',
            dataIndex: 'safetyFine.deadline',
        }, {
            header: '整改情况',
            dataIndex: 'safetyFine.feedback',
        }, {
            header: '作业长',
            dataIndex: 'safetyFine.manager',
        }, {
            header: '班组长',
            dataIndex: 'safetyFine.groupLeader',
        }, {
            header: '事业部',
            dataIndex: 'safetyFine.mgrDept',
        }, {
            header: '隐患类型',
            dataIndex: 'safetyFine.dangerType',
        }, {
            header: '伤害类型',
            dataIndex: 'safetyFine.damageType',
        }, {
            header: '风险等级',
            dataIndex: 'safetyFine.riskLevel',
        }, {
            header: '检查类型',
            dataIndex: 'safetyFine.inspectType',
        }, {
            header: '备注',
            dataIndex: 'safetyFine.comment',
        }, {
            header: '签发人',
            dataIndex: 'safetyFine.issuer',
        }, {
            header: '登记人',
            dataIndex: 'safetyFine.creator',
            hidden: true
        }, {
            header: '登记日期',
            dataIndex: 'safetyFine.createTime',
            hidden: true
        }]
    }]
});