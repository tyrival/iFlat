Ext.define('iFlat.view.pam.YearWork', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-yearwork',
    xtype: 'pam-yearwork',

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'pam-yearwork',
    store: pamYearWorkStore = Ext.create('iFlat.store.pam.YearWork'),

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
                        pamYearWorkStore.getProxy().extraParams['yearWork.pbName'] = pbName;
                        pamYearWorkStore.reload();
                    } else {
                        Ext.getCmp('pam-yearwork-addplan').hide();
                        Ext.getCmp('pam-yearwork-addsum').hide();
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
            text: '新增计划',
            id: 'pam-yearwork-addplan',
            ui: 'orig-blue',
            handler: 'showYearWorkEdit',
        }, {
            text: '新增总结',
            id: 'pam-yearwork-addsum',
            ui: 'orig-blue',
            handler: 'showYearWorkEdit',
        }, '->', {
            text: '刷新',
            id: 'pam-yearwork-refresh',
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
        handler: 'showYearWorkEdit',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('yearWork.status') == '1';
        },
    }, {
        text: '提交',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '提交',
        align: 'center',
        iconCls: 'x-fa fa-arrow-up',
        handler: 'submitYearWork',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('yearWork.status') == '1';
        },
    }, {
        header: '年度',
        dataIndex: 'yearWork.year',
        formatter: 'date("Y")',
        flex: 1
    }, {
        header: '类型',
        dataIndex: 'yearWork.type',
        flex: 1
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteYearWork',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('yearWork.status') == '1';
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pamYearWorkStore,
        displayInfo: true,
    }

});