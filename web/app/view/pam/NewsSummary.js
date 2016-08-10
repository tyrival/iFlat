Ext.define('iFlat.view.pam.NewsSummary', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-newssummary',
    xtype: 'pam-newssummary',

    plugins: [{
        ptype: 'gridexporter'
    }],

    controller: 'pam-newssummary',
    store: pamNewsSummaryStore = Ext.create('iFlat.store.pam.NewsSummary'),

    listeners: {
        afterrender: function (grid, opt) {
            var t = new Date();
            var str = Ext.Date.format(t, "Y-m-d");
            var arr = str.split('-');
            var y = parseInt(arr[0]);
            var m = parseInt(arr[1]);
            var d = parseInt(arr[2]);
            var fromY = y;
            var fromM = m;
            var fromD = 26;
            var toY = y;
            var toM = m;
            var toD = 25;
            if (d >= 26) {
                fromM = m;
                toM = m + 1;
            } else {
                toM = m;
                fromM = m - 1;
            }
            if (fromM == 0) {
                fromY = y - 1;
                fromM = 12;
            }
            if (toM == 13) {
                toY = y + 1;
                toM = 1;
            }
            var from = Ext.Date.parse(fromY + '-' + fromM + '-' + fromD, 'Y-n-d');
            var to = Ext.Date.parse(toY + '-' + toM + '-' + toD, 'Y-n-d');
            pamNewsSummaryStore.getProxy().extraParams['newsSummary.type'] = 'partyBranch';
            pamNewsSummaryStore.getProxy().extraParams['newsSummary.fromDate'] = from;
            pamNewsSummaryStore.getProxy().extraParams['newsSummary.toDate'] = to;
            pamNewsSummaryStore.reload()
        }
    },

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