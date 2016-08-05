Ext.define('iFlat.view.pam.PartyInfoView', {
    extend: 'Ext.panel.Panel',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    id: 'pam-partyinfoview',
    controller: 'pam-partyinfoview',
    items: [{
        xtype: 'treepanel',
        store: pamPartyInfoPbViewNodeStore = Ext.create('iFlat.store.pam.PartyBranchTree'),
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
            scrollable: true,
        },
        items: [{
            title: '概况',
            items: [{
                xtype: 'form',
                id: 'pam-partyinfoview-general-form',
                margin: 5,
                border: false,
                layout: 'vbox',
                scrollable: 'y',
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 80,
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
                        name: 'pamGeneral.pbName',
                        fieldLabel: '党支部',
                        editable: false,
                        width: 500,
                        listeners: {
                            change: 'onGeneralPbNameChange'
                        }
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'pamGeneral.deptMemberNum',
                        fieldLabel: '部门人数',
                        editable: false,
                        width: 250
                    }, {
                        xtype: 'textfield',
                        name: 'pamGeneral.partyMemberNum',
                        fieldLabel: '党员人数',
                        editable: false,
                        width: 250
                    }, ]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'pamGeneral.partyGroupNum',
                        fieldLabel: '党小组数',
                        editable: false,
                        width: 250
                    }, {
                        xtype: 'textfield',
                        name: 'pamGeneral.malePartyMember',
                        fieldLabel: '男党员数',
                        editable: false,
                        width: 125
                    }, {
                        xtype: 'textfield',
                        name: 'pamGeneral.femalePartyMember',
                        fieldLabel: '女党员数',
                        editable: false,
                        width: 125
                    }, ]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'pamGeneral.groupWithoutParty',
                        fieldLabel: '无党员班组（科室）数',
                        editable: false,
                        width: 250
                    }, {
                        xtype: 'textfield',
                        name: 'pamGeneral.comsomol',
                        fieldLabel: '团员数',
                        editable: false,
                        width: 250
                    }, ]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'pamGeneral.contact',
                        fieldLabel: '联络人',
                        editable: false,
                        width: 250
                    }, {
                        xtype: 'textfield',
                        name: 'pamGeneral.phoneNum',
                        fieldLabel: '联系方式',
                        editable: false,
                        width: 250
                    }, ]
                },]
            }]
        }, {
            title: '党小组设置',
            items: [{
                xtype: 'grid',
                store: pamPartyInfoPartyGroupStore = Ext.create('iFlat.store.pam.PartyGroup'),
                columns: [{
                    header: '党小组名',
                    dataIndex: 'partyGroup.name',
                    flex: 1,
                }, {
                    header: '组长姓名',
                    dataIndex: 'partyGroup.leader',
                    flex: 1,
                }, {
                    header: '党员数',
                    dataIndex: 'partyGroup.memberNum',
                    width: 120,
                }, {
                    header: '所辖科室（班组）',
                    dataIndex: 'partyGroup.group',
                    flex: 1,
                }],
            }]
        }, {
            title: '党支部委员会',
            items: [{
                xtype: 'grid',
                store: pamPartyInfoCommitteeStore = Ext.create('iFlat.store.pam.Committee'),
                columns: [{
                    text: '详情',
                    width: 60,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: '详情',
                    align: 'center',
                    iconCls: 'x-fa fa-edit',
                    handler: 'showCommitteeInfo',
                    editor: {
                        xtype: 'label',
                    },
                }, {
                    header: '改选日期',
                    dataIndex: 'committee.electionTime',
                    formatter: 'date("Y-m-d")',
                    flex: 1,
                }, {
                    header: '人数',
                    dataIndex: 'committee.people',
                    flex: 1,
                }],
            }]
        }, {
            title: '正式党员',
            items: [{
                xtype: 'grid',
                scrollable: true,
                store: pamPartyInfoMemberFullStore = Ext.create('iFlat.store.pam.MemberList', {
                    proxy: {
                        extraParams: {
                            'pamMember.type': '正式',
                        }
                    },
                }),
                columns: [{
                    header: '姓名',
                    dataIndex: 'pamMember.name',
                    width: 120
                }, {
                    header: '一卡通',
                    dataIndex: 'pamMember.account',
                    width: 120
                }, {
                    header: '部门',
                    dataIndex: 'pamMember.dept',
                    width: 120
                }, {
                    header: '性别',
                    dataIndex: 'pamMember.sex',
                    width: 120
                }, {
                    header: '出生年月',
                    dataIndex: 'pamMember.birth',
                    formatter: 'date("Y-m")',
                    width: 120
                }, {
                    header: '民族',
                    dataIndex: 'pamMember.nation',
                    width: 120
                }, {
                    header: '籍贯',
                    dataIndex: 'pamMember.birthplace',
                    width: 120
                }, {
                    header: '入党时间',
                    dataIndex: 'pamMember.joinParty',
                    formatter: 'date("Y-m-d")',
                    width: 120
                }, {
                    header: '转正时间',
                    dataIndex: 'pamMember.becomeFullMemberFull',
                    formatter: 'date("Y-m-d")',
                    width: 120
                }, {
                    header: '工作时间',
                    dataIndex: 'pamMember.startWorking',
                    formatter: 'date("Y-m-d")',
                    width: 120
                }, {
                    header: '身份证号',
                    dataIndex: 'pamMember.idCardNo',
                    width: 120
                }, {
                    header: '学历',
                    dataIndex: 'pamMember.diploma',
                    width: 120
                },  {
                    header: '学位',
                    dataIndex: 'pamMember.degree',
                    width: 120
                },  {
                    header: '入学时间',
                    dataIndex: 'pamMember.enrolment',
                    formatter: 'date("Y-m-d")',
                    width: 120
                },  {
                    header: '毕业时间',
                    dataIndex: 'pamMember.graduation',
                    formatter: 'date("Y-m-d")',
                    width: 120
                },  {
                    header: '技术职务',
                    dataIndex: 'pamMember.adminTitle',
                    width: 120
                }],
            }]
        }, {
            title: '预备党员',
            items: [{
                xtype: 'grid',
                scrollable: true,
                store: pamPartyInfoMemberProbStore = Ext.create('iFlat.store.pam.MemberList', {
                    proxy: {
                        extraParams: {
                            'pamMember.type': '预备',
                        }
                    },
                }),
                columns: [{
                    header: '姓名',
                    dataIndex: 'pamMember.name',
                    width: 120
                }, {
                    header: '一卡通',
                    dataIndex: 'pamMember.account',
                    width: 120
                }, {
                    header: '部门',
                    dataIndex: 'pamMember.dept',
                    width: 120
                }, {
                    header: '性别',
                    dataIndex: 'pamMember.sex',
                    width: 120
                }, {
                    header: '出生年月',
                    dataIndex: 'pamMember.birth',
                    formatter: 'date("Y-m")',
                    width: 120
                }, {
                    header: '民族',
                    dataIndex: 'pamMember.nation',
                    width: 120
                }, {
                    header: '籍贯',
                    dataIndex: 'pamMember.birthplace',
                    width: 120
                }, {
                    header: '入党时间',
                    dataIndex: 'pamMember.joinParty',
                    formatter: 'date("Y-m-d")',
                    width: 120
                }, {
                    header: '转正时间',
                    dataIndex: 'pamMember.becomeFullMemberFull',
                    formatter: 'date("Y-m-d")',
                    width: 120
                }, {
                    header: '工作时间',
                    dataIndex: 'pamMember.startWorking',
                    formatter: 'date("Y-m-d")',
                    width: 120
                }, {
                    header: '身份证号',
                    dataIndex: 'pamMember.idCardNo',
                    width: 120
                }, {
                    header: '学历',
                    dataIndex: 'pamMember.diploma',
                    width: 120
                },  {
                    header: '学位',
                    dataIndex: 'pamMember.degree',
                    width: 120
                },  {
                    header: '入学时间',
                    dataIndex: 'pamMember.enrolment',
                    formatter: 'date("Y-m-d")',
                    width: 120
                },  {
                    header: '毕业时间',
                    dataIndex: 'pamMember.graduation',
                    formatter: 'date("Y-m-d")',
                    width: 120
                },  {
                    header: '技术职务',
                    dataIndex: 'pamMember.adminTitle',
                    width: 120
                }],
            }]
        }, {
            title: '入党积极分子',
            items: [{
                xtype: 'grid',
                store: pamPartyInfoActivistStore = Ext.create('iFlat.store.pam.Activist'),
                columns: [{
                    header: '姓名',
                    dataIndex: 'activist.name',
                    flex: 1,
                }, {
                    header: '性别',
                    dataIndex: 'activist.sex',
                    flex: 1,
                }, {
                    header: '工作部门',
                    dataIndex: 'activist.dept',
                    flex: 1,
                }, {
                    header: '出生年月',
                    dataIndex: 'activist.birth',
                    flex: 1,
                }, {
                    header: '申请时间',
                    dataIndex: 'activist.applyTime',
                    flex: 1,
                }, {
                    header: '列为积极分子时间',
                    dataIndex: 'activist.becomeActivist',
                    flex: 1,
                }],
            }]
        }, {
            title: '申请入党人员',
            items: [{
                xtype: 'grid',
                store: pamPartyInfoApplicantStore = Ext.create('iFlat.store.pam.Applicant'),
                columns: [{
                    header: '姓名',
                    dataIndex: 'applicant.name',
                    flex: 1,
                }, {
                    header: '性别',
                    dataIndex: 'applicant.sex',
                    flex: 1,
                }, {
                    header: '工作部门',
                    dataIndex: 'applicant.dept',
                    flex: 1,
                }, {
                    header: '出生年月',
                    dataIndex: 'applicant.birth',
                    flex: 1,
                }, {
                    header: '申请时间',
                    dataIndex: 'applicant.applyTime',
                    flex: 1,
                }, {
                    header: '列为积极分子时间',
                    dataIndex: 'applicant.becomeApplicant',
                    flex: 1,
                }],
            }]
        }]
    }]
});