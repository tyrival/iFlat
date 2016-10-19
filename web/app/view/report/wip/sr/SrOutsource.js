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
        columns: [{
            text: '打印申请',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '打印申请',
            align: 'center',
            iconCls: 'x-fa fa-print',
            isDisabled: function () {
                var role = Ext.getCmp('global-panel').getViewModel().get('user')['roleName'];
                return role != '修船外协员' && role != '修船外协科科长';
            },
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
            isDisabled: function () {
                var role = Ext.getCmp('global-panel').getViewModel().get('user')['roleName'];
                return role != '修船外协员' && role != '修船外协科科长';
            },
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
            text: '施工内容',
            width: 80,
            menuDisabled: true,
            xtype: 'actioncolumn',
            tooltip: '施工内容',
            align: 'center',
            iconCls: 'x-fa fa-tags',
            handler: 'showDetail',
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
            header: '工程类型',
            dataIndex: 'srOutsource.projType',
        }, {
            header: '工号',
            dataIndex: 'srOutsource.projNo',
        }, {
            header: '船名',
            dataIndex: 'srOutsource.projName',
        }, {
            header: '项目名称',
            dataIndex: 'srOutsource.name',
        }, {
            header: '施工单位',
            dataIndex: 'srOutsource.dept',
        }, {
            header: '委外类型',
            dataIndex: 'srOutsource.type',
        }, {
            header: '资金来源',
            dataIndex: 'srOutsource.capitalSource',
        }, {
            header: '外包性质',
            dataIndex: 'srOutsource.matSource',
        }, {
            header: '交货期',
            dataIndex: 'srOutsource.tod',
            formatter: 'date("Y-m-d")'
        }, {
            xtype: 'checkcolumn',
            header: '有蓝图',
            dataIndex: 'srOutsource.hasBluePrint',
        }, {
            xtype: 'checkcolumn',
            header: '有老样',
            dataIndex: 'srOutsource.hasSample',
        }, {
            xtype: 'checkcolumn',
            header: '船方指定',
            dataIndex: 'srOutsource.ownerAppoint',
        }, {
            header: '附件',
            dataIndex: 'srOutsource.aplAtt',
            renderer: 'renderAtt',
        }, {
            header: '备注',
            dataIndex: 'srOutsource.aplComment',
        }]
    }, {
        text: '比价信息',
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
            dataIndex: 'srOutsource.targetCst',
        }, {
            header: '开标编号',
            dataIndex: 'srOutsource.bidNo',
        }, {
            header: '竞价方式',
            dataIndex: 'srOutsource.bidType',
        }, {
            header: '推荐供方',
            dataIndex: 'srOutsource.vendor',
        }, {
            header: '供方性质',
            dataIndex: 'srOutsource.vendorType',
        }, {
            header: '是否最低价中标',
            dataIndex: 'srOutsource.bidLowest',
            xtype: 'checkcolumn',
        }, {
            header: '附件',
            dataIndex: 'srOutsource.bidAtt',
            renderer: 'renderAtt',
        }, {
            header: '备注',
            dataIndex: 'srOutsource.bidComment',
        }]
    }, {
        header: '经营代表意见',
        dataIndex: 'srOutsource.saleOpinion',
    }, {
        text: '资料',
        columns: [{
            header: '附件',
            dataIndex: 'srOutsource.contAtt',
            renderer: 'renderAtt',
        }, {
            header: '备注',
            dataIndex: 'srOutsource.conComment',
        }]
    }, {
        text: '施工及检验信息',
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
            dataIndex: 'srOutsource.finishTime',
            formatter: 'date("Y-m-d")'
        }, {
            xtype: 'checkcolumn',
            header: '超期',
            dataIndex: 'srOutsource.overtime',
        }, {
            header: '超期原因',
            dataIndex: 'srOutsource.otReason',
        }, {
            header: '超期',
            dataIndex: 'srOutsource.overtime',
        }, {
            header: '质检意见',
            dataIndex: 'srOutsource.inspComment',
        }, {
            header: '附件',
            dataIndex: 'srOutsource.inspAtt',
            renderer: 'renderAtt',
        }]
    }, {
        text: '合同及结算',
        columns: [{
            header: '合同编号',
            dataIndex: 'srOutsource.contNo',
        }, {
            header: '合同签订日期',
            dataIndex: 'srOutsource.contDate',
            formatter: 'date("Y-m-d")'
        }, {
            header: '合同金额',
            dataIndex: 'srOutsource.contAmount',
        }, {
            header: '报价金额',
            dataIndex: 'srOutsource.settAmountFirst',
        }, {
            header: '结算金额',
            dataIndex: 'srOutsource.settAmountSecond',
        }, {
            header: '节约金额',
            dataIndex: 'srOutsource.settAmountDiff',
        }, {
            header: '质检意见',
            dataIndex: 'srOutsource.settComment',
        }, {
            header: '附件',
            dataIndex: 'srOutsource.settAtt',
            renderer: 'renderAtt',
        }]
    }, {
        header: '申请人',
        dataIndex: 'srOutsource.creatorName',
    }, {
        header: '单船总管',
        dataIndex: 'srOutsource.auditorName',
    }, {
        header: '外协科长',
        dataIndex: 'srOutsource.signorName',
    }, {
        header: '外协员',
        dataIndex: 'srOutsource.operatorName',
    }, {
        header: '经营代表',
        dataIndex: 'srOutsource.saleName',
    }, {
        header: '质检员',
        dataIndex: 'srOutsource.qcName',
    }, {
        header: '事业部领导',
        dataIndex: 'srOutsource.bdDirectorName',
    }, {
        header: '完成时间',
        dataIndex: 'srOutsource.completeTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '状态',
        dataIndex: 'srOutsource.status',
    }],

});