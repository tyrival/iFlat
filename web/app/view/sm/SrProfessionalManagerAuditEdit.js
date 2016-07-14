Ext.define('iFlat.view.sm.SrProfessionalManagerAuditEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-srprofessionalmanagerauditedit',

    title: '修船结算单审批',
    modal: true,

    requires: [
        'iFlat.view.sm.SrProfessionalManagerAuditController',
        'iFlat.view.sm.temp.detail.SrAdjustMain',
        'iFlat.view.sm.temp.detail.SrAdjustMisc',
        'iFlat.view.sm.temp.detail.SrAdjustSys',
    ],

    controller: 'sm-srprofessionalmanageraudit',
    id: 'sm-srprofessionalmanagerauditedit',
    closeAction: 'hide',

    height: '95%',
    layout: 'vbox',
    scrollable: 'y',
    items: [{
        xtype: 'container',
        margin: '0 15 0 15',
        layout: 'vbox',

        items: [{
            xtype: 'form',
            id: 'sm-srprofessionalmanagerauditedit-form',
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
                        name: 'srSettlement.id',
                        id: 'sm-srprofessionalmanagerauditedit-id',
                        fieldLabel: 'ID',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        id: 'sm-srprofessionalmanagerauditedit-projno',
                        name: 'srSettlement.projNo',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        id: 'sm-srprofessionalmanagerauditedit-projname',
                        name: 'srSettlement.projName',
                        width: 350,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '进度%',
                        id: 'sm-srprofessionalmanagerauditedit-progress',
                        name: 'srSettlement.progress',
                        width: 220,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.type',
                        id: 'sm-srprofessionalmanagerauditedit-type',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.status',
                        id: 'sm-srprofessionalmanagerauditedit-status',
                        hidden: true,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.attachment',
                        id: 'sm-srprofessionalmanagerauditedit-attachment',
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
                        id: 'sm-srprofessionalmanagerauditedit-deptname',
                        name: 'srSettlement.deptName',
                        fieldLabel: '部门',
                        width: 230,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        id: 'sm-srprofessionalmanagerauditedit-team',
                        name: 'srSettlement.team',
                        width: 430,
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        id: 'sm-srprofessionalmanagerauditedit-down',
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srSettlement.comment',
                        fieldLabel: '备注',
                        width: 800,
                    }]
                }]
            }]
        }, {
            xtype: 'panel',
            name: 'detail',
            minHeight: 400,
            flex: 1,
            border: false,
            width: 830,
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'sm-detail-sradjustmain'
            }, {
                xtype: 'sm-detail-sradjustmisc'
            }, {
                xtype: 'sm-detail-sradjustsys'
            }, ]
        }, {
            xtype: 'textarea',
            name: 'comment',
            id: 'sm-srprofessionalmanagerauditedit-comment',
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
        id: 'sm-srprofessionalmanagerauditedit-toolbar',
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

    listeners: {
        show: 'changeGridWithType'
    },
});