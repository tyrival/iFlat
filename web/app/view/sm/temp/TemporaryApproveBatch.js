Ext.define('iFlat.view.sm.temp.TemporaryApproveBatch', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-temporaryapprovebatch',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'iFlat.view.sm.temp.TemporaryApproveBatchController',
    ],

    scrollable: 'true',
    maxHeight: 500,
    controller: 'sm-temporaryapprovebatch',
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
                    fieldLabel: '部门',
                    name: 'temporary.deptName',
                    editable: false,
                    width: 180,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '状态',
                    name: 'temporary.status',
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
                    store: Ext.create('iFlat.store.sm.Temporary', {
                        proxy: {
                            type: 'ajax',
                            url: 'sm_listTemporary.action',
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
                        name: 'amount',
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
                        header: '月份',
                        dataIndex: 'temporary.month',
                    }, {
                        header: '部门',
                        width: 220,
                        dataIndex: 'temporary.dept',
                    }, {
                        header: '金额',
                        align: 'right',
                        dataIndex: 'temporary.amount',
                    }, {
                        header: '附件',
                        align: 'right',
                        width: 80,
                        dataIndex: 'temporary.attachment',
                        renderer: 'renderAttachment'
                    }, {
                        header: '备注',
                        width: 150,
                        dataIndex: 'temporary.comment',
                        cellWrap: true,
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