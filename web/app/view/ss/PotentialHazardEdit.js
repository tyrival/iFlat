Ext.define('iFlat.view.ss.PotentialHazardEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-potentialhazardedit',
    title: '隐患管理',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.ss.PotentialHazardController'
    ],

    id: 'ss-potentialhazardedit',
    controller: 'ss-potentialhazard',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'ss-potentialhazardedit-form',
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
                xtype: 'timefield',
                name: 'potentialHazard.time',
                allowBlank: true,
                increment: 30,
                fieldLabel: '时间',
                format: 'H:i',
                width: '33%',
            },{
                xtype: 'combo',
                //margin: '0 10 0 0',
                name: 'potentialHazard.projNo',
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
                        cb.up('form').down('textfield[name=potentialHazard.projName]').setValue(v);
                    }
                }
            },{
                xtype: 'textfield',
                name: 'potentialHazard.projName',
                fieldLabel: '船名',
                hidden: true
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'potentialHazard.riskLvl',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '风险等级',
                bind: {
                    store: '{ssPhRiskLvl}',
                },
            },{
                xtype: 'combo',
                name: 'potentialHazard.phType',
                store: ssPotentialHazardPhTypeStore = Ext.create('iFlat.store.ss.PhCodeType'),
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : false,
                displayField: 'type',
                valueField: 'type',
                width: '33%',
                fieldLabel: '隐患类型',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        ssPotentialHazardPhCodeStore.getProxy().extraParams['phCode.type'] = newV;
                        ssPotentialHazardPhCodeStore.reload();
                    }
                }
            },{
                xtype: 'combo',
                name: 'potentialHazard.phCode',
                store: ssPotentialHazardPhCodeStore = Ext.create('iFlat.store.ss.PhCode', {
                    autoLoad: false
                }),
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : false,
                displayField: 'code',
                valueField: 'code',
                width: '33%',
                fieldLabel: '隐患代码',
                change: function (cb, newV, oldV, opt) {
                    var model = cb.getStore().findRecord('phCode.code', newV);
                    var amount = model.get('phCode.amount');
                    var score = model.get('phCode.score');
                    cb.up('form').down('textfield[name=potentialHazard.amount]').setValue(amount);
                    cb.up('form').down('textfield[name=potentialHazard.score]').setValue(score);
                }
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'potentialHazard.dept',
                bind: {
                    store: '{smDept}'
                },
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '所属部门',
                listeners: {
                    change: function(cb, newV, oldV, opts) {
                        ssPotentialHazardEmployeeStore.getProxy().extraParams['employee.deptName'] = newV;
                        ssPotentialHazardEmployeeStore.reload();
                    }
                }
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
                xtype: 'combo',
                name: 'potentialHazard.personName',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: '20%',
                fieldLabel: '责任人',
                store: ssPotentialHazardEmployeeStore = Ext.create('iFlat.store.code.Employee', {
                    autoLoad: true
                }),
                listeners: {
                    select: function (cb, record, opt) {
                        var team = record.get('employee.teamName');
                        cb.up('window').down('textfield[name=potentialHazard.team]').setValue(team);
                        var groupName = record.get('employee.groupName');
                        cb.up('window').down('textfield[name=potentialHazard.groupName]').setValue(groupName);
                        var account = record.get('employee.account');
                        cb.up('window').down('textfield[name=potentialHazard.personAcc]').setValue(account);
                        // 年龄，工龄，性别

                    },
                }
            },{
                xtype: 'textfield',
                name: 'potentialHazard.personAcc',
                fieldLabel: '工号',
                width: '20%',
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
                name: 'potentialHazard.region',
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
                xtype: 'combo',
                name: 'potentialHazard.deadline',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '25%',
                fieldLabel: '整改期限',
                bind: {
                    store: '{ssPhDeadline}',
                },
            },{
                xtype: 'combo',
                name: 'potentialHazard.feedback',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '25%',
                fieldLabel: '整改情况',
                bind: {
                    store: '{ssPhFeedback}',
                },
            },{
                xtype: 'textfield',
                name: 'potentialHazard.amount',
                fieldLabel: '罚款金额',
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: '25%',
            },{
                xtype: 'textfield',
                name: 'potentialHazard.score',
                fieldLabel: '负积分',
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: '24%',
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'potentialHazard.deadline',
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
                width: '99%',
            }]
        },{
            items: [{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-potentialhazardedit-att',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-potentialhazardedit-link',
                    text: '下载隐患照片',
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
                id: 'ss-potentialhazardedit-attachment',
                name: 'potentialHazard.attachment',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-potentialhazardedit-att2',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-potentialhazardedit-link2',
                    text: '下载整改后照片',
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
                id: 'ss-potentialhazardedit-attachment2',
                name: 'potentialHazard.rectifyAtt',
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
                    id: 'ss-potentialhazardedit-upload',
                    items: [{
                        xtype: 'fileuploadfield',
                        fieldLabel: '隐患照片',
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
                    id: 'ss-potentialhazardedit-upload2',
                    items: [{
                        xtype: 'fileuploadfield',
                        fieldLabel: '整改后照片',
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
            handler: 'savePotentialHazardEdit',
        },
        
    ],
});