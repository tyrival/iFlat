Ext.define('iFlat.view.report.ss.PotentialHazard', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-ss-potentialhazard',
    xtype: 'rpt-ss-potentialhazard',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'rpt-ss-potentialhazard',
    store: rptSsPotentialHazardStore = Ext.create('iFlat.store.ss.PotentialHazard', {
        autoLoad: false,
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-ss-potentialhazard-risklvl',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection: true,
            width: 200,
            labelAlign: 'right',
            labelWidth: 60,
            fieldLabel: '风险等级',
            bind: {
                store: '{ssPhRiskLvl}',
            },
        }, {
            xtype: 'combo',
            id: 'rpt-ss-potentialhazard-phtype',
            store: rptSsPotentialHazardPhTypeStore = Ext.create('iFlat.store.ss.PhCodeType'),
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : false,
            displayField: 'type',
            valueField: 'type',
            labelWidth: 60,
            width: 200,
            fieldLabel: '隐患类型',
        }, {
            xtype: 'combo',
            id: 'rpt-ss-potentialhazard-dept',
            bind: {
                store: '{ssPotentialHazardFuncDept}'
            },
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : false,
            width: 200,
            fieldLabel: '责任部门',
            labelWidth: 60,
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-ss-potentialhazard-from',
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
            id: 'rpt-ss-potentialhazard-to',
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
        dataIndex: 'potentialHazard.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'potentialHazard.time',
    }, {
        header: '部门',
        dataIndex: 'potentialHazard.dept',
    }, {
        header: '施工队',
        dataIndex: 'potentialHazard.team',
    }, {
        header: '班组',
        dataIndex: 'potentialHazard.groupName',
    }, {
        header: '责任人一卡通',
        dataIndex: 'potentialHazard.personAcc',
    }, {
        header: '责任人',
        dataIndex: 'potentialHazard.personName',
    }, {
        header: '岗位',
        dataIndex: 'potentialHazard.title',
    }, {
        header: '年龄',
        dataIndex: 'potentialHazard.age',
    }, {
        header: '工龄',
        dataIndex: 'potentialHazard.seniority',
    }, {
        header: '性别',
        dataIndex: 'potentialHazard.sex',
    }, {
        header: '工号',
        dataIndex: 'potentialHazard.projNo',
    }, {
        header: '工程名',
        dataIndex: 'potentialHazard.projName',
    }, {
        header: '区域',
        dataIndex: 'potentialHazard.area',
    }, {
        header: '位置',
        dataIndex: 'potentialHazard.position',
    }, {
        header: '负面发现',
        dataIndex: 'potentialHazard.description',
    }, {
        header: '隐患类型',
        dataIndex: 'potentialHazard.phType',
    }, {
        header: '隐患代码',
        dataIndex: 'potentialHazard.phCode',
    }, {
        header: '隐患内容',
        dataIndex: 'potentialHazard.content',
    }, {
        header: '整改措施',
        dataIndex: 'potentialHazard.measure',
    }, {
        header: '整改期限',
        dataIndex: 'potentialHazard.deadline',
    }, {
        header: '整改情况',
        dataIndex: 'potentialHazard.feedback',
    }, {
        header: '扣款',
        dataIndex: 'potentialHazard.amount',
    }, {
        header: '扣分',
        dataIndex: 'potentialHazard.score',
    }, {
        header: '事业部',
        dataIndex: 'potentialHazard.busiDivision',
    }, {
        header: '总管',
        dataIndex: 'potentialHazard.projMgr',
    }, {
        header: '主管',
        dataIndex: 'potentialHazard.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'potentialHazard.workMgr',
    }, {
        header: '班组长',
        dataIndex: 'potentialHazard.teamLeader',
    }, {
        header: '档长',
        dataIndex: 'potentialHazard.posiMgr',
    }, {
        text: '违规照片',
        dataIndex: 'potentialHazard.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        text: '整改后照片',
        dataIndex: 'potentialHazard.rectifyAtt',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '备注',
        dataIndex: 'potentialHazard.comment',
    }, {
        header: '查处人',
        dataIndex: 'potentialHazard.issuer',
    }, {
        header: '创建人',
        dataIndex: 'potentialHazard.creatorName',
    }, {
        header: '创建部门',
        dataIndex: 'potentialHazard.creatorDept',
    }, ],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsPotentialHazardStore,
        displayInfo: true,
    }

});