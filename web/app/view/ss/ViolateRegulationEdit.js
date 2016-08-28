Ext.define('iFlat.view.ss.ViolateRegulationEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-violateregulationedit',
    title: '违章管理',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.ss.ViolateRegulationController'
    ],

    id: 'ss-violateregulationedit',
    controller: 'ss-violateregulation',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'ss-violateregulationedit-form',
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
                xtype: 'timefield',
                name: 'violateRegulation.time',
                allowBlank: true,
                increment: 30,
                fieldLabel: '时间',
                format: 'H:i',
                width: '33%',
            },{
                xtype: 'combo',
                //margin: '0 10 0 0',
                name: 'violateRegulation.projNo',
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
                            cb.up('form').down('textfield[name=violateRegulation.projName]').setValue(v);
                        }
                    }
                }
            },{
                xtype: 'textfield',
                name: 'violateRegulation.projName',
                fieldLabel: '船名',
                hidden: true
            },]
        },{
            items: [{
                xtype: 'combo',
                name: 'violateRegulation.phType',
                store: ssViolateRegulationPhTypeStore = Ext.create('iFlat.store.ss.VrCodeRiskLvl'),
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : false,
                displayField: 'riskLvl',
                valueField: 'riskLvl',
                width: '33%',
                fieldLabel: '风险等级',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        ssViolateRegulationPhCodeStore.getProxy().extraParams['vrCode.riskLvl'] = newV;
                        ssViolateRegulationPhCodeStore.reload();
                    }
                }
            },{
                xtype: 'combo',
                name: 'violateRegulation.phCode',
                store: ssViolateRegulationPhCodeStore = Ext.create('iFlat.store.ss.VrCode', {
                    autoLoad: false
                }),
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : false,
                displayField: 'code',
                valueField: 'code',
                width: '33%',
                fieldLabel: '违章代码',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        var model = cb.getStore().findRecord('vrCode.code', newV);
                        if (model) {
                            var amount = model.get('vrCode.amount');
                            var score = model.get('vrCode.score');
                            cb.up('form').down('textfield[name=violateRegulation.amount]').setValue(amount);
                            cb.up('form').down('textfield[name=violateRegulation.score]').setValue(score);
                        }
                    }
                }
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'violateRegulation.dept',
                bind: {
                    store: '{ssFiveSFuncDept}'
                },
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '所属部门',
                listeners: {
                    change: function(cb, newV, oldV, opts) {
                        ssViolateRegulationEmployeeStore.getProxy().extraParams['employee.deptName'] = newV;
                        ssViolateRegulationEmployeeStore.reload();
                    }
                }
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
                xtype: 'combo',
                name: 'violateRegulation.personName',
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
                store: ssViolateRegulationEmployeeStore = Ext.create('iFlat.store.code.Employee', {
                    autoLoad: true
                }),
                listeners: {
                    select: function (cb, record, opt) {
                        var team = record.get('employee.teamName');
                        cb.up('window').down('textfield[name=violateRegulation.team]').setValue(team);
                        var groupName = record.get('employee.groupName');
                        cb.up('window').down('textfield[name=violateRegulation.groupName]').setValue(groupName);
                        var account = record.get('employee.account');
                        cb.up('window').down('textfield[name=violateRegulation.personAcc]').setValue(account);
                        // 年龄，工龄，性别

                    },
                }
            },{
                xtype: 'textfield',
                name: 'violateRegulation.personAcc',
                fieldLabel: '工号',
                width: '20%',
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
                xtype: 'combo',
                name: 'violateRegulation.feedback',
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : false,
                width: '33%',
                fieldLabel: '整改情况',
                bind: {
                    store: '{ssVrFeedback}',
                },
            },{
                xtype: 'textfield',
                name: 'violateRegulation.amount',
                fieldLabel: '罚款金额',
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'violateRegulation.score',
                fieldLabel: '负积分',
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'violateRegulation.busiDivision',
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
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'violateRegulation.ssVrTraining',
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : false,
                width: '50%',
                fieldLabel: '集中培训',
                bind: {
                    store: '{ssVrTraining}',
                },
            }, {
                xtype: 'textfield',
                name: 'violateRegulation.trainingEff',
                fieldLabel: '培训效果',
                width: '49%',
                regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
            }]
        },{
            items: [{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-violateregulationedit-att',
                margin: '10 0 0 85',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-violateregulationedit-link',
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
                id: 'ss-violateregulationedit-attachment',
                name: 'violateRegulation.attachment',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }, ]
        }, {
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 10 0',
                width: '50%',
                items: [{
                    xtype: 'form',
                    id: 'ss-violateregulationedit-upload',
                    items: [{
                        xtype: 'fileuploadfield',
                        fieldLabel: '附件',
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
            }]
        }]
    },
    buttons: [
        '->', {
            text: '保存',
            handler: 'saveViolateRegulationEdit',
        },
        
    ],
});