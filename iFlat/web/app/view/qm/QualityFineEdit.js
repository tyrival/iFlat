Ext.define('iFlat.view.qm.QualityFineEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.qm-qualityfineedit',
    title: '质量奖惩',
    layout: 'fit',
    modal: true,

    id: 'qm-qualityfineedit',
    controller: 'qm-qualityfine',
    closeAction: 'hide',

    items: [{
        xtype: 'form',
        id: 'qm-qualityfineedit-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60,
        },
        defaults: {
            border: false,
            xtype: 'panel',
            layout: 'hbox',
            flex: 1,
            margin: '5 10 5 0'
        },
        layout: 'vbox',
        items: [{
            items: [{
                xtype: 'datefield',
                name: 'qualityFine.date',
                allowBlank: false,
                fieldLabel: '日期',
                format: 'Y-m-d',
                width: 250
            },{
                xtype: 'combo',
                name: 'qualityFine.projNo',
                store: qmQualityFineEditComboStore = Ext.create('iFlat.store.bi.Project'),
                queryMode: 'local',
                allowBlank: false,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : true,
                displayField: 'name',
                valueField: 'projNo',
                width: 250,
                fieldLabel: '工程'
            },{
                xtype: 'combo',
                name: 'qualityFine.profession',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '专业',
                bind: {
                    store: '{qualityFineProfession}'
                }
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'qualityFine.category',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 250,
                fieldLabel: '性质',
                bind: {
                    store: '{qualityFineCategory}'
                }
            },{
                xtype: 'textfield',
                name: 'qualityFine.amount',
                allowBlank: false,
                fieldLabel: '金额',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 250,
            },{
                xtype: 'textfield',
                name: 'qualityFine.qc',
                allowBlank: false,
                fieldLabel: '考核人',
                width: 250,
            },]
        },{
            items: [{
                xtype: 'textarea',
                name: 'qualityFine.description',
                allowBlank: false,
                fieldLabel: '描述',
                height: 100,
                width: 750,
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'qualityFine.comment',
                fieldLabel: '备注',
                width: 750,
            }]
        },{
            items: [{
                xtype: 'combo',
                id: 'qm-qualityfineedit-dept',
                name: 'qualityFine.dept',
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
                id: 'qm-qualityfineedit-team',
                name: 'qualityFine.team',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                displayField: 'teamName',
                valueField: 'teamName',
                width: 450,
                fieldLabel: '施工队',
                store: qmQualityFineTeamStore = Ext.create('iFlat.store.code.Team'),
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },]
        },{
            items: [{
                xtype: 'combo',
                id: 'qm-qualityfineedit-group',
                name: 'qualityFine.group',
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : true,
                displayField: 'groupName',
                valueField: 'groupName',
                width: 300,
                fieldLabel: '班组',
                store: qmQualityFineGroupStore = Ext.create('iFlat.store.code.Group'),
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },{
                xtype: 'combo',
                id: 'qm-qualityfineedit-person',
                name: 'qualityFine.personName',
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
                store: qmQualityFineWorkerStore = Ext.create('iFlat.store.code.Worker'),
                listeners: {
                    select: 'onPersonChange',
                }
            },]
        }, {
            xtype: 'container',
            layout: 'hbox',
            id: 'qm-qualityfineedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'qm-qualityfineedit-link',
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
            id: 'qm-qualityfineedit-attachment',
            name: 'qualityFine.attachment',
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
                id: 'qm-qualityfineedit-upload',
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
            id: 'qm-qualityfineedit-personacc',
            name: 'qualityFine.personAcc',
            fieldLabel: '账号',
            hidden: true
        },{
            xtype: 'textfield',
            name: 'qualityFine.id',
            fieldLabel: 'ID',
            hidden: true
        },]
    }],

    buttons: [
        {
            text: '保存',
            handler: 'submitQualityFineEdit',
        }
    ],
});