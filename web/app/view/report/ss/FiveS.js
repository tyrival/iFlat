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
    store: rptSsFiveSStore = Ext.create('iFlat.store.ss.FiveSList'),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-ss-fives-fstype',
            queryMode: 'local',
            allowBlank: false,
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
            xtype: 'combo',
            id: 'rpt-ss-fives-belongdept',
            store: rptSsFiveSFsAreaDeptStore = Ext.create('iFlat.store.ss.FsAreaDept'),
            queryMode: 'local',
            allowBlank: false,
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
            xtype: 'combo',
            id: 'rpt-ss-fives-dept',
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
        }, ],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
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
        dataIndex: 'fiveS.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'fiveS.time',
    }, {
        header: '职能部门',
        dataIndex: 'fiveS.funcDept',
    }, {
        header: '区域类型',
        dataIndex: 'fiveS.areaType',
    }, {
        header: '区域代码',
        dataIndex: 'fiveS.code',
    }, {
        header: '区域',
        dataIndex: 'fiveS.area',
    }, {
        header: '其他区域',
        dataIndex: 'fiveS.otherArea',
    }, {
        header: '项目名称',
        dataIndex: 'fiveS.projName',
    }, {
        header: '违规部位',
        dataIndex: 'fiveS.region',
    }, {
        header: '所属部门',
        dataIndex: 'fiveS.belongDept',
    }, {
        header: '区域/项目负责人',
        dataIndex: 'fiveS.regionPersonName',
    }, {
        header: '区域/项目负责人一卡通',
        dataIndex: 'fiveS.regionPersonAcc',
    }, {
        header: '违规项目',
        dataIndex: 'fiveS.fsType',
    }, {
        header: '违规内容',
        dataIndex: 'fiveS.fsDescription',
    }, {
        text: '违规照片',
        dataIndex: 'fiveS.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' ssef='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '责任部门',
        dataIndex: 'fiveS.dept',
    }, {
        header: '施工队/班组',
        dataIndex: 'fiveS.team',
    }, {
        header: '责任人',
        dataIndex: 'fiveS.personName',
    }, {
        header: '责任人一卡通',
        dataIndex: 'fiveS.personAcc',
    }, {
        header: '整改情况',
        dataIndex: 'fiveS.feedback',
    }, {
        header: '整改时间',
        dataIndex: 'fiveS.rectifyTime',
    }, {
        header: '整改照片',
        dataIndex: 'fiveS.rectifyAtt',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' ssef='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '备注',
        dataIndex: 'fiveS.comment',
    }, {
        header: '创建人',
        dataIndex: 'fiveS.creatorName',
        hidden: true
    }, {
        header: '创建部门',
        dataIndex: 'fiveS.creatorDept',
        hidden: true
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: rptSsFiveSStore,
        displayInfo: true,
    }

});