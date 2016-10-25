Ext.define('iFlat.view.report.ss.PotentialHazardInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-ss-potentialhazardinfo',
    title: '隐患内容',
    layout: 'fit',
    modal: true,

    id: 'ss-potentialhazardinfo',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'ss-potentialhazardinfo-form',
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
                name: 'potentialHazard.id',
                fieldLabel: 'id',
                hidden: true
            }]
        },{
            items: [{
                xtype: 'datefield',
                name: 'potentialHazard.date',
                allowBlank: false,
                width: '33%',
                fieldLabel: '日期',
                format: 'Y-m-d'
            },{
                xtype: 'textfield',
                name: 'potentialHazard.time',
                allowBlank: true,
                fieldLabel: '时间',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.projName',
                fieldLabel: '船名',
                width: '33%',
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.riskLvl',
                editable: false,
                fieldLabel: '风险等级',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.phType',
                editable: false,
                fieldLabel: '隐患类型',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.phCode',
                editable: false,
                fieldLabel: '隐患代码',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.content',
                fieldLabel: '隐患内容',
                width: '33%',
                editable: false
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.dept',
                fieldLabel: '所属部门',
                width: '33%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'potentialHazard.team',
                fieldLabel: '施工队',
                width: '33%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'potentialHazard.groupName',
                fieldLabel: '班组',
                width: '33%',
                editable: false
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.personName',
                fieldLabel: '责任人',
                width: '40%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.personAcc',
                fieldLabel: '工号',
                width: '20%',
                hidden: true,
                editable: false
            },{
                xtype: 'textfield',
                name: 'potentialHazard.age',
                fieldLabel: '年龄',
                width: '20%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'potentialHazard.seniority',
                fieldLabel: '工龄',
                width: '20%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'potentialHazard.sex',
                fieldLabel: '性别',
                width: '19%',
                editable: false
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.title',
                fieldLabel: '岗位',
                width: '20%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'potentialHazard.area',
                fieldLabel: '区域',
                width: '40%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.position',
                fieldLabel: '位置',
                width: '39%',
            }]
        },{
            items: [{
                xtype: 'textarea',
                name: 'potentialHazard.description',
                fieldLabel: '负面发现描述',
                labelAligh: 'top',
                width: '99%',
            }]
        },{
            items: [{
                xtype: 'textarea',
                name: 'potentialHazard.measure',
                fieldLabel: '整改措施',
                labelAligh: 'top',
                width: '99%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.deadline',
                fieldLabel: '整改期限',
                width: '25%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.feedback',
                fieldLabel: '整改情况',
                width: '25%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.amount',
                fieldLabel: '罚款金额',
                width: '25%',
                id: 'rpt-ss-potentialhazardinfo-amount',
                hidden: true,
            },{
                xtype: 'textfield',
                name: 'potentialHazard.score',
                fieldLabel: '负积分',
                width: '24%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.busiDivision',
                fieldLabel: '事业部',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.projMgr',
                fieldLabel: '总管',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.profMgr',
                fieldLabel: '主管',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.workMgr',
                fieldLabel: '作业长',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.teamLeader',
                fieldLabel: '班组长',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.posiMgr',
                fieldLabel: '档长',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'potentialHazard.comment',
                fieldLabel: '备注',
                width: '66%',
            }, {
                xtype: 'textfield',
                name: 'potentialHazard.issuer',
                fieldLabel: '查处人',
                width: '33%',
                id: 'rpt-ss-potentialhazardinfo-issuer',
                hidden: true,
            }]
        },{
            items: [{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-potentialhazardinfo-att',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-potentialhazardinfo-link',
                    text: '下载隐患照片',
                    margin: '0 5 0 0',
                    width: 100,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-potentialhazardinfo-attachment',
                name: 'potentialHazard.attachment',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: function(field, newValue, oldValue, eOpts) {
                        if (newValue && newValue != '') {
                            Ext.getCmp('ss-potentialhazardinfo-att').show();
                            Ext.getCmp('ss-potentialhazardinfo-link').setHref(newValue);
                        } else {
                            Ext.getCmp('ss-potentialhazardinfo-att').hide();
                            Ext.getCmp('ss-potentialhazardinfo-link').setHref('');
                        }
                    },
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-potentialhazardinfo-att2',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-potentialhazardinfo-link2',
                    text: '下载整改后照片',
                    margin: '0 5 0 0',
                    width: 150,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-potentialhazardinfo-attachment2',
                name: 'potentialHazard.rectifyAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: function(field, newValue, oldValue, eOpts) {
                        if (newValue && newValue != '') {
                            Ext.getCmp('ss-potentialhazardinfo-att2').show();
                            Ext.getCmp('ss-potentialhazardinfo-link2').setHref(newValue);
                        } else {
                            Ext.getCmp('ss-potentialhazardinfo-att2').hide();
                            Ext.getCmp('ss-potentialhazardinfo-link2').setHref('');
                        }
                    },
                }]
            },]
        }]
    },
});