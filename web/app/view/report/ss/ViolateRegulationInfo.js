Ext.define('iFlat.view.report.ss.ViolateRegulationInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-ss-violateregulationinfo',
    title: '违章信息',
    layout: 'fit',
    modal: true,

    controller: 'rpt-ss-violateregulation',
    id: 'ss-violateregulationinfo',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'ss-violateregulationinfo-form',
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
                name: 'violateRegulation.id',
                fieldLabel: 'id',
                hidden: true
            }]
        },{
            items: [{
                xtype: 'datefield',
                name: 'violateRegulation.date',
                allowBlank: false,
                width: '33%',
                fieldLabel: '日期',
                format: 'Y-m-d'
            },{
                xtype: 'textfield',
                name: 'violateRegulation.time',
                fieldLabel: '时间',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.projName',
                fieldLabel: '船名',
                width: '33%',
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.riskLvl',
                fieldLabel: '风险等级',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.code',
                fieldLabel: '违章代码',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.content',
                fieldLabel: '违章内容',
                width: '33%',
                editable: false
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.dept',
                fieldLabel: '所属部门',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.team',
                fieldLabel: '施工队',
                width: '33%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'violateRegulation.groupName',
                fieldLabel: '班组',
                width: '33%',
                editable: false
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.personName',
                fieldLabel: '责任人',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.personAcc',
                fieldLabel: '工号',
                width: '20%',
                hidden: true,
                editable: false
            },{
                xtype: 'textfield',
                name: 'violateRegulation.age',
                fieldLabel: '年龄',
                width: '20%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'violateRegulation.seniority',
                fieldLabel: '工龄',
                width: '20%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'violateRegulation.sex',
                fieldLabel: '性别',
                width: '19%',
                editable: false
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.title',
                fieldLabel: '岗位',
                width: '20%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'violateRegulation.area',
                fieldLabel: '区域',
                width: '40%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.position',
                fieldLabel: '位置',
                width: '39%',
            }]
        },{
            items: [{
                xtype: 'textarea',
                name: 'violateRegulation.description',
                fieldLabel: '负面发现描述',
                labelAligh: 'top',
                width: '99%',
            }]
        },{
            items: [{
                xtype: 'textarea',
                name: 'violateRegulation.measure',
                fieldLabel: '整改措施',
                labelAligh: 'top',
                width: '99%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.feedback',
                fieldLabel: '整改情况',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.amount',
                fieldLabel: '罚款金额',
                width: '33%',
                id: 'rpt-ss-violateregulationinfo-amount',
                hidden: true,
            },{
                xtype: 'textfield',
                name: 'violateRegulation.score',
                fieldLabel: '负积分',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.busiDivision',
                fieldLabel: '事业部',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.projMgr',
                fieldLabel: '总管',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.profMgr',
                fieldLabel: '主管',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.workMgr',
                fieldLabel: '作业长',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.teamLeader',
                fieldLabel: '班组长',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.posiMgr',
                fieldLabel: '档长',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.comment',
                fieldLabel: '备注',
                width: '66%',
            }, {
                xtype: 'textfield',
                name: 'violateRegulation.issuer',
                fieldLabel: '查处人',
                width: '33%',
                id: 'rpt-ss-violateregulation-issuer',
                hidden: true,
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'violateRegulation.training',
                fieldLabel: '集中培训',
                width: '50%',
            }, {
                xtype: 'textfield',
                name: 'violateRegulation.trainingEff',
                fieldLabel: '培训效果',
                width: '49%',
            }]
        },{
            items: [{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-violateregulationinfo-att',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-violateregulationinfo-link',
                    text: '下载违章照片',
                    margin: '0 5 0 0',
                    width: 100,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-violateregulationinfo-attachment',
                name: 'violateRegulation.attachment',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-violateregulationinfo-att2',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-violateregulationinfo-link2',
                    text: '下载整改照片',
                    margin: '0 5 0 0',
                    width: 120,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-violateregulationinfo-attachment2',
                name: 'violateRegulation.rectifyAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange2'
                }]
            }, ]
        },]
    },
});