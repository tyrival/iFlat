Ext.define('iFlat.view.sm.temp.SrSettlementApproveInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-srsettlementapproveinfo',
    title: '修船结算单审批',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.SrSettlementApproveController',
        'iFlat.view.sm.temp.detail.SrApproveMain',
        'iFlat.view.sm.temp.detail.SrApproveMisc',
        'iFlat.view.sm.temp.detail.SrApproveSys',
    ],

    x: 100,
    y: 20,
    controller: 'sm-srsettlementapprove',
    id: 'sm-srsettlementapproveinfo',
    closeAction: 'hide',
    height: '95%',
    items: [{
        xtype: 'container',
        margin: '0 0 0 15',
        layout: 'vbox',
        scrollable: 'y',
        width: 850,
        items: [{
            xtype: 'form',
            id: 'sm-srsettlementapproveinfo-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
                //disabled: true
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
                        id: 'sm-srsettlementapproveinfo-id',
                        fieldLabel: 'ID',
                        hidden: true,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '工号',
                        id: 'sm-srsettlementapproveinfo-projno',
                        name: 'srSettlement.projNo',
                        width: 230,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '船名',
                        id: 'sm-srsettlementapproveinfo-projname',
                        name: 'srSettlement.projName',
                        width: 350,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '进度%',
                        id: 'sm-srsettlementapproveinfo-progress',
                        name: 'srSettlement.progress',
                        width: 220,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.type',
                        id: 'sm-srsettlementapproveinfo-type',
                        hidden: true,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.status',
                        id: 'sm-srsettlementapproveinfo-status',
                        hidden: true,
                        editable: false,
                        listeners: {
                            change:  function(field, newValue, oldValue, eOpts) {
                                var win = field.up('window');
                                var container = win.down('container[name=srSettlement.amount]');
                                var hidden = false;
                                if (newValue == '修船主修审核'
                                    || newValue == '修船总管审核'
                                    || newValue == '修船事业部部长审批'
                                    || newValue == '修船一级结算') {

                                    hidden = true;
                                }
                                container.setHidden(hidden);
                                var edit = false;
                                if (newValue == '修船总管审核') {
                                    edit = true;
                                }
                                win.down('textfield[name=srSettlement.progressScore]').setEditable(edit);
                                win.down('textfield[name=srSettlement.mgrScore]').setEditable(edit);
                                win.down('textfield[name=srSettlement.qualityScore]').setEditable(edit);
                                win.down('textfield[name=srSettlement.safetyScore]').setEditable(edit);
                            },
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.attachment',
                        id: 'sm-srsettlementapproveinfo-attachment',
                        hidden: true,
                        editable: false,
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
                        id: 'sm-srsettlementapproveinfo-deptname',
                        name: 'srSettlement.deptName',
                        fieldLabel: '部门',
                        width: 230,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '施工队',
                        id: 'sm-srsettlementapproveinfo-team',
                        name: 'srSettlement.team',
                        width: 430,
                        editable: false,
                    }, {
                        xtype: 'button',
                        text: '下载附件',
                        margin: '0 0 0 50',
                        hidden: true,
                        id: 'sm-srsettlementapproveinfo-down',
                        width: 100,
                    }, ]
                }, {
                    xtype: 'container',
                    type: 'hbox',
                    margin: '10 0 0 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srSettlement.comment',
                        fieldLabel: '备注',
                        width: 800,
                        editable: false,
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 10 0',
                    name: 'srSettlement.amount',
                    items: [{
                        xtype: 'textfield',
                        name: 'srSettlement.summaryAmount',
                        fieldLabel: '合计',
                        width: 170,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        name: 'srSettlement.laborAmount',
                        fieldLabel: '工费',
                        width: 150,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '易耗品补贴',
                        name: 'srSettlement.consumableAmount',
                        labelWidth: 80,
                        width: 180,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '绩效',
                        name: 'srSettlement.performanceAmount',
                        width: 150,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '材料费',
                        name: 'srSettlement.materialAmount',
                        width: 150,
                        editable: false,
                    }]
                }, {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 10 0',
                    items: [{
                        xtype: 'textfield',
                        name: 'srSettlement.progressScore',
                        fieldLabel: '进度分',
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        width: 180,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '管理分',
                        name: 'srSettlement.mgrScore',
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        labelWidth: 80,
                        width: 180,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '质量分',
                        name: 'srSettlement.qualityScore',
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        width: 180,
                        editable: false,
                    }, {
                        xtype: 'textfield',
                        fieldLabel: '安全分',
                        name: 'srSettlement.safetyScore',
                        regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                        width: 180,
                        editable: false,
                    }]
                }, {
                    xtype: 'panel',
                    height: 200,
                    border: false,
                    name: 'detail',
                    margin: '15 0 5 0',
                    layout: {
                        type: 'hbox',
                        align: 'stretch'
                    },
                    items: [{
                        xtype: 'sm-detail-srapprovemain',
                    }, {
                        xtype: 'sm-detail-srapprovemisc',
                    }, {
                        xtype: 'sm-detail-srapprovesys',
                    }, ],
                }]
            }]
        }, {
            xtype: 'textarea',
            name: 'comment',
            id: 'sm-srsettlementapproveinfo-comment',
            labelAlign: 'top',
            fieldLabel: '审批意见',
            allowBlank: false,
            width: 830,
            value: '',
            emptyText: '输入审批意见后，审批通过或退回结算申请'
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'sm-srsettlementapproveinfo-toolbar',
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