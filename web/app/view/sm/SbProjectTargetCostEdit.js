Ext.define('iFlat.view.sm.SbProjectTargetCostEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-sbprojecttargetcostedit',
    title: '目标成本分解',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.SbProjectTargetCostController'
    ],

    id: 'sm-sbprojecttargetcostedit',
    controller: 'sm-sbprojecttargetcost',
    closeAction: 'hide',
    items: [{
        xtype: 'container',
        margin: '10 10 10 10',
        maxHeight: 600,
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch',
        },
        items: [{
            xtype: 'form',
            id: 'sm-sbprojecttargetcostedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
                disabled: true
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    name: 'projectTargetCostVo.id',
                    id: 'sm-sbprojecttargetcostedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '工号',
                    id: 'sm-sbprojecttargetcostedit-projno',
                    name: 'projectTargetCostVo.projNo',
                    width: 140,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '船名',
                    id: 'sm-sbprojecttargetcostedit-projname',
                    name: 'projectTargetCostVo.projName',
                    width: 260,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                fieldDefaults: {
                    disabled: true
                },
                items: [{
                    xtype: 'textfield',
                    id: 'sm-sbprojecttargetcostedit-amount',
                    name: 'projectTargetCostVo.amount',
                    fieldLabel: '总金额',
                    width: 220,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '已分配',
                    id: 'sm-sbprojecttargetcostedit-distribute',
                    width: 300,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '余额',
                    id: 'sm-sbprojecttargetcostedit-remain',
                    width: 280,
                }]
            }, ]
        }, {
            xtype: 'panel',
            height: 450,
            border: false,
            margin: '10 0 0 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            tbar: [{
                xtype: 'button',
                text: '新增',
                ui: 'orig-blue',
                id: 'sm-sbprojecttargetcostsplit-add',
                handler: 'addSplit'
            }, '->', {
                xtype: 'button',
                text: '刷新',
                handler: 'refreshSplit'
            }],
            items: [{
                xtype: 'gridpanel',
                width: 800,
                scrollable: true,
                id: 'sm-sbprojecttargetcostedit-detail',
                store: smSbProjectTargetCostSplitStore = Ext.create('iFlat.store.sm.TargetCost'),
                border: true,
                columnLines: true,
                plugins: [
                    smSbProjectTargetCostSplitRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-sbprojecttargetcostsplit-edit',
                        clicksToMoveEditor: 1,
                        autoCancel: true,
                        listeners: {
                            edit: 'updateSplitRecord',
                            cancelEdit: 'deleteEmptyRecord',
                        }
                    })
                ],
                columns: [{
                    header: 'id',
                    dataIndex: 'targetCost.id',
                    hidden: true
                }, {
                    header: '工号',
                    dataIndex: 'targetCost.projNo',
                    hidden: true
                }, {
                    header: '船名',
                    dataIndex: 'targetCost.projName',
                    hidden: true
                }, {
                    header: '成本科目代码',
                    width: 250,
                    dataIndex: 'targetCost.costAccount',
                    editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: smSbTargetCoseEditComboStore
                            = Ext.create('iFlat.store.sm.TargetCostAccount', {
                            proxy: {
                                extraParams: {
                                    'targetCostAccount.type': '造船'
                                }
                            }
                        }),
                        queryMode: 'local',
                        editable: true,
                        forceSelection : true,
                        anyMatch: true,
                        valueField : 'code',
                        displayField : 'description',
                        listeners: {
                            change: 'onCostAccountChange',
                        }
                    }
                }, {
                    header: '成本科目',
                    dataIndex: 'targetCost.costAccountName',
                    flex: true,
                    editor: {
                        id: 'sm-sbprojecttargetcostedit-detail-costaccountname',
                        editabler: false,
                    }
                }, {
                    header: '金额',
                    width: 150,
                    dataIndex: 'targetCost.amount',
                    editor: {
                        allowBlank: false,
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    text: '删除',
                    id: 'sm-sbprojecttargetcost-delete',
                    width: 60,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    tooltip: '删除',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    handler: 'deleteSplit',
                    editor: {
                        xtype: 'label',
                    }
                }],
            }]
        }],
    }],
});