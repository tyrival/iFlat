Ext.define('iFlat.view.sm.Subsidy', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-subsidy',
    xtype: 'sm-subsidy',

    requires: [
        'iFlat.view.sm.SubsidyController',
    ],
    
    controller: 'sm-subsidy',
    store: smSubsidyStore = Ext.create('iFlat.store.sm.Subsidy'),
    id: 'sm-subsidy',

    plugins: [
        smSubsidyRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-subsidy-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateSubsidyRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'sm-subsidy-add',
            ui: 'orig-blue',
            handler: 'addSubsidyRecord',
        }, '->', {
            text: '刷新',
            id: 'sm-subsidy-refresh',
            handler: 'refreshList',
        }],
    }],
    
    columns: [{
        header: '月份',
        width: 200,
        dataIndex: 'subsidy.month',
        formatter: 'date("Y-m")',
        editor: {
            xtype: 'datefield',
            name: 'subsidy.month',
            allowBlank: false,
            format: 'Y-m',
        }
    }, {
        header: '类型',
        dataIndex: 'subsidy.type',
        editor: {
            xtype: 'textfield',
        }
    }, {
        header: '施工队',
        width: 350,
        dataIndex: 'subsidy.team',
        editor: {
            xtype: 'combo',
            name: 'subsidy.team',
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            anyMatch: true,
            minChars: 0,
            displayField: 'teamName',
            valueField: 'teamName',
            store: smSubsidyTeamStore = Ext.create('iFlat.store.code.Team', {
                proxy: {
                    extraParams: {
                        'team.type': '外包工'
                    }
                }
            }),
        }
    }, {
        header: '金额',
        dataIndex: 'subsidy.amount',
        flex: true,
        editor: {
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSubsidy',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: smSubsidyStore,
        displayInfo: true,
    }

});