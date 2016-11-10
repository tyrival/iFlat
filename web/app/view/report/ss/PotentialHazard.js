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

    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    controller: 'rpt-ss-potentialhazard',
    store: rptSsPotentialHazardStore = Ext.create('iFlat.store.ss.PotentialHazardList', {
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
            width: 180,
            labelAlign: 'right',
            labelWidth: 60,
            fieldLabel: '风险等级',
            bind: {
                store: '{ssPhRiskLvl}',
            },
        }, {
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
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
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
        }, {
            xtype: 'combo',
            id: 'rpt-ss-potentialhazard-dept',
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
            id: 'rpt-ss-potentialhazard-content',
            width: 200,
            fieldLabel: '隐患内容',
            labelWidth: 60,
            labelAlign: 'right',
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-person',
            width: 160,
            fieldLabel: '责任人',
            labelWidth: 50,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-profmgr',
            width: 160,
            fieldLabel: '主管',
            labelWidth: 40,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-projmgr',
            width: 160,
            fieldLabel: '总管',
            labelWidth: 40,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-workmgr',
            width: 160,
            fieldLabel: '作业长',
            labelWidth: 50,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-busi',
            width: 160,
            fieldLabel: '事业部',
            labelWidth: 50,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-team',
            width: 160,
            fieldLabel: '施工队',
            labelWidth: 50,
            labelAlign: 'right',
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-projname',
            width: 160,
            fieldLabel: '工程名',
            labelWidth: 50,
            labelAlign: 'right',
        }, {
            xtype: 'textfield',
            id: 'rpt-ss-potentialhazard-issuer-search',
            width: 160,
            fieldLabel: '查处人',
            labelWidth: 60,
            labelAlign: 'right',
            hidden: true,
        }, {
            xtype: 'datefield',
            id: 'rpt-ss-potentialhazard-from',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 180,
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
            id: 'rpt-ss-potentialhazard-to',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 180,
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
        handler: 'showPotentialHazardInfo',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'potentialHazard.date',
        menuDisabled: true,
        formatter: 'date("Y-m-d")',
        summaryType: 'count',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '时间',
        dataIndex: 'potentialHazard.time',
        menuDisabled: true,
        summaryType: 'count',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '部门',
        dataIndex: 'potentialHazard.dept',
        menuDisabled: true,
    }, {
        header: '施工队',
        dataIndex: 'potentialHazard.team',
        menuDisabled: true,
    }, {
        header: '班组',
        dataIndex: 'potentialHazard.groupName',
        menuDisabled: true,
    }, {
        header: '责任人一卡通',
        dataIndex: 'potentialHazard.personAcc',
        menuDisabled: true,
    }, {
        header: '责任人',
        dataIndex: 'potentialHazard.personName',
        menuDisabled: true,
    }, {
        header: '岗位',
        dataIndex: 'potentialHazard.title',
        menuDisabled: true,
    }, {
        header: '年龄',
        dataIndex: 'potentialHazard.age',
        menuDisabled: true,
    }, {
        header: '工龄',
        dataIndex: 'potentialHazard.seniority',
        menuDisabled: true,
    }, {
        header: '性别',
        dataIndex: 'potentialHazard.sex',
        menuDisabled: true,
    }, {
        header: '工号',
        dataIndex: 'potentialHazard.projNo',
        menuDisabled: true,
    }, {
        header: '工程名',
        dataIndex: 'potentialHazard.projName',
        menuDisabled: true,
    }, {
        header: '区域',
        dataIndex: 'potentialHazard.area',
        menuDisabled: true,
    }, {
        header: '位置',
        dataIndex: 'potentialHazard.position',
        menuDisabled: true,
    }, {
        header: '负面发现',
        dataIndex: 'potentialHazard.description',
        menuDisabled: true,
    }, {
        header: '隐患类型',
        dataIndex: 'potentialHazard.phType',
        menuDisabled: true,
    }, {
        header: '隐患代码',
        dataIndex: 'potentialHazard.phCode',
        menuDisabled: true,
    }, {
        header: '隐患内容',
        dataIndex: 'potentialHazard.content',
        menuDisabled: true,
    }, {
        header: '隐患明细',
        dataIndex: 'potentialHazard.detail',
        menuDisabled: true,
    }, {
        header: '风险等级',
        dataIndex: 'potentialHazard.riskLvl',
        menuDisabled: true,
    }, {
        header: '伤害类型',
        dataIndex: 'potentialHazard.dmgType',
        menuDisabled: true,
    }, {
        header: '整改措施',
        dataIndex: 'potentialHazard.measure',
        menuDisabled: true,
    }, {
        header: '整改期限',
        dataIndex: 'potentialHazard.deadline',
        menuDisabled: true,
    }, {
        header: '整改情况',
        dataIndex: 'potentialHazard.feedback',
        menuDisabled: true,
    }, {
        header: '扣款',
        dataIndex: 'potentialHazard.amount',
        menuDisabled: true,
        id: 'rpt-ss-potentialhazard-amount',
        hidden: true,
        summaryType: 'sum',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '扣分',
        menuDisabled: true,
        dataIndex: 'potentialHazard.score',
        summaryType: 'sum',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '事业部',
        menuDisabled: true,
        dataIndex: 'potentialHazard.busiDivision',
    }, {
        header: '总管',
        dataIndex: 'potentialHazard.projMgr',
        menuDisabled: true,
    }, {
        header: '主管',
        dataIndex: 'potentialHazard.profMgr',
        menuDisabled: true,
    }, {
        header: '作业长',
        dataIndex: 'potentialHazard.workMgr',
        menuDisabled: true,
    }, {
        header: '班组长',
        dataIndex: 'potentialHazard.teamLeader',
        menuDisabled: true,
    }, {
        header: '档长',
        dataIndex: 'potentialHazard.posiMgr',
        menuDisabled: true,
    }, {
        text: '违规照片',
        dataIndex: 'potentialHazard.attachment',
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
        text: '整改后照片',
        dataIndex: 'potentialHazard.rectifyAtt',
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
        dataIndex: 'potentialHazard.comment',
        menuDisabled: true,
    }, {
        header: '查处人',
        dataIndex: 'potentialHazard.issuer',
        menuDisabled: true,
        id: 'rpt-ss-potentialhazard-issuer',
    }, {
        header: '创建人',
        dataIndex: 'potentialHazard.creatorName',
        menuDisabled: true,
        id: 'rpt-ss-potentialhazard-creator',
        hidden: true,
    }, {
        header: '创建部门',
        dataIndex: 'potentialHazard.creatorDept',
        menuDisabled: true,
        hidden: true,
    }, ],
    /*bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsPotentialHazardStore,
        displayInfo: true,
    }*/

});