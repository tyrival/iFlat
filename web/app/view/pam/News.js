Ext.define('iFlat.view.pam.News', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-news',
    xtype: 'pam-news',
    
    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'pam-news',
    store: pamNewsStore = Ext.create('iFlat.store.pam.News', {
        proxy: {
            extraParams: {
                'news.submitDept': Ext.getCmp('global-panel').getViewModel().get('user')['porgName']
            }
        }
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'pam-news-add',
            ui: 'orig-blue',
            handler: 'showNewsEdit',
        }, '->', {
            text: '刷新',
            id: 'pam-news-refresh',
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
        handler: 'showNewsEdit',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('news.isSubmit') == '1';
        },
    }, {
        text: '提交',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '提交',
        align: 'center',
        iconCls: 'x-fa fa-arrow-up',
        handler: 'submitNews',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('news.isSubmit') == '1';
        },
    }, {
        header: '分类',
        dataIndex: 'news.type',
    }, {
        header: '标题',
        dataIndex: 'news.title',
        flex: 1
    }, {
        header: '正文',
        dataIndex: 'news.content',
        flex: 1
    }, {
        text: '附件',
        dataIndex: 'news.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '作者',
        dataIndex: 'news.author',
    }, {
        header: '提交时间',
        dataIndex: 'news.submitTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '采用',
        dataIndex: 'news.isAdopt',
        renderer: function(v) {
            if (v == "1") {
                return "是";
            } else {
                return "";
            }
        },
    }, {
        text: '删除',
        id: 'pam-news-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteNews',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('news.isSubmit') == '1';
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pamNewsStore,
        displayInfo: true,
    }

});