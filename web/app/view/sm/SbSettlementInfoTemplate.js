Ext.define('iFlat.view.sm.SbSettlementInfoTemplate', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-sbsettlementinfotemplate',
    title: '造船结算单审批',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.SbSettlementTemplateController'
    ],

    controller: 'sm-sbsettlementtemplate',
    id: 'sm-sbsettlementinfotemplate',
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
            id: 'sm-sbsettlementinfotemplate-form',
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
                        name: 'sbSettlement.id',
                        id: 'sm-sbsettlementinfotemplate-id',
                        fieldLabel: 'ID',
                        hidden: true,
                        listeners: {
                            change: 'loadDetail'
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'sbSettlement.month',
                        hidden: true,
                        listeners: {
                            change: function (df, newValue, oldValue, eOpts) {
                                Ext.getCmp('sm-sbsettlementinfotemplate-month')
                                    .setValue(Ext.Date.format(new Date(newValue), 'Y-m'));
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '年月',
                        id: 'sm-sbsettlementinfotemplate-month',
                        format: 'Y-m',
                        width: 220,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        id: 'sm-sbsettlementinfotemplate-projno',
                        name: 'sbSettlement.projNo',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        id: 'sm-sbsettlementinfotemplate-projname',
                        name: 'sbSettlement.projName',
                        width: 350,
                    }, {
                        xtype: 'textfield',
                        name: 'sbSettlement.status',
                        id: 'sm-sbsettlementinfotemplate-status',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'sbSettlement.attachment',
                        id: 'sm-sbsettlementinfotemplate-attachment',
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
                        id: 'sm-sbsettlementinfotemplate-deptname',
                        name: 'sbSettlement.deptName',
                        fieldLabel: '部门',
                        width: 220,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        id: 'sm-sbsettlementinfotemplate-team',
                        name: 'sbSettlement.team',
                        width: 430,
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        id: 'sm-sbsettlementinfotemplate-down',
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    type: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textarea',
                        name: 'sbSettlement.comment',
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
                        id: 'sm-sbsettlementinfotemplate-detail',
                        store: smSbSettlementInfoTemplateDetailStore = Ext.create('iFlat.store.sm.SbSettlementDetail'),
                        border: true,
                        columnLines: true,
                        columns: [{
                            header: '类型',
                            dataIndex: 'sbSettlementDetail.account',
                        }, {
                            header: '内容',
                            width: 200,
                            dataIndex: 'sbSettlementDetail.content',
                        }, {
                            header: '金额',
                            dataIndex: 'sbSettlementDetail.amount',
                        }, {
                            header: '单价',
                            dataIndex: 'sbSettlementDetail.price',
                        }, {
                            header: '物量',
                            dataIndex: 'sbSettlementDetail.matQty',
                        }, {
                            header: '规格',
                            dataIndex: 'sbSettlementDetail.spec',
                        }, {
                            header: '单位',
                            dataIndex: 'sbSettlementDetail.unit',
                        }, {
                            header: '附件',
                            dataIndex: 'sbSettlementDetail.attachment',
                            renderer: 'renderAttachment',
                        }, {
                            header: '备注',
                            width: 150,
                            dataIndex: 'sbSettlementDetail.comment',
                        }],
                    }]
                }]
            }]
        }, {
            xtype: 'textarea',
            name: 'comment',
            id: 'sm-sbsettlementinfotemplate-comment',
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
        id: 'sm-sbsettlementinfotemplate-toolbar',
        items: [{
            xtype: 'button',
            text: '通过',
            width: 100,
            handler: 'completeTask',
        }, '->', {
            xtype: 'button',
            ui: 'soft-red',
            text: '退回',
            width: 100,
            handler: 'completeTask',
        }]
    }],

    listeners: {
        close: function () {
            Ext.getCmp('main-view-tabpanel').getActiveTab()
                .down('grid').getStore().reload();
        }
    }
});