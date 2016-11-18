Ext.define('iFlat.view.report.ss.FiveS', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-ss-fives',
    xtype: 'rpt-ss-fives',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'rpt-ss-fives',
    store: rptSsFiveSStore = Ext.create('iFlat.store.ss.FiveSList', {
        autoLoad: false,
    }),
    features: [{
        ftype: 'summary',
        dock: 'bottom'
    }],
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-ss-fives-fstype',
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection: true,
            width: 200,
            labelAlign: 'right',
            labelWidth: 60,
            fieldLabel: '违规项目',
            bind: {
                store: '{ssFsCodeType}',
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
            id: 'rpt-ss-fives-belongdept',
            store: rptSsFiveSFsAreaDeptStore = Ext.create('iFlat.store.ss.FsAreaDept'),
            queryMode: 'local',
            allowBlank: true,
            editable: false,
            forceSelection : false,
            displayField: 'dept',
            valueField: 'dept',
            labelWidth: 60,
            width: 200,
            labelAlign: 'right',
            fieldLabel: '所属部门',
            listeners: {
                change: function (cb, newV, oldV, opt) {
                    rptSsFiveSFsAreaStore.getProxy().extraParams['fsArea.dept'] = newV;
                    rptSsFiveSFsAreaStore.reload();
                }
            }
        }, {
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
        }, {
            xtype: 'combo',
            name: 'fiveS.area',
            store: rptSsFiveSFsAreaStore = Ext.create('iFlat.store.ss.FsArea'),
            queryMode: 'local',
            allowBlank: true,
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : false,
            anyMatch: true,
            displayField: 'area',
            valueField: 'area',
            labelWidth: 60,
            width: 220,
            labelAlign: 'right',
            fieldLabel: '区域',
        }, {
            iconCls: 'x-fa fa-close',
            xtype: 'button',
            margin: '0 20 0 -10',
            handler: function (btn) {
                btn.previousSibling().reset();
            }
        }, {
            xtype: 'combo',
            id: 'rpt-ss-fives-dept',
            bind: {
                store: '{ssFiveSFuncDept}'
            },
            queryMode: 'local',
            allowBlank: true,
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
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'textfield',
            id: 'rpt-ss-fives-person',
            width: 160,
            fieldLabel: '责任人',
            labelWidth: 50,
            labelAlign: 'right',
        }, {
            xtype: 'datefield',
            id: 'rpt-ss-fives-from',
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
            id: 'rpt-ss-fives-to',
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
        handler: 'showFiveSInfo',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'fiveS.date',
        formatter: 'date("Y-m-d")',
        menuDisabled: true,
        summaryType: 'count',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '时间',
        dataIndex: 'fiveS.time',
        menuDisabled: true,
        summaryType: 'count',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '职能部门',
        dataIndex: 'fiveS.funcDept',
        menuDisabled: true,
    }, {
        header: '区域类型',
        dataIndex: 'fiveS.areaType',
        menuDisabled: true,
    }, {
        header: '区域代码',
        dataIndex: 'fiveS.code',
        menuDisabled: true,
    }, {
        header: '区域',
        dataIndex: 'fiveS.area',
        menuDisabled: true,
    }, {
        header: '其他区域',
        dataIndex: 'fiveS.otherArea',
        menuDisabled: true,
    }, {
        header: '项目名称',
        dataIndex: 'fiveS.projName',
        menuDisabled: true,
    }, {
        header: '违规部位',
        dataIndex: 'fiveS.region',
        menuDisabled: true,
    }, {
        header: '所属部门',
        dataIndex: 'fiveS.belongDept',
        menuDisabled: true,
    }, {
        header: '区域/项目负责人',
        dataIndex: 'fiveS.regionPersonName',
        menuDisabled: true,
    }, {
        header: '区域/项目负责人一卡通',
        menuDisabled: true,
        dataIndex: 'fiveS.regionPersonAcc',
    }, {
        header: '违规项目',
        menuDisabled: true,
        dataIndex: 'fiveS.fsType',
    }, {
        header: '违规内容',
        dataIndex: 'fiveS.fsDescription',
        menuDisabled: true,
    }, {
        header: '描述',
        dataIndex: 'fiveS.description',
        menuDisabled: true,
    }, {
        text: '违规照片',
        dataIndex: 'fiveS.attachment',
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
        header: '扣分',
        dataIndex: 'fiveS.score',
        summaryType: 'sum',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '罚款',
        dataIndex: 'fiveS.amount',
        summaryType: 'sum',
        summaryRenderer: 'summaryRenderer'
    }, {
        header: '责任部门',
        dataIndex: 'fiveS.dept',
        menuDisabled: true,
    }, {
        header: '施工队/班组',
        dataIndex: 'fiveS.team',
        menuDisabled: true,
    }, {
        header: '责任人',
        dataIndex: 'fiveS.personName',
        menuDisabled: true,
    }, {
        header: '责任人一卡通',
        dataIndex: 'fiveS.personAcc',
        menuDisabled: true,
    }, {
        header: '整改情况',
        dataIndex: 'fiveS.feedback',
        menuDisabled: true,
    }, {
        header: '整改时间',
        dataIndex: 'fiveS.rectifyTime',
        menuDisabled: true,
        formatter: 'date("Y-m-d")'
    }, {
        header: '整改照片',
        dataIndex: 'fiveS.rectifyAtt',
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
        header: '查处人',
        dataIndex: 'fiveS.issuer',
        menuDisabled: true,
        id: 'rpt-ss-fives-issuer',
        hidden: true,
    }, {
        header: '备注',
        dataIndex: 'fiveS.comment',
        menuDisabled: true,
    }, {
        header: '创建人',
        dataIndex: 'fiveS.creatorName',
        menuDisabled: true,
        id: 'rpt-ss-fives-creator',
        hidden: true,
    }, {
        header: '创建部门',
        dataIndex: 'fiveS.creatorDept',
        menuDisabled: true,
    }],
    /*bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsFiveSStore,
        displayInfo: true,
    }*/

});