Ext.define('iFlat.view.pam.PartyBranch', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-partyBranch',
    xtype: 'pam-partyBranch',

    requires: [
        'iFlat.view.pam.PartyBranchController',
    ],

    controller: 'pam-partybranch',
    store: pamPartyBranchStore = Ext.create('iFlat.store.pam.PartyBranch', {
        autoLoad: true,
    }),
    id: 'pam-partyBranch',

    plugins: [
        pamPartyBranchRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'pam-partyBranch-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updatePartyBranchRecord',
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
            ui: 'orig-blue',
            handler: 'addPartyBranchRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '党支部',
        dataIndex: 'partyBranch.name',
        width: 200,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '部门',
        dataIndex: 'partyBranch.dept',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '说明',
        dataIndex: 'partyBranch.description',
        width: 120,
        editor: {
            allowBlank: true,
        }
    }, {
        header: '排序',
        dataIndex: 'partyBranch.sequence',
        width: 100,
        editor: {
            allowBlank: true,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deletePartyBranch',
        editor: {
            xtype: 'label',
        }
    }],
});