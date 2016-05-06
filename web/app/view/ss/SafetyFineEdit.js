Ext.define('iFlat.view.ss.SafetyFineEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-safetyfineedit',
    title: '安全奖惩',
    layout: 'fit',
    modal: true,

    id: 'ss-safetyfineedit',
    controller: 'ss-safetyfine',
    closeAction: 'hide',
    items: {
        xtype: 'form',
        id: 'ss-safetyfineedit-form',
        margin: 5,
        border: false,
        layout: 'vbox',
        maxHeight: 550,
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
                xtype: 'combo',
                name: 'safetyFine.projNo',
                store: ssSafetyFineEditComboStore = Ext.create('iFlat.store.bi.Project'),
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : true,
                displayField: 'name',
                valueField: 'projNo',
                width: 250,
                fieldLabel: '工程'
            },{
                xtype: 'textfield',
                name: 'safetyFine.position',
                allowBlank: true,
                fieldLabel: '位置',
                width: 250,
            },{
                xtype: 'textfield',
                name: 'safetyFine.place',
                allowBlank: true,
                fieldLabel: '地点',
                width: 250,
            },]
        },{
            items: [{
                xtype: 'datefield',
                name: 'safetyFine.date',
                allowBlank: false,
                fieldLabel: '日期',
                format: 'Y-m-d',
                width: 250
            },{
                xtype: 'combo',
                name: 'safetyFine.type',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '类型',
                bind: {
                    store: '{safetyFineType}'
                }
            },{
                xtype: 'textfield',
                name: 'safetyFine.amount',
                allowBlank: false,
                fieldLabel: '金额',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 250,
            }]
        },{
            items: [{
                xtype: 'combo',
                id: 'ss-safetyfineedit-dept',
                name: 'safetyFine.dept',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 300,
                fieldLabel: '部门',
                bind: {
                    store: '{smDept}'
                },
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },{
                xtype: 'combo',
                id: 'ss-safetyfineedit-team',
                name: 'safetyFine.team',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                displayField: 'teamName',
                valueField: 'teamName',
                width: 450,
                fieldLabel: '施工队',
                store: ssSafetyFineTeamStore = Ext.create('iFlat.store.code.Team'),
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },]
        },{
            items: [{
                xtype: 'combo',
                id: 'ss-safetyfineedit-group',
                name: 'safetyFine.group',
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : true,
                displayField: 'groupName',
                valueField: 'groupName',
                width: 300,
                fieldLabel: '班组',
                store: ssSafetyFineGroupStore = Ext.create('iFlat.store.code.Group'),
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },{
                xtype: 'combo',
                id: 'ss-safetyfineedit-person',
                name: 'safetyFine.personName',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 450,
                fieldLabel: '施工人员',
                store: ssSafetyFineWorkerStore = Ext.create('iFlat.store.code.Worker'),
                listeners: {
                    select: 'onPersonChange',
                }
            },]
        },{
            items: [{
                xtype: 'textarea',
                name: 'safetyFine.description',
                allowBlank: false,
                fieldLabel: '描述',
                height: 100,
                width: 750,
            },]
        },{
            items: [{
                xtype: 'textarea',
                name: 'safetyFine.measure',
                allowBlank: false,
                fieldLabel: '整改措施',
                height: 100,
                width: 750,
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'safetyFine.deadline',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '整改期限',
                bind: {
                    store: '{safetyFineDeadline}'
                },
            },{
                xtype: 'combo',
                name: 'safetyFine.inspectType',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '检查类型',
                bind: {
                    store: '{safetyFineInspectType}'
                },
            },{
                xtype: 'combo',
                name: 'safetyFine.mgrDept',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '事业部',
                bind: {
                    store: '{safetyFineMgrDept}'
                },
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'safetyFine.dangerType',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '隐患类型',
                bind: {
                    store: '{safetyFineDangerType}'
                },
            },{
                xtype: 'combo',
                name: 'safetyFine.damageType',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '伤害类型',
                bind: {
                    store: '{safetyFineDamageType}'
                },
            },{
                xtype: 'combo',
                name: 'safetyFine.riskLevel',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '风险等级',
                bind: {
                    store: '{safetyFineRiskLevel}'
                },
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'safetyFine.manager',
                fieldLabel: '作业长',
                width: 250,
            },{
                xtype: 'textfield',
                name: 'safetyFine.groupLeader',
                fieldLabel: '班组长',
                width: 250,
            },{
                xtype: 'textfield',
                name: 'safetyFine.issuer',
                fieldLabel: '签发人',
                width: 250,
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'safetyFine.comment',
                fieldLabel: '备注',
                width: 750,
            }]
        },{
            items: [{
                //xtype: 'textarea',
                xtype: 'textfield',
                name: 'safetyFine.feedback',
                allowBlank: true,
                fieldLabel: '整改情况',
                //height: 50,
                width: 750,
            },]
        },{
            xtype: 'container',
            layout: 'hbox',
            id: 'ss-safetyfineedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'ss-safetyfineedit-link',
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
            id: 'ss-safetyfineedit-attachment',
            name: 'safetyFine.attachment',
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
                id: 'ss-safetyfineedit-upload',
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
        }, {
            xtype: 'textfield',
            id: 'ss-safetyfineedit-personacc',
            name: 'safetyFine.personAcc',
            fieldLabel: '账号',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'safetyFine.id',
            fieldLabel: 'ID',
            hidden: true
        },]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitSafetyFineEdit',
        }
    ],
});