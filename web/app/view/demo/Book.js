Ext.define('iFlat.view.demo.Book', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.demo-book',
    xtype: 'demo-book',

    controller: 'demo-book',

    store: demoBookStore = Ext.create('iFlat.store.demo.BookPage', {
        proxy: {
            extraParams: {
                'book.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'showBookEdit',
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
        handler: 'showBookEdit',
        editor: {
            xtype: 'label',
        },
    }, {
        header: 'id',
        dataIndex: 'book.id',
        hidden: true,
    }, {
        header: '书名',
        dataIndex: 'book.name',
        flex: true,
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteBook',
        editor: {
            xtype: 'label',
        },
    }],

    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: demoBookStore,
        displayInfo: true,
    }
});
