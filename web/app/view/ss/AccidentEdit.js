Ext.define('iFlat.view.ss.AccidentEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-accidentedit',
    title: '事故管理',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.ss.AccidentController'
    ],

    listeners: {
        close: function(){
            ssAccidentStore.reload()
        }
    },
    id: 'ss-accidentedit',
    controller: 'ss-accident',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    tbar: [{
        text: '相关人员登记',
        ui: 'orig-blue',
        handler: 'setPerson'
    }],
    items: {
        xtype: 'form',
        id: 'ss-accidentedit-form',
        border: false,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        scrollable: true,
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60,
        },
        defaults: {
            border: false,
            xtype: 'panel',
            layout: 'hbox',
            margin: '5 0 15 0',
        },
        items: [{
            items: [{
                xtype: 'textfield',
                name: 'accident.id',
                fieldLabel: 'id',
                id: 'ss-accidentedit-form-id',
                hidden: true
            }]
        },{
            items: [{
                xtype: 'datefield',
                name: 'accident.date',
                allowBlank: false,
                width: '33%',
                fieldLabel: '日期',
                format: 'Y-m-d'
            },{
                xtype: 'timefield',
                name: 'accident.time',
                allowBlank: true,
                increment: 30,
                fieldLabel: '时间',
                format: 'H:i',
                width: '33%',
            },{
                xtype: 'combo',
                //margin: '0 10 0 0',
                name: 'accident.projNo',
                store: Ext.create('iFlat.store.report.bi.Project', {
                    proxy: {
                        extraParams: {
                            'rptProject.status': 0
                        }
                    }
                }),
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : true,
                anyMatch: true,
                displayField: 'name',
                valueField: 'projNo',
                width: '33%',
                fieldLabel: '工程名',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        var v = cb.getStore().findRecord('rptProject.projNo', newV).get('name');
                        if (v) {
                            cb.up('form').down('textfield[name=accident.projName]').setValue(v);
                        }
                    }
                }
            },{
                xtype: 'textfield',
                name: 'accident.projName',
                fieldLabel: '船名',
                hidden: true
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'accident.accLvl',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '事故等级',
                bind: {
                    store: '{ssAccLvl}',
                },
            },{
                xtype: 'combo',
                name: 'accident.accType',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '事故类型',
                bind: {
                    store: '{ssAccType}',
                },
            },{
                xtype: 'textfield',
                name: 'accident.loss',
                fieldLabel: '直接经济损失',
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'accident.area',
                fieldLabel: '区域',
                width: '50%',
            },{
                xtype: 'textfield',
                name: 'accident.position',
                fieldLabel: '位置',
                width: '49%',
            }]
        },{
            items: [{
                xtype: 'textarea',
                name: 'accident.description',
                fieldLabel: '简要经过',
                width: '99%',
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'accident.busiDivision',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '事业部',
                bind: {
                    store: '{safetyFineMgrDept}',
                },
            },{
                xtype: 'textfield',
                name: 'accident.projMgr',
                fieldLabel: '总管',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'accident.profMgr',
                fieldLabel: '主管',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'accident.workMgr',
                fieldLabel: '作业长',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'accident.teamLeader',
                fieldLabel: '班组长',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'accident.posiMgr',
                fieldLabel: '档长',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'accident.comment',
                fieldLabel: '备注',
                width: '99%',
            }, {
                xtype: 'textfield',
                name: 'accident.issuer',
                fieldLabel: '查处人',
                width: '33%',
                hidden: true
            }]
        },{
            items: [{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-accidentedit-att',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-accidentedit-link',
                    text: '下载事故报告',
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
                id: 'ss-accidentedit-attachment',
                name: 'accident.rptAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-accidentedit-att2',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-accidentedit-link2',
                    text: '下载事故照片',
                    margin: '0 5 0 0',
                    width: 150,
                }, {
                    xtype: 'button',
                    ui: 'gray',
                    text: '删除',
                    handler: 'deleteAttachment2'
                }]
            },{
                xtype: 'textfield',
                id: 'ss-accidentedit-attachment2',
                name: 'accident.otherAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange2'
                }]
            },]
        }, {
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 10 0',
                width: '50%',
                items: [{
                    xtype: 'form',
                    id: 'ss-accidentedit-upload',
                    items: [{
                        xtype: 'fileuploadfield',
                        fieldLabel: '事故报告',
                        name: 'upload',
                        buttonText: '选择...',
                        width: 300,
                        labelWidth: 80,
                        margin: '0 10 0 0',
                    }]
                }, {
                    xtype: 'button',
                    text: '上传',
                    ui: 'orig-blue',
                    handler: 'uploadAttachment'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 10 0',
                width: '50%',
                items: [{
                    xtype: 'form',
                    id: 'ss-accidentedit-upload2',
                    items: [{
                        xtype: 'fileuploadfield',
                        fieldLabel: '事故照片',
                        name: 'upload',
                        buttonText: '选择...',
                        width: 300,
                        labelWidth: 80,
                        margin: '0 10 0 0',
                    }]
                }, {
                    xtype: 'button',
                    text: '上传',
                    ui: 'orig-blue',
                    handler: 'uploadAttachment2'
                }]
            }]
        }]
    },
    buttons: [
        '->', {
            text: '保存',
            handler: 'saveAccidentEdit',
        },
        
    ],
});