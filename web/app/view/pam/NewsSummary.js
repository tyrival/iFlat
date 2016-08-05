Ext.define('iFlat.view.pam.NewsSummary', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-newssummary',
    xtype: 'pam-newssummary',

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'pam-newssummary',
    store: pamNewsSummaryStore = Ext.create('iFlat.store.pam.NewsSummary'),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'combo',
            id: 'rpt-pam-newssummary-type',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            width: 150,
            fieldLabel: '类型',
            labelAlign: 'right',
            labelWidth: 40,
            bind: {
                store: '{pamNewsSummaryType}'
            }
        }, {
            xtype: 'datefield',
            id: 'rpt-pam-newssummary-from',
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
            id: 'rpt-pam-newssummary-to',
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
        header: '名称',
        dataIndex: 'newsSummary.name',
        flex: 1
    }, {
        header: '来稿总数',
        dataIndex: 'newsSummary.total',
        flex: 1
    }, {
        header: '采用',
        dataIndex: 'newsSummary.adopt',
        flex: 1
    }],

});