Ext.define('iFlat.view.pam.PartyGroup', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-partygroup',
    xtype: 'pam-partygroup',

    requires: [
        'iFlat.view.pam.PartyGroupController',
    ],

    controller: 'pam-partygroup',
    store: pamPartyGroupStore = Ext.create('iFlat.store.pam.PartyGroup'),

    listeners: {
        render: function (grid, op) {
            Ext.Ajax.request({
                url: 'pam_listRecorderByUser.action',
                success: function (response, opts) {
                    var data = Ext.JSON.decode(response.responseText);
                    var info = data['list'];
                    var pbName;
                    if (!Flat.util.isEmpty(info)) {
                        pbName = info[0]['pbName'];
                        pamPartyGroupStore.getProxy().extraParams['partyGroup.pbName'] = pbName;
                        pamPartyGroupStore.reload();
                    } else {
                        Ext.Msg.show({
                            title:'提示',
                            message: '您没有维护任何党支部信息的权限，请联系党群。',
                        });
                    }
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                }
            })
        }
    },

    plugins: [
        pamPartyGroupRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'pam-partyGroup-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updatePartyGroupRecord',
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
            handler: 'addPartyGroupRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '党小组名',
        dataIndex: 'partyGroup.name',
        flex: 1,
        editor: {
            allowBlank: true,
        }
    }, {
        header: '组长姓名',
        dataIndex: 'partyGroup.leader',
        flex: 1,
        editor: {
            allowBlank: true,
        }
    }, {
        header: '党员数',
        dataIndex: 'partyGroup.memberNum',
        width: 120,
        editor: {
            allowBlank: true,
            regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '所辖科室（班组）',
        dataIndex: 'partyGroup.group',
        flex: 1,
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
        handler: 'deletePartyGroup',
        editor: {
            xtype: 'label',
        }
    }],
});