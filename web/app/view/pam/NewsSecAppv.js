Ext.define('iFlat.view.pam.NewsSecAppv', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-newssecappv',
    xtype: 'pam-newssecappv',

    controller: 'pam-newsappv',
    store: pamNewsSecAppvStore = Ext.create('iFlat.store.pam.News', {
        proxy: {
            extraParams: {
                'news.status': '待保密办审核'
            }
        }
    }),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: ['->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        text: '审核',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '审核',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showNewsView',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '分类',
        dataIndex: 'news.type',
    }, {
        header: '标题',
        dataIndex: 'news.title',
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
        header: '提交时间',
        dataIndex: 'news.submitTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '提交部门',
        dataIndex: 'news.submitDept',
    }, {
        header: '作者',
        dataIndex: 'news.author',
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pamNewsSecAppvStore,
        displayInfo: true,
    }

});