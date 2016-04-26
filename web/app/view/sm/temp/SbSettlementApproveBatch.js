Ext.define('iFlat.view.sm.temp.SbSettlementApproveBatch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-sbsettlementapprovebatch',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'iFlat.view.sm.temp.SbSettlementApproveBatchController',
    ],

    scrollable: 'true',
    maxHeight: 700,
    controller: 'sm-sbsettlementapprovebatch',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '15 15 0 15',
        maxHeight: 700,
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
                    name: 'sbSettlement.projNo',
                    fieldLabel: '工号',
                    editable: false,
                    width: 180,
                }, {
                    xtype: 'textfield',
                    name: 'sbSettlement.projName',
                    fieldLabel: '船名',
                    editable: false,
                    width: 300,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '部门',
                    name: 'sbSettlement.deptName',
                    editable: false,
                    width: 180,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'sbSettlement.status',
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
                height: 450,
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
                    store: Ext.create('iFlat.store.sm.SbSettlement', {
                        proxy: {
                            type: 'ajax',
                            url: 'sm_listSbSettlement.action',
                        },
                    }),

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
                        dataIndex: 'sbSettlement.projNo',
                    }, {
                        header: '船名',
                        width: 220,
                        dataIndex: 'sbSettlement.projName',
                    }, {
                        header: '工程队',
                        width: 220,
                        dataIndex: 'sbSettlement.team',
                    }, {
                        header: '金额',
                        align: 'right',
                        dataIndex: 'sbSettlement.amount',
                    }, {
                        header: '附件',
                        align: 'right',
                        width: 80,
                        dataIndex: 'sbSettlement.attachment',
                        renderer: 'renderAttachment'
                    }, {
                        header: '备注',
                        width: 150,
                        dataIndex: 'sbSettlement.comment',
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