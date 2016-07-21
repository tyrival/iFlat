Ext.define('iFlat.view.hr.CreditEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.hr-creditedit',
    title: '个人信誉',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.hr.CreditController'
    ],
    
    id: 'hr-creditedit',
    controller: 'hr-credit',
    closeAction: 'hide',
    
    tbar: [{
        xtype: 'form',
        items: [{
            xtype: 'fileuploadfield',
            name: 'upload',
            buttonText: '选择...',
            width: 140,
            margin: '0 0 0 0',
        }, ]
    }, {
        xtype: 'button',
        text: '导入',
        ui: 'orig-blue',
        handler: 'uploadFile'
    }, '->', {
        text: '下载模板',
        handler: 'downloadTemplate'
    }],
    
    items: {
        xtype: 'form',
        id: 'hr-creditedit-form',
        margin: 5,
        border: false,
        layout: 'vbox',
        scrollable: 'y',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60,
        },
        defaults: {
            border: false,
            xtype: 'panel',
            layout: 'hbox',
            margin: '5 10 5 0'
        },
        items: [{
            items: [{
                xtype: 'datefield',
                name: 'credit.date',
                allowBlank: false,
                fieldLabel: '日期',
                format: 'Y-m-d',
                width: 250
            },{
                xtype: 'combo',
                name: 'credit.projNo',
                store: hrCreditEditComboStore = Ext.create('iFlat.store.report.bi.Project'),
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : false,
                anyMatch: true,
                displayField: 'name',
                valueField: 'projNo',
                width: 500,
                fieldLabel: '工程',
                listeners: {
                    change: function(combo, newValue, oldValue, op) {
                        var cbName = combo.nextSibling('textfield[name=credit.projName]');
                        var store = combo.getStore();
                        var rec = store.findRecord('rptProject.projNo', newValue);
                        if (rec) {
                            cbName.setValue(rec.get('rptProject.name'))
                        } else {
                            cbName.setValue('')
                        }
                    }
                }
            },{
                xtype: 'textfield',
                name: 'credit.projName',
                allowBlank: true,
                fieldLabel: '船名',
                hidden: true
            },{
                xtype: 'textfield',
                name: 'credit.id',
                hidden: true
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'credit.type',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 300,
                fieldLabel: '类型',
                bind: {
                    store: '{hrCreditType}',
                },
            },{
                xtype: 'textfield',
                name: 'credit.amount',
                allowBlank: false,
                fieldLabel: '扣款',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 225,
            },{
                xtype: 'textfield',
                name: 'credit.score',
                allowBlank: false,
                fieldLabel: '扣分',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 225,
            }]
        },{
            items: [{
                xtype: 'combo',
                id: 'hr-creditedit-dept',
                name: 'credit.dept',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 300,
                fieldLabel: '部门',
                bind: {
                    store: '{hrDept}'
                },
                listeners: {
                    select: 'onDeptChange',
                }
            }, {
                xtype: 'textfield',
                id: 'hr-creditedit-personacc',
                name: 'credit.personAcc',
                fieldLabel: '账号',
                width: 225,
                editable: false
            }, {
                xtype: 'combo',
                id: 'hr-creditedit-person',
                name: 'credit.personName',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                anyMatch: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 225,
                fieldLabel: '责任人',
                store: hrCreditWorkerStore = Ext.create('iFlat.store.code.Employee', {
                    autoLoad: true,
                }),
                listeners: {
                    select: 'onPersonChange',
                }
            },]
        },{
            items: [{
                xtype: 'textfield',
                id: 'hr-creditedit-team',
                name: 'credit.team',
                width: 450,
                fieldLabel: '科/队',
                editable: false,
            },{
                xtype: 'textfield',
                id: 'hr-creditedit-group',
                name: 'credit.group',
                width: 300,
                fieldLabel: '班组',
                editable: false,
            },]
        },{
            items: [{
                xtype: 'textarea',
                name: 'credit.description',
                allowBlank: false,
                fieldLabel: '描述',
                width: 750,
            },]
        },{
            items: [{
                xtype: 'textarea',
                name: 'credit.feedback',
                allowBlank: false,
                fieldLabel: '处理意见',
                width: 750,
            },]
        },{
            items: [{
                xtype: 'combo',
                id: 'hr-creditedit-manager',
                name: 'credit.manager',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                anyMatch: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 185,
                fieldLabel: '负责人',
                store: hrCreditEmployeeStore = Ext.create('iFlat.store.code.Employee'),
            },{
                xtype: 'textfield',
                name: 'credit.area',
                fieldLabel: '区域',
                width: 185,
            },{
                /*xtype: 'textfield',
                name: 'credit.areaMgr',
                fieldLabel: '区域长',
                width: 185,*/
                
                xtype: 'combo',
                id: 'hr-creditedit-areamgr',
                name: 'credit.areaMgr',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                anyMatch: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 185,
                fieldLabel: '区域长',
                store: hrCreditEmployeeStore,
            },{
                /*xtype: 'textfield',
                name: 'credit.groupMgr',
                fieldLabel: '班长',
                width: 195,*/
                
                xtype: 'combo',
                id: 'hr-creditedit-groupmgr',
                name: 'credit.groupMgr',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                anyMatch: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 195,
                fieldLabel: '班长',
                store: hrCreditEmployeeStore,
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'credit.projMgr',
                fieldLabel: '总管',
                width: 250,
            },{
                xtype: 'textfield',
                name: 'credit.profMgr',
                fieldLabel: '主管',
                width: 250,
            },{
                /*xtype: 'textfield',
                name: 'credit.workMgr',
                fieldLabel: '作业长',
                width: 250,*/

                xtype: 'combo',
                id: 'hr-creditedit-workmgr',
                name: 'credit.workMgr',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                anyMatch: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 250,
                fieldLabel: '作业长',
                store: hrCreditEmployeeStore,
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'credit.comment',
                fieldLabel: '备注',
                width: 750,
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            id: 'hr-creditedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'hr-creditedit-link',
                text: '下载附件',
                margin: '0 5 0 0',
                width: 100,
            }, {
                xtype: 'button',
                ui: 'gray',
                text: '删除',
                handler: 'deleteAttachment'
            }]
        },{
            xtype: 'textfield',
            id: 'hr-creditedit-attachment',
            name: 'credit.attachment',
            fieldLabel: 'attachment',
            width: 750,
            hidden: true,
            listeners: [{
                change: 'onAttachmentChange'
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            margin: '20 0 10 0',
            items: [{
                xtype: 'form',
                id: 'hr-creditedit-upload',
                items: [{
                    xtype: 'fileuploadfield',
                    fieldLabel: '附件',
                    name: 'upload',
                    buttonText: '选择...',
                    width: 300,
                    margin: '0 10 0 0',
                }]
            }, {
                xtype: 'button',
                text: '上传',
                ui: 'orig-blue',
                handler: 'uploadAttachment'
            }]
        }]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitCreditEdit',
        }
    ],
});