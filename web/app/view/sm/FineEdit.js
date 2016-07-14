Ext.define('iFlat.view.sm.FineEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-fineedit',
    title: '考核内容',
    layout: 'fit',
    modal: true,

    id: 'sm-fineedit',
    controller: 'sm-fine',
    closeAction: 'hide',
    //height: '95%',
    listeners: {
        close: function (win, eOpts) {
            win.down('combo[name=fine.category]').setBind({
                store: '{smCategory}'
            });
        }
    },

    items: {
        xtype: 'form',
        id: 'sm-fineedit-form',
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
                xtype: 'combo',
                name: 'fine.projNo',
                store: smFineEditComboStore = Ext.create('iFlat.store.report.bi.Project'),
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
                        var cbName = combo.nextSibling('textfield[name=fine.projName]');
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
                name: 'fine.projName',
                allowBlank: true,
                fieldLabel: '船名',
                hidden: true
            },{
                xtype: 'datefield',
                name: 'fine.date',
                allowBlank: false,
                fieldLabel: '日期',
                format: 'Y-m-d',
                width: 250
            },{
                xtype: 'textfield',
                name: 'fine.id',
                hidden: true
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'fine.type',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 200,
                fieldLabel: '考核类',
                bind: {
                    store: '{smFineType}',
                },
                listeners: {
                    change: function (combo , newValue , oldValue , eOpts ) {
                        var n = newValue;
                        switch (n) {
                            case '计划执行':
                                n = 'Plan'
                                break;
                            case '设备能源':
                                n = 'Energy'
                                break;
                            case '其他':
                                n = 'Other'
                                break;
                        };

                        combo.nextSibling('combo[name=fine.category]').setBind({
                            store: '{smCategory' + n + '}'
                        });
                    },
                }
            },{
                xtype: 'combo',
                name: 'fine.category',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                width: 200,
                fieldLabel: '类别',
                bind: {
                    store: '{smCategory}'
                }
            },{
                xtype: 'textfield',
                name: 'fine.amount',
                allowBlank: false,
                fieldLabel: '金额',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 175,
            },{
                xtype: 'textfield',
                name: 'fine.score',
                allowBlank: false,
                fieldLabel: '扣分',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 175,
            }]
        },{
            items: [{
                xtype: 'combo',
                id: 'sm-fineedit-dept',
                name: 'fine.dept',
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
                id: 'sm-fineedit-team',
                name: 'fine.team',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : true,
                displayField: 'teamName',
                valueField: 'teamName',
                width: 450,
                fieldLabel: '施工队',
                store: smFineTeamStore = Ext.create('iFlat.store.code.Team'),
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },]
        },{
            items: [{
                xtype: 'combo',
                id: 'sm-fineedit-group',
                name: 'fine.group',
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : true,
                displayField: 'groupName',
                valueField: 'groupName',
                width: 300,
                fieldLabel: '班组',
                store: smFineGroupStore = Ext.create('iFlat.store.code.Group'),
                listeners: {
                    select: 'onTeamInfoChange',
                }
            },{
                xtype: 'combo',
                id: 'sm-fineedit-person',
                name: 'fine.personName',
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
                store: smFineWorkerStore = Ext.create('iFlat.store.code.Worker'),
                listeners: {
                    select: 'onPersonChange',
                }
            },]
        },{
            items: [{
                xtype: 'textarea',
                name: 'fine.description',
                allowBlank: false,
                fieldLabel: '描述',
                height: 100,
                width: 750,
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fine.comment',
                fieldLabel: '备注',
                width: 750,
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            id: 'sm-fineedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'sm-fineedit-link',
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
            id: 'sm-fineedit-attachment',
            name: 'fine.attachment',
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
                id: 'sm-fineedit-upload',
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
            id: 'sm-fineedit-personacc',
            name: 'fine.personAcc',
            fieldLabel: '账号',
            hidden: true
        }]
    },
    buttons: [
        {
            text: '保存',
            handler: 'submitFineEdit',
        }
    ],
});