Ext.define('iFlat.view.ss.AccParty', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-accparty',
    title: '事故相关人员',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.ss.AccidentController'
    ],

    id: 'ss-accparty',
    controller: 'ss-accident',
    closeAction: 'hide',
    width: '80%',
    height: '80%',

    items: [{
        xtype: 'container',
        id: 'ss-accparty-form',
        margin: 5,
        border: false,
        layout: 'vbox',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60,
        },
        items: [{
            xtype: 'textfield',
            id: 'ss-accparty-accid',
            hidden: true,
            listeners: {
                change: function(tf, newV, oldV, opt) {
                    ssAccPartyStore.getProxy().extraParams['accParty.accId'] = newV;
                    ssAccPartyStore.reload();
                }
            }
        }, {
            xtype: 'gridpanel',
            width: '100%',
            flex: 1,
            height: '100%',
            scrollable: true,
            store: ssAccPartyStore = Ext.create('iFlat.store.ss.AccParty'),
            border: true,
            columnLines: true,
            plugins: [
                ssAccPartyRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                    pluginId: 'ss-accpartyedit-detail-edit',
                    clicksToMoveEditor: 1,
                    autoCancel: true,
                    listeners: {
                        edit: 'updateDetail',
                        cancelEdit: 'deleteEmptyRecord',
                    }
                })
            ],
            tbar: [{
                xtype: 'button',
                text: '新增',
                ui: 'orig-blue',
                id: 'ss-accpartyedit-detail-add',
                handler: 'addDetail'
            },{
                xtype: 'button',
                text: '刷新',
                handler: 'refreshPartyList'
            }],

            columns: [{
                text: '删除',
                width: 50,
                menuDisabled: true,
                xtype: 'actioncolumn',
                align: 'center',
                iconCls: 'x-fa fa-close',
                id: 'ss-accpartyedit-detail-delete',
                handler: 'deleteDetail',
                editor: {
                    xtype: 'label'
                }
            }, {
                header: '类型',
                width: 150,
                dataIndex: 'accParty.type',
                editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    bind: {
                        store: '{ssAccPartyType}'
                    },
                }
            }, {
                header: '部门',
                width: 150,
                dataIndex: 'accParty.dept',
                editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    bind: {
                        store: '{ssFiveSFuncDept}'
                    },
                    listeners: {
                        change: function(cb, newV, oldV, opts) {
                            ssAccPartyEmployeeStore.getProxy().extraParams['employee.deptName'] = newV;
                            ssAccPartyEmployeeStore.reload();
                        }
                    }
                }
            }, {
                header: '姓名',
                width: 120,
                dataIndex: 'accParty.personName',
                editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: true,
                    forceSelection : true,
                    typeAhead: true,
                    minChars: 0,
                    displayField: 'name',
                    valueField: 'name',
                    store: ssAccPartyEmployeeStore = Ext.create('iFlat.store.code.Employee'),
                    listeners: {
                        select: function (cb, record, opt) {
                            var account = record.get('employee.account');
                            Ext.getCmp('ss-accparty-personacc').setValue(account);
                            var team = record.get('employee.teamName');
                            Ext.getCmp('ss-accparty-team').setValue(team);
                            var groupname = record.get('employee.groupName');
                            Ext.getCmp('ss-accparty-groupname').setValue(groupname);
                            var title = record.get('employee.title');
                            Ext.getCmp('ss-accparty-title').setValue(title);

                            // 年龄，工龄，性别

                        },
                    }
                }
            }, {
                header: '工伤等级',
                width: 100,
                dataIndex: 'accParty.injuryLvl',
                editor: {
                    xtype: 'combo',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: false,
                    forceSelection : true,
                    bind: {
                        store: '{ssAccInjuryLvl}'
                    },
                }
            }, {
                header: '特种作业证编号',
                width: 120,
                dataIndex: 'accParty.opIdCardNo',
                editor: {
                }
            }, {
                header: '工号',
                width: 120,
                dataIndex: 'accParty.personAcc',
                editor: {
                    editable: false,
                    id: 'ss-accparty-personacc'
                }
            }, {
                header: '施工队',
                width: 180,
                dataIndex: 'accParty.team',
                editor: {
                    editable: false,
                    id: 'ss-accparty-team'
                }
            }, {
                header: '班组',
                width: 120,
                dataIndex: 'accParty.groupName',
                editor: {
                    editable: false,
                    id: 'ss-accparty-groupname'
                }
            }, {
                header: '岗位/工种',
                width: 120,
                dataIndex: 'accParty.title',
                editor: {
                    editable: false,
                    id: 'ss-accparty-title'
                }
            }, {
                header: '年龄',
                width: 80,
                dataIndex: 'accParty.age',
                editor: {
                    editable: false,
                    id: 'ss-accparty-age'
                }
            }, {
                header: '工龄',
                width: 80,
                dataIndex: 'accParty.seniority',
                editor: {
                    editable: false,
                    id: 'ss-accparty-seniority'
                }
            }, {
                header: '性别',
                width: 80,
                dataIndex: 'accParty.sex',
                editor: {
                    editable: false,
                    id: 'ss-accparty-sex'
                }
            }, {
                header: '事故ID',
                width: 120,
                dataIndex: 'accParty.accId',
                hidden: true
            }],
        }]
    }, ],
});