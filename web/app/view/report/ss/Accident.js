Ext.define('iFlat.view.report.ss.Accident', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-ss-accident',
    xtype: 'rpt-ss-accident',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'rpt-ss-accident',
    store: rptSsAccidentStore = Ext.create('iFlat.store.ss.AccidentList', {
        autoLoad: false,
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-ss-accident-acclvl',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : false,
            width: 200,
            labelAlign: 'right',
            labelWidth: 60,
            fieldLabel: '事故等级',
            bind: {
                store: '{ssAccLvl}',
            },
        }, {
            xtype: 'combo',
            id: 'rpt-ss-accident-acctype',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : false,
            labelWidth: 60,
            width: 200,
            fieldLabel: '事故类型',
            bind: {
                store: '{ssAccType}',
            },
        }, {
            xtype: 'combo',
            id: 'rpt-ss-accident-dept',
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
            xtype: 'textfield',
            id: 'rpt-ss-accident-person',
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
            xtype: 'datefield',
            id: 'rpt-ss-accident-from',
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
            id: 'rpt-ss-accident-to',
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
        text: '详情',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '详情',
        align: 'center',
        iconCls: 'x-fa fa-info',
        handler: 'showAccidentInfo',
        editor: {
            xtype: 'label',
        },
    }, {
        text: '相关人员',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '相关人员',
        align: 'center',
        iconCls: 'x-fa fa-group',
        handler: 'showAccPartyList',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        menuDisabled: true,
        dataIndex: 'accident.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'accident.time',
        menuDisabled: true,
    }, {
        header: '工号',
        dataIndex: 'accident.projNo',
        menuDisabled: true,
    }, {
        header: '项目名',
        dataIndex: 'accident.projName',
        menuDisabled: true,
    }, {
        header: '区域',
        dataIndex: 'accident.area',
        menuDisabled: true,
    }, {
        header: '位置',
        dataIndex: 'accident.position',
        menuDisabled: true,
    }, {
        header: '事故等级',
        dataIndex: 'accident.accLvl',
        menuDisabled: true,
    }, {
        header: '事故类型',
        dataIndex: 'accident.accType',
        menuDisabled: true,
    }, {
        header: '简要经过',
        dataIndex: 'accident.description',
        menuDisabled: true,
    }, {
        header: '直接经济损失',
        dataIndex: 'accident.loss',
        menuDisabled: true,
    }, {
        header: '事业部',
        dataIndex: 'accident.busiDivision',
        menuDisabled: true,
    }, {
        header: '总管',
        dataIndex: 'accident.projMgr',
        menuDisabled: true,
    }, {
        header: '主管',
        dataIndex: 'accident.profMgr',
        menuDisabled: true,
    }, {
        header: '作业长',
        dataIndex: 'accident.workMgr',
        menuDisabled: true,
    }, {
        header: '班组长',
        dataIndex: 'accident.teamLeader',
        menuDisabled: true,
    }, {
        header: '档长',
        dataIndex: 'accident.posiMgr',
        menuDisabled: true,
    }, {
        text: '事故报告',
        dataIndex: 'accident.rptAtt',
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
        text: '事故照片',
        dataIndex: 'accident.otherAtt',
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
        dataIndex: 'accident.comment',
        menuDisabled: true,
    }, {
        header: '查处人',
        dataIndex: 'accident.issuer',
        menuDisabled: true,
        hidden: true
    }, {
        header: '创建人',
        dataIndex: 'accident.creatorName',
        menuDisabled: true,
        //hidden: true,
    }, {
        header: '创建部门',
        dataIndex: 'accident.creatorDept',
        menuDisabled: true,
        //hidden: true,
    }, ],
    /*bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsAccidentStore,
        displayInfo: true,
    }*/

});