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

    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    controller: 'rpt-ss-violateregulation',
    store: rptSsViolateRegulationStore = Ext.create('iFlat.store.ss.ViolateRegulationList', {
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
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
        }, {
            xtype: 'combo',
            id: 'rpt-ss-violateregulation-dept',
            bind: {
                store: '{ssFiveSFuncDept}'
            },
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : false,
            width: 200,
            fieldLabel: '责任部门',
            labelWidth: 60,
        }, {
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-content',
            width: 200,
            fieldLabel: '违章内容',
            labelWidth: 60,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-person',
            width: 200,
            fieldLabel: '责任人',
            labelWidth: 60,
            labelAlign: 'right',
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-profmgr',
            width: 200,
            fieldLabel: '主管',
            labelWidth: 60,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-projmgr',
            width: 200,
            fieldLabel: '总管',
            labelWidth: 60,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-workmgr',
            width: 200,
            fieldLabel: '作业长',
            labelWidth: 60,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-busi',
            width: 200,
            fieldLabel: '事业部',
            labelWidth: 60,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-team',
            width: 200,
            fieldLabel: '施工队',
            labelWidth: 60,
            labelAlign: 'right',
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-projname',
            width: 160,
            fieldLabel: '工程名',
            labelWidth: 50,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-violateregulation-issuer-search',
            width: 160,
            fieldLabel: '查处人',
            labelWidth: 50,
            labelAlign: 'right',
            hidden: true,
        }, {
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
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
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
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
        }, {
            text: '查询',
            ui: 'orig-blue',
            handler: 'search'
        }, {
            text: '重置',
            handler: 'resetFilter'
        }, '->', {
            text: '导出',
            handler: 'exportToExcel'
        }, {
            text: '刷新',
            handler: 'refresh'
        }],
    }],
    columns: [{ xtype: "rownumberer", text: "序号", width:40 },{
        text: '详情',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '详情',
        align: 'center',
        iconCls: 'x-fa fa-info',
        handler: 'showViolateRegulationInfo',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'violateRegulation.date',
        menuDisabled: true,
        formatter: 'date("Y-m-d")',
        summaryType: 'count',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '时间',
        dataIndex: 'violateRegulation.time',
        menuDisabled: true,
        summaryType: 'count',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '部门',
        dataIndex: 'violateRegulation.dept',
        menuDisabled: true,
    }, {
        header: '施工队',
        dataIndex: 'violateRegulation.team',
        menuDisabled: true,
    }, {
        header: '班组',
        dataIndex: 'violateRegulation.groupName',
        menuDisabled: true,
    }, {
        header: '责任人一卡通',
        dataIndex: 'violateRegulation.personAcc',
        menuDisabled: true,
    }, {
        header: '责任人',
        dataIndex: 'violateRegulation.personName',
        menuDisabled: true,
    }, {
        header: '岗位',
        dataIndex: 'violateRegulation.title',
        menuDisabled: true,
    }, {
        header: '年龄',
        dataIndex: 'violateRegulation.age',
        menuDisabled: true,
    }, {
        header: '工龄',
        dataIndex: 'violateRegulation.seniority',
        menuDisabled: true,
    }, {
        header: '性别',
        dataIndex: 'violateRegulation.sex',
        menuDisabled: true,
    }, {
        header: '工号',
        dataIndex: 'violateRegulation.projNo',
        menuDisabled: true,
    }, {
        header: '工程名',
        dataIndex: 'violateRegulation.projName',
        menuDisabled: true,
    }, {
        header: '区域',
        dataIndex: 'violateRegulation.area',
        menuDisabled: true,
    }, {
        header: '位置',
        dataIndex: 'violateRegulation.position',
        menuDisabled: true,
    }, {
        header: '负面发现',
        dataIndex: 'violateRegulation.description',
        menuDisabled: true,
    }, {
        header: '风险等级',
        dataIndex: 'violateRegulation.riskLvl',
        menuDisabled: true,
    }, {
        header: '违章代码',
        dataIndex: 'violateRegulation.code',
        menuDisabled: true,
    }, {
        header: '违章内容',
        dataIndex: 'violateRegulation.content',
        menuDisabled: true,
    }, {
        header: '整改措施',
        dataIndex: 'violateRegulation.measure',
        menuDisabled: true,
    }, {
        header: '整改情况',
        dataIndex: 'violateRegulation.feedback',
        menuDisabled: true,
    }, {
        header: '扣款',
        dataIndex: 'violateRegulation.amount',
        menuDisabled: true,
        id: 'rpt-ss-violateregulation-amount',
        hidden: true,
        summaryType: 'sum',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '扣分',
        dataIndex: 'violateRegulation.score',
        menuDisabled: true,
        summaryType: 'sum',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '事业部',
        dataIndex: 'violateRegulation.busiDivision',
        menuDisabled: true,
    }, {
        header: '总管',
        dataIndex: 'violateRegulation.projMgr',
        menuDisabled: true,
    }, {
        header: '主管',
        dataIndex: 'violateRegulation.profMgr',
        menuDisabled: true,
    }, {
        header: '作业长',
        dataIndex: 'violateRegulation.workMgr',
        menuDisabled: true,
    }, {
        header: '班组长',
        dataIndex: 'violateRegulation.teamLeader',
        menuDisabled: true,
    }, {
        header: '档长',
        dataIndex: 'violateRegulation.posiMgr',
        menuDisabled: true,
    }, {
        header: '培训',
        dataIndex: 'violateRegulation.training',
        menuDisabled: true,
    }, {
        header: '培训效果',
        dataIndex: 'violateRegulation.trainingEff',
        menuDisabled: true,
    }, {
        text: '附件',
        dataIndex: 'violateRegulation.attachment',
        menuDisabled: true,
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
        menuDisabled: true,
    }, {
        header: '查处人',
        dataIndex: 'violateRegulation.issuer',
        menuDisabled: true,
        id: 'rpt-ss-violateregulation-issuer',
        hidden: true,
    }, {
        header: '创建人',
        dataIndex: 'violateRegulation.creatorName',
        menuDisabled: true,
        id: 'rpt-ss-violateregulation-creator',
        hidden: true,
    }, {
        header: '创建部门',
        dataIndex: 'violateRegulation.creatorDept',
        menuDisabled: true,
    }],
    /*bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsViolateRegulationStore,
        displayInfo: true,
    }*/

});