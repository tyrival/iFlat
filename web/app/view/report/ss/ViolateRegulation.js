Ext.define('iFlat.view.report.ss.ViolateRegulation', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-ss-violateregulation',
    xtype: 'rpt-ss-violateregulation',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'rpt-ss-violateregulation',
    store: rptSsViolateRegulationStore = Ext.create('iFlat.store.ss.ViolateRegulation', {
        autoLoad: false,
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-ss-violateregulation-risklvl',
            store: rptSsViolateRegulationPhTypeStore = Ext.create('iFlat.store.ss.VrCodeRiskLvl'),
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : false,
            displayField: 'riskLvl',
            valueField: 'riskLvl',
            width: 200,
            labelAlign: 'right',
            labelWidth: 60,
            fieldLabel: '风险等级',
        }, {
            xtype: 'combo',
            id: 'rpt-ss-violateregulation-dept',
            bind: {
                store: '{ssViolateRegulationFuncDept}'
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
            id: 'rpt-ss-violateregulation-from',
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
            id: 'rpt-ss-violateregulation-to',
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
        dataIndex: 'violateRegulation.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'violateRegulation.time',
    }, {
        header: '部门',
        dataIndex: 'violateRegulation.dept',
    }, {
        header: '施工队',
        dataIndex: 'violateRegulation.team',
    }, {
        header: '班组',
        dataIndex: 'violateRegulation.groupName',
    }, {
        header: '责任人一卡通',
        dataIndex: 'violateRegulation.personAcc',
    }, {
        header: '责任人',
        dataIndex: 'violateRegulation.personName',
    }, {
        header: '岗位',
        dataIndex: 'violateRegulation.title',
    }, {
        header: '年龄',
        dataIndex: 'violateRegulation.age',
    }, {
        header: '工龄',
        dataIndex: 'violateRegulation.seniority',
    }, {
        header: '性别',
        dataIndex: 'violateRegulation.sex',
    }, {
        header: '工号',
        dataIndex: 'violateRegulation.projNo',
    }, {
        header: '工程名',
        dataIndex: 'violateRegulation.projName',
    }, {
        header: '区域',
        dataIndex: 'violateRegulation.area',
    }, {
        header: '位置',
        dataIndex: 'violateRegulation.position',
    }, {
        header: '负面发现',
        dataIndex: 'violateRegulation.description',
    }, {
        header: '风险等级',
        dataIndex: 'violateRegulation.riskLvl',
    }, {
        header: '违章代码',
        dataIndex: 'violateRegulation.code',
    }, {
        header: '违章内容',
        dataIndex: 'violateRegulation.content',
    }, {
        header: '整改措施',
        dataIndex: 'violateRegulation.measure',
    }, {
        header: '整改情况',
        dataIndex: 'violateRegulation.feedback',
    }, {
        header: '扣款',
        dataIndex: 'violateRegulation.amount',
    }, {
        header: '扣分',
        dataIndex: 'violateRegulation.score',
    }, {
        header: '事业部',
        dataIndex: 'violateRegulation.busiDivision',
    }, {
        header: '总管',
        dataIndex: 'violateRegulation.projMgr',
    }, {
        header: '主管',
        dataIndex: 'violateRegulation.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'violateRegulation.workMgr',
    }, {
        header: '班组长',
        dataIndex: 'violateRegulation.teamLeader',
    }, {
        header: '档长',
        dataIndex: 'violateRegulation.posiMgr',
    }, {
        header: '培训',
        dataIndex: 'violateRegulation.training',
    }, {
        header: '培训效果',
        dataIndex: 'violateRegulation.trainingEff',
    }, {
        text: '附件',
        dataIndex: 'violateRegulation.attachment',
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
        dataIndex: 'violateRegulation.comment',
    }, {
        header: '查处人',
        dataIndex: 'violateRegulation.issuer',
    }, {
        header: '创建人',
        dataIndex: 'violateRegulation.creatorName',
    }, {
        header: '创建部门',
        dataIndex: 'violateRegulation.creatorDept',
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsViolateRegulationStore,
        displayInfo: true,
    }

});