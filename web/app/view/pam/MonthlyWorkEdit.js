Ext.define('iFlat.view.pam.MonthlyWorkEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-monthlyworkedit',
    title: '月度工作记录',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.pam.MonthlyWorkController'
    ],

    id: 'pam-monthlyworkedit',
    controller: 'pam-monthlywork',
    closeAction: 'hide',

    height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'pam-monthlyworkedit-form',
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
                xtype: 'textfield',
                name: 'monthlyWork.status',
                fieldLabel: '状态',
                hidden: true,
                listeners: {
                    change: function (field, newValue, oldValue, eOpts) {
                        if (newValue === '0') {
                            Ext.getCmp('pam-monthlyworkedit-toolbar').show();
                            Ext.getCmp('pam-monthlyworkedit-upload').show();
                            Ext.getCmp('pam-monthlyworkedit-uploadbtn').show();
                            Ext.getCmp('pam-monthlyworkedit-delete').show();
                        } else {
                            Ext.getCmp('pam-monthlyworkedit-toolbar').hide();
                            Ext.getCmp('pam-monthlyworkedit-upload').hide();
                            Ext.getCmp('pam-monthlyworkedit-delete').hide();
                            Ext.getCmp('pam-monthlyworkedit-uploadbtn').hide();
                        }
                    }
                }
            }, {
                xtype: 'textfield',
                name: 'monthlyWork.id',
                fieldLabel: 'ID',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'monthlyWork.pbName',
                fieldLabel: '党支部',
                hidden: true,
            }, {
                xtype: 'datefield',
                name: 'monthlyWork.month',
                fieldLabel: '年月(真)',
                format: 'Y-m-d',
                hidden: true,
                listeners: {
                    change: function(tf, newValue, oldValue, op) {
                        tf.nextSibling('textfield').setValue(Ext.Date.format(newValue, 'Y-m'));
                    }
                }
            }, {
                xtype: 'textfield',
                fieldLabel: '年月',
                editable: false
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-calendar',
                handler: function(btn){
                    btn.up('window').down('monthpicker').show();
                }
            }, {
                xtype: 'monthpicker',
                floating: true,
                defaultAlign: 'tl-tl',
                value: new Date(),
                listeners: {
                    okclick: function(mp, value, op) {
                        var year = value[1];
                        var month = value[0] + 1;
                        if (month.toString().length == 1) {
                            month = '0' + month.toString();
                        }
                        var time = year + '-' + month + '-01';
                        mp.up('window').down('textfield[name=monthlyWork.month]').setValue(time);
                        mp.hide();
                    },
                    cancelclick: function(mp, op) {
                        mp.hide();
                    }
                }
            }, {
                xtype: 'form',
                id: 'pam-monthlyworkedit-upload',
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
                id: 'pam-monthlyworkedit-uploadbtn',
                handler: 'uploadAttachment'
            }, {
                xtype: 'container',
                layout: 'hbox',
                id: 'pam-monthlyworkedit-att',
                margin: '0 0 0 50',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'pam-monthlyworkedit-link',
                    text: '下载附件',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    ui: 'gray',
                    id: 'pam-monthlyworkedit-delete',
                    text: '删除',
                    handler: 'deleteAttachment'
                }]
            }, {
                xtype: 'textfield',
                id: 'pam-monthlyworkedit-attachment',
                name: 'monthlyWork.attachment',
                fieldLabel: 'attachment',
                width: 750,
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange'
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '三会一课',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'checkbox',
                    name: 'monthlyWork.confBig',
                    fieldLabel: '支部大会',
                    inputValue: true,
                    width: 100
                }, {
                    xtype: 'checkbox',
                    name: 'monthlyWork.confCom',
                    fieldLabel: '支委会',
                    inputValue: true,
                    width: 100
                }, {
                    xtype: 'checkbox',
                    name: 'monthlyWork.confGroup',
                    fieldLabel: '党小组会',
                    inputValue: true,
                    width: 100
                }, {
                    xtype: 'checkbox',
                    name: 'monthlyWork.confClass',
                    fieldLabel: '党课',
                    inputValue: true,
                    width: 100
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    fieldLabel: '具体情况',
                    labelAlign: 'top',
                    name: 'monthlyWork.confContent',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '党员发展工作',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textfield',
                    name: 'monthlyWork.devApplyNum',
                    fieldLabel: '本月递交入党申请书人数',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    labelWidth: 200
                },{
                    xtype: 'textfield',
                    name: 'monthlyWork.devApplyNumSum',
                    fieldLabel: '累计递交入党申请书人数',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    labelWidth: 200
                },]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textfield',
                    name: 'monthlyWork.devActivistNum',
                    fieldLabel: '本月列为入党积极分子人数',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    labelWidth: 200
                },{
                    xtype: 'textfield',
                    name: 'monthlyWork.devActivistNumSum',
                    fieldLabel: '累计列为入党积极分子人数',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    labelWidth: 200
                },]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textfield',
                    name: 'monthlyWork.devCandidateNum',
                    fieldLabel: '本月讨论列为发展对象人数',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    labelWidth: 200
                },{
                    xtype: 'textfield',
                    name: 'monthlyWork.devFullMemberNum',
                    fieldLabel: '本月讨论预备党员转正人数',
                    regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    labelWidth: 200
                },]
            }, ]
        }, {
            xtype: 'fieldset',
            title: '人才队伍培养',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textfield',
                    name: 'monthlyWork.tmIsStable',
                    hidden: true,
                    listeners: {
                        change: function(tf, newV, oldV, op) {
                            tf.nextSibling('radiogroup').setValue({
                                'monthlyWork.tmIsStable': newV == 'true'
                            });
                        }
                    }
                }, {
                    xtype: 'label',
                    text: '部门骨干队伍是否稳定：',
                }, {
                    xtype: 'radiogroup',
                    name: 'monthlyWork.tmIsStable',
                    layout: {
                        autoFlex: false
                    },
                    defaults: {
                        margin: '0 15 0 0'
                    },
                    items: [{
                        inputValue: true,
                        value: true,
                        boxLabel: '是',
                    },{
                        inputValue: false,
                        value: false,
                        boxLabel: '否',
                    },],
                    listeners: {
                        change: function(rg, newV, oldV, op) {
                            var v = newV['monthlyWork.tmIsStable'];
                            rg.previousSibling('textfield[name=monthlyWork.tmIsStable]').setValue(v);
                        }
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textfield',
                    name: 'monthlyWork.tmHasPlan',
                    hidden: true,
                    listeners: {
                        change: function(tf, newV, oldV, op) {
                            tf.nextSibling('radiogroup').setValue({
                                'monthlyWork.tmHasPlan': newV == 'true'
                            });
                        }
                    }
                }, {
                    xtype: 'label',
                    text: '部门人才队伍是否有梯队和培养计划、培训措施：',
                }, {
                    xtype: 'radiogroup',
                    name: 'monthlyWork.tmHasPlan',
                    layout: {
                        autoFlex: false
                    },
                    defaults: {
                        margin: '0 15 0 0'
                    },
                    items: [{
                        inputValue: true,
                        boxLabel: '是',
                    },{
                        inputValue: false,
                        boxLabel: '否',
                    },],
                    listeners: {
                        change: function(rg, newV, oldV, op) {
                            var v = newV['monthlyWork.tmHasPlan'];
                            rg.previousSibling('textfield[name=monthlyWork.tmHasPlan]').setValue(v);
                        }
                    }
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    fieldLabel: '具体措施',
                    labelAlign: 'top',
                    name: 'monthlyWork.tmMeasure',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '员工思想动态和队伍稳定',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '本月支部维护员工队伍稳定举措',
                    name: 'monthlyWork.mbStableMeasure',
                    width: '100%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '员工关注的焦点',
                    name: 'monthlyWork.mbFocus',
                    width: '100%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '本月主要问题',
                    name: 'monthlyWork.mbProblem',
                    width: '100%',
                }]
            }, ]
        }, {
            xtype: 'fieldset',
            title: '精神文化建设',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '本月部门精神文化建设举措',
                    name: 'monthlyWork.scMeasure',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '先进评选活动',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '本季度部门先进典型选树情况',
                    name: 'monthlyWork.aiSituation',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '分工会/团支部工作',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '本月指导群团工作情况',
                    name: 'monthlyWork.suMassWork',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '主题教育活动',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '支部主题教育活动主题',
                    name: 'monthlyWork.seSubject',
                    width: '100%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    width: '100%',
                    labelAlign: 'top',
                    fieldLabel: '月度推进情况及成效',
                    name: 'monthlyWork.seEffect',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '党委月度计划',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '月度重点工作完成情况',
                    name: 'monthlyWork.mpWork',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'fieldset',
            title: '工作创新',
            layout: 'vbox',
            border: true,
            margin: '0 10 5 10',
            width: '100%',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '0 0 5 0',
                width: '100%',
                items: [{
                    xtype: 'textarea',
                    labelAlign: 'top',
                    fieldLabel: '推动中心工作及本月支部党建工作亮点',
                    name: 'monthlyWork.wiLightspot',
                    width: '100%',
                }]
            }]
        }, ]
    },
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        id: 'pam-monthlyworkedit-toolbar',
        disabled: true,
        items: [{
            xtype: 'button',
            text: '提交',
            handler: 'submitMonthlyWorkEdit',
        }, '->', {
            xtype: 'button',
            text: '保存',
            handler: 'saveMonthlyWorkEdit',
        }]
    }],
});