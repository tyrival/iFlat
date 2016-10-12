Ext.define('iFlat.view.pam.MonthlyWork', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-monthlywork',
    xtype: 'pam-monthlywork',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'pam-monthlywork',
    store: pamMonthlyWorkStore = Ext.create('iFlat.store.pam.MonthlyWork'),

    listeners: {
        render: function (grid, op) {
            Ext.Ajax.request({
                url: 'pam_listRecorderByUser.action',
                success: function (response, opts) {
                    var data = Ext.JSON.decode(response.responseText);
                    var info = data['list'];
                    var pbName;
                    if (!Flat.util.isEmpty(info) && info.length > 0) {
                        pbName = info[0]['pbName'];
                        pamMonthlyWorkStore.getProxy().extraParams['monthlyWork.pbName'] = pbName;
                        pamMonthlyWorkStore.reload();
                    } else {
                        Ext.getCmp('pam-monthlywork-add').hide();
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
            id: 'pam-monthlywork-add',
            ui: 'orig-blue',
            handler: 'showMonthlyWorkEdit',
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
        handler: 'showMonthlyWorkEdit',
        editor: {
            xtype: 'label',
        },
        /*isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('monthlyWork.status') == '1';
        },*/
    }, {
        text: '提交',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '提交',
        align: 'center',
        iconCls: 'x-fa fa-arrow-up',
        handler: 'submitMonthlyWork',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('monthlyWork.status') == '1';
        },
    }, {
        header: '年月',
        dataIndex: 'monthlyWork.month',
        formatter: 'date("Y-m")',
        flex: 1
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteMonthlyWork',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('monthlyWork.status') == '1';
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pamMonthlyWorkStore,
        displayInfo: true,
    }

});