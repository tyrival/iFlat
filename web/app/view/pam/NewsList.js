Ext.define('iFlat.view.pam.NewsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-newslist',
    xtype: 'pam-newslist',

    requires: [
        'Ext.grid.plugin.RowEditing'
    ],
    
    plugins: [{
        ptype: 'gridexporter',
    }, {
        ptype: 'rowediting',
        pluginId: 'pam-recorder-edit',
        clicksToMoveEditor: 1,
        autoCancel: true,
        listeners: {
            edit: 'updateNewsRecord',
        }
    }],

    controller: 'pam-newslist',
    store: pamNewsListStore = Ext.create('iFlat.store.pam.News'),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-pam-newslist-from',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '起始时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            xtype: 'datefield',
            id: 'rpt-pam-newslist-to',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '截止时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            text: '查询',
            ui: 'orig-blue',
            handler: 'search'
        }, '->', {
            text: '导出',
            handler: 'exportBatch'
        }, {
            text: '刷新',
            handler: 'refresh'
        }],
    }],

    columns: [{
        text: '查看',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '查看',
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
        header: '提交时间',
        dataIndex: 'news.submitTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '提交部门',
        dataIndex: 'news.submitDept',
    }, {
        header: '作者',
        dataIndex: 'news.author',
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
        header: '稿费',
        dataIndex: 'news.amount',
        editor: {
            xtype: 'combo',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            bind: {
                store: '{pamNewsAmount}',
            },
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pamNewsListStore,
        displayInfo: true,
    }

});