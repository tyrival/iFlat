Ext.define('iFlat.view.pam.PartyWorkView', {
    extend: 'Ext.panel.Panel',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    id: 'pam-partyworkview',
    controller: 'pam-partyworkview',
    items: [{
        xtype: 'treepanel',
        store: pamPartyWorkPbViewNodeStore = Ext.create('iFlat.store.pam.PartyBranchTree'),
        border: true,
        useArrows: true,
        rootVisible: false,
        width: '25%',
        scrollable: true,
        listeners: {
            rowclick: 'onPartyBranchClick',
        }
    }, {
        xtype: 'tabpanel',
        width: '75%',
        flex: 1,
        tabPosition: 'right',
        defaults: {
            //bodyPadding: 10,
            scrollable: true,
        },
        items: [{
            title: '月度工作记录',
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'grid',
                    store: pamPartyWorkViewMonthNodeStore = Ext.create('iFlat.store.pam.MonthlyWorkList', {
                        proxy: {
                            extraParams: {
                                'monthlyWork.status': '1'
                            }
                        }
                    }),
                    width: 100,
                    scrollable: true,
                    hideHeaders: true,
                    border: true,
                    listeners: {
                        select: 'onMonthClick',
                    },
                    columns: [{
                        dataIndex: 'monthlyWork.month',
                        formatter: 'date("Y-m")'
                    }]
                }, {
                    xtype: 'panel',
                    tbar: [{
                        text: '退回',
                        handler: 'rejectMonthlyWork'
                    }],
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    scrollable: true,
                    width: '100%',
                    flex: 1,
                    items: [{
                        xtype: 'form',
                        id: 'pam-partyworkview-month-form',
                        margin: 5,
                        border: false,
                        layout: 'vbox',
                        flex: 1,
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
                                xtype: 'container',
                                layout: 'hbox',
                                id: 'pam-partyworkview-att',
                                margin: '0 0 0 50',
                                hidden: true,
                                items: [{
                                    xtype: 'button',
                                    id: 'pam-partyworkview-link',
                                    text: '下载附件',
                                    margin: '0 5 0 0',
                                    width: 100,
                                }]
                            }, {
                                xtype: 'textfield',
                                id: 'pam-partyworkview-attachment',
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
                                    editable: false,
                                    width: 100
                                }, {
                                    xtype: 'checkbox',
                                    name: 'monthlyWork.confCom',
                                    fieldLabel: '支委会',
                                    inputValue: true,
                                    width: 100,
                                }, ]
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [{
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
                                    editable: false,
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
                                xtype: 'textfield',
                                name: 'monthlyWork.devApplyNum',
                                fieldLabel: '本月递交入党申请书人数',
                                editable: false,
                                labelWidth: 180,
                                width: 230,
                            },{
                                xtype: 'textfield',
                                name: 'monthlyWork.devApplyNumSum',
                                fieldLabel: '累计递交入党申请书人数',
                                editable: false,
                                labelWidth: 180,
                                width: 230,
                            },{
                                xtype: 'textfield',
                                name: 'monthlyWork.devActivistNum',
                                fieldLabel: '本月列为入党积极分子人数',
                                editable: false,
                                labelWidth: 180,
                                width: 230,
                            },{
                                xtype: 'textfield',
                                name: 'monthlyWork.devActivistNumSum',
                                fieldLabel: '累计列为入党积极分子人数',
                                editable: false,
                                labelWidth: 180,
                                width: 230,
                            },{
                                xtype: 'textfield',
                                name: 'monthlyWork.devCandidateNum',
                                fieldLabel: '本月讨论列为发展对象人数',
                                editable: false,
                                labelWidth: 180,
                                width: 230,
                            },{
                                xtype: 'textfield',
                                name: 'monthlyWork.devFullMemberNum',
                                fieldLabel: '本月讨论预备党员转正人数',
                                editable: false,
                                labelWidth: 180,
                                width: 230,
                            },]
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
                                        name: 'monthlyWork.tmHasPlan',
                                        //checked: true
                                    },{
                                        inputValue: false,
                                        boxLabel: '否',
                                        name: 'monthlyWork.tmHasPlan',
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
                                    editable: false,
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
                    }]
                }]
            }]
        }, {
            title: '年度计划',
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'grid',
                    store: pamPartyWorkViewYearPlanNodeStore = Ext.create('iFlat.store.pam.YearWorkList', {
                        proxy: {
                            extraParams: {
                                'yearWork.type': '计划',
                                'yearWork.status': '1'
                            }
                        }
                    }),
                    width: 100,
                    scrollable: true,
                    hideHeaders: true,
                    border: true,
                    listeners: {
                        select: 'onYearPlanClick',
                    },
                    columns: [{
                        dataIndex: 'yearWork.year',
                        formatter: 'date("Y")'
                    }]
                }, {
                    xtype: 'panel',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    tbar: [{
                        text: '退回',
                        handler: 'rejectYearWorkPlan'
                    }],
                    scrollable: true,
                    width: '100%',
                    flex: 1,
                    items: [{
                        xtype: 'form',
                        id: 'pam-partyworkview-year-plan-form',
                        margin: 5,
                        border: false,
                        layout: 'vbox',
                        flex: 1,
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
                                name: 'yearWork.status',
                                fieldLabel: '状态',
                                hidden: true,
                            }, {
                                xtype: 'textfield',
                                name: 'yearWork.id',
                                fieldLabel: 'ID',
                                hidden: true,
                            }, {
                                xtype: 'textfield',
                                name: 'yearWork.pbName',
                                fieldLabel: '党支部',
                                hidden: true,
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                id: 'pam-partyworkview-year-plan-att',
                                margin: '0 0 0 50',
                                hidden: true,
                                items: [{
                                    xtype: 'button',
                                    id: 'pam-partyworkview-year-plan-link',
                                    text: '下载附件',
                                    margin: '0 5 0 0',
                                    width: 100,
                                }]
                            }, {
                                xtype: 'textfield',
                                name: 'yearWork.attachment',
                                fieldLabel: 'attachment',
                                width: 750,
                                hidden: true,
                                listeners: [{
                                    change: 'onAttachmentChangeYearPlanChange'
                                }]
                            }]
                        }, {
                            xtype: 'fieldset',
                            title: '内容',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            border: true,
                            margin: '0 10 5 10',
                            width: '100%',
                            flex: 1,
                            items: [{
                                xtype: 'textarea',
                                name: 'yearWork.content',
                                editable: false,
                                height: 500
                            },]
                        }]
                    }]
                }]
            }]
        }, {
            title: '年度总结',
            items: [{
                xtype: 'panel',
                layout: {
                    type: 'hbox',
                    align: 'stretch'
                },
                items: [{
                    xtype: 'grid',
                    store: pamPartyWorkViewYearSumNodeStore = Ext.create('iFlat.store.pam.YearWorkList', {
                        proxy: {
                            extraParams: {
                                'yearWork.type': '总结',
                                'yearWork.status': '1'
                            }
                        }
                    }),
                    width: 100,
                    scrollable: true,
                    hideHeaders: true,
                    border: true,
                    listeners: {
                        select: 'onYearSumClick',
                    },
                    columns: [{
                        dataIndex: 'yearWork.year',
                        formatter: 'date("Y")'
                    }]
                }, {
                    xtype: 'panel',
                    tbar: [{
                        text: '退回',
                        handler: 'rejectYearWorkSum'
                    }],
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    scrollable: true,
                    width: '100%',
                    flex: 1,
                    items: [{
                        xtype: 'form',
                        id: 'pam-partyworkview-year-sum-form',
                        margin: 5,
                        border: false,
                        layout: 'vbox',
                        flex: 1,
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
                                name: 'yearWork.status',
                                fieldLabel: '状态',
                                hidden: true,
                            }, {
                                xtype: 'textfield',
                                name: 'yearWork.id',
                                fieldLabel: 'ID',
                                hidden: true,
                            }, {
                                xtype: 'textfield',
                                name: 'yearWork.pbName',
                                fieldLabel: '党支部',
                                hidden: true,
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                id: 'pam-partyworkview-year-sum-att',
                                margin: '0 0 0 50',
                                hidden: true,
                                items: [{
                                    xtype: 'button',
                                    id: 'pam-partyworkview-year-sum-link',
                                    text: '下载附件',
                                    margin: '0 5 0 0',
                                    width: 100,
                                }]
                            }, {
                                xtype: 'textfield',
                                name: 'yearWork.attachment',
                                fieldLabel: 'attachment',
                                width: 750,
                                hidden: true,
                                listeners: [{
                                    change: 'onAttachmentChangeYearSumChange'
                                }]
                            }]
                        }, {
                            xtype: 'fieldset',
                            title: '内容',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            border: true,
                            margin: '0 10 5 10',
                            width: '100%',
                            flex: 1,
                            items: [{
                                xtype: 'textarea',
                                name: 'yearWork.content',
                                editable: false,
                                height: 500
                            },]
                        }]
                    }]
                }]
            }]
        }]
    }]
});