Ext.define('iFlat.view.report.wip.sr.SrOutsource', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-wip-sr-sroutsource',
    xtype: 'rpt-wip-sr-sroutsource',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    columnLines: true,
    controller: 'rpt-wip-sr-sroutsource',
    store: rptWipSrOutsourceStore = Ext.create('iFlat.store.wip.SrOutsource', {
        autoLoad: false,
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-wip-sr-sroutsource-projno',
            store: rptWipSrOutsourceComboStore = Ext.create('iFlat.store.report.bi.Project', {
                proxy: {
                    extraParams: {
                        'rptProject.type': '修船'
                    }
                }
            }),
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            forceSelection : true,
            displayField: 'name',
            valueField: 'projNo',
            width: 300,
            fieldLabel: '船名',
            labelAlign: 'right',
            labelWidth: 40,
            typeAhead: true,
            anyMatch: true,
            minChars: 0,
        }],
    }, {
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-wip-sr-sroutsource-status',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 250,
            fieldLabel: '状态',
            labelAlign: 'right',
            labelWidth: 40,
            bind: {
                store: '{wipSrOsStatus}'
            }
        }, {
            xtype: 'datefield',
            id: 'rpt-wip-sr-sroutsource-from',
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
            id: 'rpt-wip-sr-sroutsource-to',
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
        text: '申请信息',
        menuDisabled: true,
        columns: [{
            text: '打印申请',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '打印申请',
            align: 'center',
            iconCls: 'x-fa fa-print',
            hidden: true,
            id: 'rpt-wip-sr-sroutsource-printreq',
            /*isDisabled: function () {
                var role = Ext.getCmp('global-panel').getViewModel().get('user')['roleName'];
                return role != '修船外协员' && role != '修船外协科科长' && role != '修船总管' && role != '修船主修';
            },*/
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                var m = record.getData();
                var id = record.get('srOutsource.id');
                if (!Flat.util.isEmpty(id)) {
                    var store = Ext.create('iFlat.store.wip.SrOutsourceDetl');
                    store.getProxy().extraParams['srOutsourceDetl.pid'] = id;
                    store.reload({
                        callback: function(records, option, success) {
                            Print.outsource(m, records);
                        }
                    });
                }

            },
        }, {
            text: '打印审批',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '打印审批',
            align: 'center',
            iconCls: 'x-fa fa-print',
            id: 'rpt-wip-sr-sroutsource-printappr',
            hidden: true,
            /*isDisabled: function () {
                var role = Ext.getCmp('global-panel').getViewModel().get('user')['roleName'];
                return role != '修船外协员' && role != '修船外协科科长';
            },*/
            handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
                var m = record.getData();
                var id = record.get('srOutsource.id');
                if (!Flat.util.isEmpty(id)) {
                    var store = Ext.create('iFlat.store.wip.SrOsBidding');
                    store.getProxy().extraParams['srOsBidding.pid'] = id;
                    store.reload({
                        callback: function(records, option, success) {
                            var bidding = records;
                            var store = Ext.create('iFlat.store.wip.SrOsProcess');
                            store.getProxy().extraParams['srOsProcess.pid'] = id;
                            store.reload({
                                callback: function(recs, option, success) {
                                    var process = recs;
                                    Print.outsourceAppr(m, bidding, process);
                                }
                            });
                        }
                    });
                }
            },
        }, {
            text: '详情',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '详情',
            align: 'center',
            iconCls: 'x-fa fa-info',
            handler: 'showInfo',
            id: 'rpt-wip-sr-sroutsource-info',
            hidden: true
            /*isDisabled: function () {
                var role = Ext.getCmp('global-panel').getViewModel().get('user')['roleName'];
                return role != '修船外协员' && role != '修船外协科科长';
            },*/
        }, {
            text: '批注',
            width: 60,
            menuDisabled: true,
            // hidden: true,
            id: 'rpt-wip-sr-sroutsource-comment',
            xtype: 'actioncolumn',
            tooltip: '批注',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showComment',
        }, {
            text: '比价',
            width: 60,
            menuDisabled: true,
            hidden: true,
            id: 'rpt-wip-sr-sroutsource-biddinginfo',
            xtype: 'actioncolumn',
            tooltip: '比价',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showBidding',
        }, {
            text: '施工过程',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '施工过程',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showProcess',
        }, {
            text: '考核',
            width: 60,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '考核',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showAssess',
        }, {
            header: '状态',
            menuDisabled: true,
            dataIndex: 'srOutsource.status',
        }, {
            header: '工程类型',
            menuDisabled: true,
            dataIndex: 'srOutsource.projType',
        }, {
            header: '工号',
            menuDisabled: true,
            dataIndex: 'srOutsource.projNo',
        }, {
            header: '船名',
            menuDisabled: true,
            dataIndex: 'srOutsource.projName',
        }, {
            header: '项目名称',
            menuDisabled: true,
            dataIndex: 'srOutsource.name',
        }, {
            header: '施工单位',
            menuDisabled: true,
            dataIndex: 'srOutsource.dept',
        }, {
            header: '委外类型',
            menuDisabled: true,
            dataIndex: 'srOutsource.type',
        }, {
            header: '资金来源',
            menuDisabled: true,
            dataIndex: 'srOutsource.capitalSource',
        }, {
            header: '外包性质',
            menuDisabled: true,
            dataIndex: 'srOutsource.matSource',
        }, {
            header: '交货期',
            menuDisabled: true,
            dataIndex: 'srOutsource.tod',
            formatter: 'date("Y-m-d")'
        }, {
            xtype: 'checkcolumn',
            header: '有蓝图',
            menuDisabled: true,
            dataIndex: 'srOutsource.hasBluePrint',
        }, {
            xtype: 'checkcolumn',
            header: '有老样',
            menuDisabled: true,
            dataIndex: 'srOutsource.hasSample',
        }, {
            xtype: 'checkcolumn',
            header: '船方指定',
            menuDisabled: true,
            dataIndex: 'srOutsource.ownerAppoint',
        }, {
            xtype: 'checkcolumn',
            header: '附清单',
            menuDisabled: true,
            dataIndex: 'srOutsource.hasList',
        }, {
            header: '附件',
            menuDisabled: true,
            dataIndex: 'srOutsource.aplAtt',
            renderer: 'renderAtt',
        }, {
            header: '备注',
            menuDisabled: true,
            dataIndex: 'srOutsource.aplComment',
        }]
    }, {
        text: '比价信息',
        hidden: true,
        menuDisabled: true,
        id: 'rpt-wip-sr-sroutsource-biddingdetl',
        columns: [{
            text: '报价明细',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '报价明细',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showBidding',
        }, {
            header: '目标成本',
            menuDisabled: true,
            dataIndex: 'srOutsource.targetCst',
        }, {
            header: '开标编号',
            menuDisabled: true,
            dataIndex: 'srOutsource.bidNo',
        }, {
            header: '竞价方式',
            menuDisabled: true,
            dataIndex: 'srOutsource.bidType',
        }, {
            header: '推荐供方',
            menuDisabled: true,
            dataIndex: 'srOutsource.vendor',
        }, {
            header: '供方性质',
            menuDisabled: true,
            dataIndex: 'srOutsource.vendorType',
        }, {
            header: '是否最低价中标',
            menuDisabled: true,
            dataIndex: 'srOutsource.bidLowest',
            xtype: 'checkcolumn',
        }, {
            header: '附件',
            menuDisabled: true,
            dataIndex: 'srOutsource.bidAtt',
            renderer: 'renderAtt',
        }, {
            header: '备注',
            menuDisabled: true,
            dataIndex: 'srOutsource.bidComment',
        }]
    }, {
        header: '经营代表意见',
        menuDisabled: true,
        dataIndex: 'srOutsource.saleOpinion',
    }, {
        text: '资料',
        menuDisabled: true,
        hidden: true,
        id: 'rpt-wip-sr-sroutsource-cont',
        columns: [{
            header: '附件',
            menuDisabled: true,
            dataIndex: 'srOutsource.contAtt',
            renderer: 'renderAtt',
        }, {
            header: '备注',
            menuDisabled: true,
            dataIndex: 'srOutsource.conComment',
        }]
    }, {
        text: '施工及检验信息',
        menuDisabled: true,
        columns: [{
            text: '施工过程',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '施工过程',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showProcess',
        }, {
            header: '完工时间',
            menuDisabled: true,
            dataIndex: 'srOutsource.finishTime',
            formatter: 'date("Y-m-d")'
        }, {
            xtype: 'checkcolumn',
            header: '超期',
            menuDisabled: true,
            dataIndex: 'srOutsource.overtime',
        }, {
            header: '超期原因',
            menuDisabled: true,
            dataIndex: 'srOutsource.otReason',
        }, {
            header: '超期',
            menuDisabled: true,
            dataIndex: 'srOutsource.overtime',
        }, {
            header: '质检意见',
            menuDisabled: true,
            dataIndex: 'srOutsource.inspComment',
        }, {
            header: '附件',
            menuDisabled: true,
            dataIndex: 'srOutsource.inspAtt',
            renderer: 'renderAtt',
        }]
    }, {
        text: '合同及结算',
        menuDisabled: true,
        hidden: true,
        id: 'rpt-wip-sr-sroutsource-sett',
        columns: [{
            header: '合同编号',
            menuDisabled: true,
            dataIndex: 'srOutsource.contNo',
        }, {
            header: '合同签订日期',
            menuDisabled: true,
            dataIndex: 'srOutsource.contDate',
            formatter: 'date("Y-m-d")'
        }, {
            header: '合同金额',
            menuDisabled: true,
            dataIndex: 'srOutsource.contAmount',
        }, {
            header: '报价金额',
            menuDisabled: true,
            dataIndex: 'srOutsource.settAmountFirst',
        }, {
            header: '结算金额',
            menuDisabled: true,
            dataIndex: 'srOutsource.settAmountSecond',
        }, {
            header: '节约金额',
            menuDisabled: true,
            dataIndex: 'srOutsource.settAmountDiff',
        }, {
            header: '质检意见',
            menuDisabled: true,
            dataIndex: 'srOutsource.settComment',
        }, {
            header: '附件',
            menuDisabled: true,
            dataIndex: 'srOutsource.settAtt',
            renderer: 'renderAtt',
        }]
    }, {
        header: '申请人',
        menuDisabled: true,
        dataIndex: 'srOutsource.creatorName',
    }, {
        header: '单船总管',
        menuDisabled: true,
        dataIndex: 'srOutsource.auditorName',
    }, {
        header: '外协科长',
        menuDisabled: true,
        dataIndex: 'srOutsource.signorName',
    }, {
        header: '外协员',
        menuDisabled: true,
        dataIndex: 'srOutsource.operatorName',
    }, {
        header: '经营代表',
        menuDisabled: true,
        dataIndex: 'srOutsource.saleName',
    }, {
        header: '质检员',
        menuDisabled: true,
        dataIndex: 'srOutsource.qcName',
    }, {
        header: '事业部领导',
        menuDisabled: true,
        dataIndex: 'srOutsource.bdDirectorName',
    }, {
        header: '完成时间',
        menuDisabled: true,
        dataIndex: 'srOutsource.completeTime',
        formatter: 'date("Y-m-d")'
    }],

});