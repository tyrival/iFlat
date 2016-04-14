Ext.define('iFlat.view.sm.SrCommercialCenterSettlement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.sm-srcommercialcentersettlement',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    requires: [
        'iFlat.view.sm.SrCommercialCenterSettlementController',
        'iFlat.view.sm.temp.detail.SrSettlementFirstMain',
        'iFlat.view.sm.temp.detail.SrSettlementFirstMisc',
        'iFlat.view.sm.temp.detail.SrSettlementFirstSys',
    ],

    controller: 'sm-srcommercialcentersettlement',
    id: 'sm-srcommercialcentersettlement',
    closeAction: 'hide',

    items: [{
        xtype: 'container',
        margin: '0 15 0 15',
        maxHeight: 650,
        width: '100%',
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'sm-srcommercialcentersettlement-form',
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
                        name: 'task.processInstanceId',
                        fieldLabel: 'processInstanceId',
                        listeners: {
                            change: 'loadBusinessObjByTaskId'
                        },
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'id',
                        id: 'sm-srcommercialcentersettlement-id',
                        fieldLabel: 'ID',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        id: 'sm-srcommercialcentersettlement-projno',
                        name: 'projNo',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        id: 'sm-srcommercialcentersettlement-projname',
                        name: 'projName',
                        width: 350,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '进度%',
                        id: 'sm-srcommercialcentersettlement-progress',
                        name: 'progress',
                        width: 220,
                    }, {
                        xtype: 'textfield',
                        name: 'type',
                        id: 'sm-srcommercialcentersettlement-type',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'status',
                        id: 'sm-srcommercialcentersettlement-status',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'attachment',
                        id: 'sm-srcommercialcentersettlement-attachment',
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
                        id: 'sm-srcommercialcentersettlement-deptname',
                        name: 'deptName',
                        fieldLabel: '部门',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        id: 'sm-srcommercialcentersettlement-team',
                        name: 'team',
                        width: 430,
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        id: 'sm-srcommercialcentersettlement-down',
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    type: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textarea',
                        name: 'comment',
                        fieldLabel: '备注',
                        width: '100%',
                    }]
                }]
            }]
        }, {
            xtype: 'panel',
            border: false,
            width: '100%',
            name: 'detail',
            height: 250,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
        }, {
            xtype: 'textarea',
            name: 'comment',
            id: 'sm-srcommercialcentersettlement-comment',
            labelAlign: 'top',
            fieldLabel: '审批意见',
            allowBlank: false,
            width: '100%',
            emptyText: '输入审批意见后，审批通过或退回结算申请'
        }],
    }],
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'sm-srcommercialcentersettlement-toolbar',
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