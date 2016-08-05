Ext.define('iFlat.view.pam.Committee', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-committee',
    xtype: 'pam-committee',

    requires: [
        'iFlat.view.pam.CommitteeController',
    ],

    controller: 'pam-committee',
    store: pamCommitteeStore = Ext.create('iFlat.store.pam.Committee'),
    id: 'pam-committee',
    
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
                        pamCommitteeStore.getProxy().extraParams['committee.pbName'] = pbName;
                        pamCommitteeStore.reload();
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
    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'showCommitteeEdit',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        text: '编辑',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showCommitteeEdit',
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
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteCommittee',
        editor: {
            xtype: 'label',
        }
    }],
});