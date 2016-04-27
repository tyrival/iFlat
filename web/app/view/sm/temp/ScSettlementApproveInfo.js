Ext.define('iFlat.view.sm.temp.ScSettlementApproveInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-scsettlementapproveinfo',
    title: '造船结算单审批',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.ScSettlementApproveController'
    ],

    controller: 'sm-scsettlementapprove',
    id: 'sm-scsettlementapproveinfo',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '0 15 0 15',
        maxHeight: 650,
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'sm-scsettlementapproveinfo-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
                disabled: true
            },
            items: [{
                xtype: 'fieldset',
                title: '结算单',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    items: [{
                        xtype: 'textfield',
                        name: 'scSettlement.id',
                        id: 'sm-scsettlementapproveinfo-id',
                        fieldLabel: 'ID',
                        hidden: true,
                        listeners: {
                            change: 'loadDetail'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'scSettlement.month',
                        hidden: true,
                        listeners: {
                            change: function (df, newValue, oldValue, eOpts) {
                                Ext.getCmp('sm-scsettlementapproveinfo-month')
                                    .setValue(Ext.Date.format(new Date(newValue), 'Y-m'));
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '年月',
                        id: 'sm-scsettlementapproveinfo-month',
                        format: 'Y-m',
                        width: 220,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        id: 'sm-scsettlementapproveinfo-projno',
                        name: 'scSettlement.projNo',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        id: 'sm-scsettlementapproveinfo-projname',
                        name: 'scSettlement.projName',
                        width: 350,
                    }, {
                        xtype: 'textfield',
                        name: 'scSettlement.status',
                        id: 'sm-scsettlementapproveinfo-status',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'scSettlement.attachment',
                        id: 'sm-scsettlementapproveinfo-attachment',
                        hidden: true,
                        listeners: {
                            change: 'onAttachmentChange'
                        },
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        id: 'sm-scsettlementapproveinfo-deptname',
                        name: 'scSettlement.deptName',
                        fieldLabel: '部门',
                        width: 220,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        id: 'sm-scsettlementapproveinfo-team',
                        name: 'scSettlement.team',
                        width: 430,
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        id: 'sm-scsettlementapproveinfo-down',
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    type: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textarea',
                        name: 'scSettlement.comment',
                        fieldLabel: '备注',
                        width: 800,
                    }]
                }, {
                    xtype: 'panel',
                    height: 200,
                    border: false,
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'gridpanel',
                        width: 800,
                        scrollable: true,
                        id: 'sm-scsettlementapproveinfo-detail',
                        store: smScSettlementApproveInfoDetailStore = Ext.create('iFlat.store.sm.ScSettlementDetail'),
                        border: true,
                        columnLines: true,
                        columns: [{
                            header: '成本科目',
                            width: 200,
                            dataIndex: 'scSettlementDetail.account',
                        }, {
                            header: '内容',
                            width: 200,
                            dataIndex: 'scSettlementDetail.content',
                            shrinkWrap: 1,
                        }, {
                            header: '金额',
                            dataIndex: 'scSettlementDetail.amount',
                        }, {
                            header: '单价',
                            dataIndex: 'scSettlementDetail.price',
                        }, {
                            header: '物量',
                            dataIndex: 'scSettlementDetail.matQty',
                        }, {
                            header: '规格',
                            dataIndex: 'scSettlementDetail.spec',
                        }, {
                            header: '单位',
                            dataIndex: 'scSettlementDetail.unit',
                        }, {
                            header: '附件',
                            dataIndex: 'scSettlementDetail.attachment',
                            renderer: 'renderAttachment',
                            hidden: true,
                        }, {
                            header: '备注',
                            width: 150,
                            dataIndex: 'scSettlementDetail.comment',
                            shrinkWrap: 1,
                        }],
                    }]
                }]
            }]
        }, {
            xtype: 'textarea',
            name: 'comment',
            id: 'sm-scsettlementapproveinfo-comment',
            labelAlign: 'top',
            fieldLabel: '审批意见',
            allowBlank: false,
            width: 830,
            emptyText: '输入审批意见后，审批通过或退回结算申请'
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'sm-scsettlementapproveinfo-toolbar',
        items: [{
            xtype: 'button',
            text: '历史意见',
            ui: 'gray',
            handler: 'comment',
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