Ext.define('iFlat.view.sm.Temporary', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-temporary',
    xtype: 'sm-temporary',

    requires: [
        'iFlat.view.sm.TemporaryController',
    ],
    
    controller: 'sm-temporary',
    store: smTemporaryStore = Ext.create('iFlat.store.sm.Temporary'),
    id: 'sm-temporary',

    plugins: [
        smTemporaryRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-temporary-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateTemporaryRecord',
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
            id: 'sm-temporary-add',
            ui: 'orig-blue',
            handler: 'addTemporaryRecord',
        }, '->', {
            text: '刷新',
            id: 'sm-temporary-refresh',
            handler: 'refreshList',
        }],
    }],
    
    columns: [{
        header: '月份',
        width: 200,
        dataIndex: 'temporary.month',
        formatter: 'date("Y-m")',
        editor: {
            xtype: 'datefield',
            name: 'temporary.month',
            allowBlank: false,
            format: 'Y-m',
        }
    }, {
        header: '类型',
        dataIndex: 'temporary.type',
        editor: {
            xtype: 'textfield',
        }
    }, {
        header: '施工队',
        width: 350,
        dataIndex: 'temporary.team',
        editor: {
            xtype: 'combo',
            name: 'temporary.team',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            displayField: 'teamName',
            valueField: 'teamName',
            store: smTemporaryTeamStore = Ext.create('iFlat.store.code.Team', {
                proxy: {
                    extraParams: {
                        'team.type': '外包工'
                    }
                }
            }),
        }
    }, {
        header: '金额',
        dataIndex: 'temporary.amount',
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
        handler: 'deleteTemporary',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: smTemporaryStore,
        displayInfo: true,
    }

});