Ext.define('iFlat.view.pam.Activist', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-activist',
    xtype: 'pam-activist',

    requires: [
        'iFlat.view.pam.ActivistController',
    ],

    controller: 'pam-activist',
    store: pamActivistStore = Ext.create('iFlat.store.pam.Activist'),
    id: 'pam-activist',

    plugins: [
        pamActivistRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'pam-activist-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateActivistRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    
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
                        pamActivistStore.getProxy().extraParams['activist.pbName'] = pbName;
                        pamActivistStore.reload();
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
            handler: 'addActivistRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '姓名',
        dataIndex: 'activist.name',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '性别',
        dataIndex: 'activist.sex',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '工作部门',
        dataIndex: 'activist.dept',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '出生年月',
        dataIndex: 'activist.birth',
        formatter: 'date("Y-m")',
        flex: 1,
        editor: {
            allowBlank: false,
            xtype: 'datefield',
            format: 'Y-m'
        }
    }, {
        header: '申请时间',
        dataIndex: 'activist.applyTime',
        formatter: 'date("Y-m-d")',
        flex: 1,
        editor: {
            allowBlank: false,
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: '列为积极分子时间',
        dataIndex: 'activist.becomeActivist',
        formatter: 'date("Y-m-d")',
        flex: 1,
        editor: {
            allowBlank: false,
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteActivist',
        editor: {
            xtype: 'label',
        }
    }],
});