Ext.define('iFlat.view.report.ss.AccidentInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-ss-accidentinfo',
    title: '事故信息',
    layout: 'fit',
    modal: true,

    controller: 'rpt-ss-accident',
    id: 'ss-accidentinfo',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'ss-accidentinfo-form',
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
                id: 'ss-accidentinfo-form-id',
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
                xtype: 'textfield',
                name: 'accident.time',
                fieldLabel: '时间',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'accident.projName',
                fieldLabel: '船名',
                width: '33%',
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'accident.accLvl',
                fieldLabel: '事故等级',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'accident.accType',
                fieldLabel: '事故类型',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'accident.loss',
                fieldLabel: '直接经济损失',
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
                xtype: 'textfield',
                name: 'accident.busiDivision',
                fieldLabel: '事业部',
                width: '33%',
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
                id: 'ss-accidentinfo-att',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-accidentinfo-link',
                    text: '下载事故报告',
                    margin: '0 5 0 0',
                    width: 100,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-accidentinfo-attachment',
                name: 'accident.rptAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-accidentinfo-att2',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-accidentinfo-link2',
                    text: '下载事故照片',
                    margin: '0 5 0 0',
                    width: 150,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-accidentinfo-attachment2',
                name: 'accident.otherAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange2'
                }]
            },]
        }, ]
    },
});