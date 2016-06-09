Ext.define('iFlat.view.sm.temp.ScSettlementApproveBatch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-scsettlementapprovebatch',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'iFlat.view.sm.temp.ScSettlementApproveBatchController',
    ],

    controller: 'sm-scsettlementapprovebatch',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '15 15 0 15',
        maxHeight: 500,
        width: '100%',
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 10 0',
                items: [{
                    xtype: 'textfield',
                    name: 'scSettlement.projNo',
                    fieldLabel: '工号',
                    editable: false,
                    width: 180,
                }, {
                    xtype: 'textfield',
                    name: 'scSettlement.projName',
                    fieldLabel: '船名',
                    editable: false,
                    width: 300,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '部门',
                    name: 'scSettlement.deptName',
                    editable: false,
                    width: 180,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'scSettlement.status',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'ID',
                    name: 'id',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'task.processInstanceId',
                    fieldLabel: 'processInstanceId',
                    listeners: {
                        change: 'loadBusinessObjByTaskId'
                    },
                    hidden: true,
                }, ]
            }, {
                xtype: 'panel',
                border: false,
                width: '100%',
                name: 'detail',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'grid',
                    width: '100%',
                    scrollable: true,
                    border: true,
                    columnLines: true,
                    store: Ext.create('iFlat.store.sm.ScSettlement', {
                        autoLoad: false,
                        proxy: {
                            type: 'ajax',
                            url: 'sm_listScSettlement.action',
                        },
                    }),
                    selModel: {
                        type: 'spreadsheet',
                        columnSelect: true,
                        checkboxSelect: true,
                        pruneRemoved: false,
                        extensible: 'y',
                    },
                    tbar: ['->', {
                        xtype: 'textfield',
                        name: 'summaryAmount',
                        fieldLabel: '合计',
                        labelAlign: 'right',
                        align: 'right',
                        width: 240,
                        editable: false,
                    }, {
                        text: '刷新',
                        handler: 'refresh',
                    }],

                    columns: [{
                        text: '详情',
                        width: 60,
                        menuDisabled: true,
                        xtype: 'actioncolumn',
                        align: 'center',
                        iconCls: 'x-fa fa-file-text-o',
                        handler: 'info',
                        editor: {
                            xtype: 'label',
                        }
                    }, {
                        header: '工号',
                        dataIndex: 'scSettlement.projNo',
                    }, {
                        header: '船名',
                        width: 220,
                        dataIndex: 'scSettlement.projName',
                    }, {
                        header: '工程队',
                        width: 220,
                        dataIndex: 'scSettlement.team',
                    }, {
                        header: '金额',
                        align: 'right',
                        dataIndex: 'scSettlement.amount',
                    }, {
                        header: '附件',
                        align: 'right',
                        width: 80,
                        dataIndex: 'scSettlement.attachment',
                        renderer: 'renderAttachment'
                    }, {
                        header: '管理分',
                        width: 80,
                        dataIndex: 'scSettlement.mgrScore',
                    }, {
                        header: '进度分',
                        width: 80,
                        dataIndex: 'scSettlement.progressScore',
                    }, {
                        header: '质量分',
                        width: 80,
                        dataIndex: 'scSettlement.qualityScore',
                    }, {
                        header: '安全分',
                        width: 80,
                        dataIndex: 'scSettlement.safetyScore',
                    }, {
                        header: '扣款(元)',
                        width: 80,
                        dataIndex: 'scSettlement.fineAmount',
                    }, {
                        header: '备注',
                        width: 150,
                        dataIndex: 'scSettlement.comment',
                        shrinkWrap: 1,
                    }],
                }]
            }, {
                xtype: 'textarea',
                name: 'comment',
                labelAlign: 'top',
                fieldLabel: '审批意见',
                allowBlank: false,
                height: 20,
                width: '100%',
                value: '',
                emptyText: '输入审批意见后，审批通过或退回结算申请'
            }]
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        items: [{
            xtype: 'button',
            text: '历史意见',
            ui: 'gray',
            handler: 'showComment',
        }, '->', {
            xtype: 'button',
            text: '通过',
            width: 100,
            handler: 'completeTask',
        }, {
            xtype: 'button',
            ui: 'soft-red',
            text: '退回',
            width: 100,
            handler: 'completeTask',
        }]
    }],
});