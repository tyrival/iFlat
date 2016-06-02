Ext.define('iFlat.view.sm.ScTargetCostEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-sctargetcostedit',
    title: '目标成本分解',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.ScTargetCostController'
    ],

    id: 'sm-sctargetcostedit',
    controller: 'sm-sctargetcost',
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
            id: 'sm-sctargetcostedit-form',
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
                    name: 'targetCost.id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '工号',
                    id: 'sm-sctargetcostedit-projno',
                    name: 'targetCost.projNo',
                    width: 220,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '工程名',
                    id: 'sm-sctargetcostedit-projname',
                    name: 'targetCost.projName',
                    width: 300,
                }, {
                    xtype: 'textfield',
                    name: 'targetCost.deptName',
                    fieldLabel: '部门',
                    id: 'sm-sctargetcostedit-deptname',
                    width: 220
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
                    id: 'sm-sctargetcostedit-amount',
                    name: 'targetCost.amount',
                    fieldLabel: '总金额',
                    width: 220,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '已分配',
                    id: 'sm-sctargetcostedit-distribute',
                    width: 300,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '余额',
                    id: 'sm-sctargetcostedit-remain',
                    width: 220,
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
                id: 'sm-sctargetcostsplit-add',
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
                id: 'sm-sctargetcostedit-detail',
                store: smScTargetCostSplitStore = Ext.create('iFlat.store.sm.TargetCostSplit'),
                border: true,
                columnLines: true,
                plugins: [
                    smScTargetCostSplitRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'sm-sctargetcostsplit-edit',
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
                    header: '工程名',
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
                    id: 'sm-sctargetcost-delete',
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