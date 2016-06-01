Ext.define('iFlat.view.sm.SbTargetCostEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-sbtargetcostedit',
    title: '目标成本分解',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.SbTargetCostController'
    ],

    id: 'sm-sbtargetcostedit',
    controller: 'sm-sbtargetcost',
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
            id: 'sm-sbtargetcostedit-form',
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
                    name: 'targetCostVo.id',
                    id: 'sm-sbtargetcostedit-id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '工号',
                    id: 'sm-sbtargetcostedit-projno',
                    name: 'targetCostVo.projNo',
                    width: 140,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '船名',
                    id: 'sm-sbtargetcostedit-projname',
                    name: 'targetCostVo.projName',
                    width: 260,
                }, {
                    xtype: 'textfield',
                    name: 'targetCostVo.costAccount',
                    fieldLabel: '代码',
                    id: 'sm-sbtargetcostedit-costaccount',
                    width: 150
                }, {
                    xtype: 'textfield',
                    name: 'targetCostVo.costAccountName',
                    fieldLabel: '科目',
                    id: 'sm-sbtargetcostedit-costaccountname',
                    width: 250
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
                    id: 'sm-sbtargetcostedit-amount',
                    name: 'targetCostVo.amount',
                    fieldLabel: '总金额',
                    width: 220,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '已分配',
                    id: 'sm-sbtargetcostedit-distribute',
                    width: 300,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '余额',
                    id: 'sm-sbtargetcostedit-remain',
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
                id: 'sm-sbtargetcostsplit-add',
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
                id: 'sm-sbtargetcostedit-detail',
                store: smSbTargetCostSplitStore = Ext.create('iFlat.store.sm.TargetCostSplit'),
                border: true,
                columnLines: true,
                plugins: [
                    smSbTargetCostSplitRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-sbtargetcostsplit-edit',
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
                    dataIndex: 'targetCostSplit.id',
                    hidden: true
                }, {
                    header: '工号',
                    dataIndex: 'targetCostSplit.projNo',
                    hidden: true
                }, {
                    header: '船名',
                    dataIndex: 'targetCostSplit.projName',
                    hidden: true
                }, {
                    header: '部门',
                    width: 250,
                    dataIndex: 'targetCostSplit.deptName',
                    editor: {
                        xtype: 'combo',
                        anyMatch: true,
                        allowBlank: false,
                        bind: {
                            store: '{smDept}'
                        },
                        queryMode: 'local',
                        editable: true,
                        forceSelection : true,
                        valueField : 'name',
                        displayField : 'name',
                    }
                }, {
                    header: '类型',
                    width: 150,
                    dataIndex: 'targetCostSplit.type',
                    hidden: true
                }, {
                    header: '成本科目代码',
                    width: 150,
                    dataIndex: 'targetCostSplit.costAccount',
                    hidden: true
                }, {
                    header: '成本科目',
                    dataIndex: 'targetCostSplit.costAccountName',
                    hidden: true
                }, {
                    header: '金额',
                    width: 150,
                    dataIndex: 'targetCostSplit.amount',
                    editor: {
                        allowBlank: false,
                        regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                    }
                }, {
                    header: '备注',
                    flex: true,
                    dataIndex: 'targetCostSplit.comment',
                    editor: {
                    }
                }, {
                    text: '删除',
                    id: 'sm-sbtargetcost-delete',
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