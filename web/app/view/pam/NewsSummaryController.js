Ext.define('iFlat.view.pam.NewsSummaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-newssummary',

    refresh: function(btn) {
        Ext.getCmp('rpt-pam-newssummary-type').setValue(null);
        Ext.getCmp('rpt-pam-newssummary-from').setValue(null);
        Ext.getCmp('rpt-pam-newssummary-to').setValue(null);
        pamNewsSummaryStore.getProxy().extraParams['newsSummary.type'] = null;
        pamNewsSummaryStore.getProxy().extraParams['newsSummary.fromDate'] = null;
        pamNewsSummaryStore.getProxy().extraParams['newsSummary.toDate'] = null;
        btn.up('grid').getStore().reload();
    },

    search: function (btn) {
        var type = Ext.getCmp('rpt-pam-newssummary-type').getValue();
        switch (type) {
            case '党支部':
                type = 'partyBranch';
                break;
            case '作者':
                type = 'author';
                break;
            case '部门':
                type = 'dept';
                break;
        }
        if (Flat.util.isEmpty(type)) {
            Ext.Msg.show({
                title:'提示',
                message: '请选择一个类型。',
            });
        } else {
            var from = Ext.getCmp('rpt-pam-newssummary-from').getValue();
            var to = Ext.getCmp('rpt-pam-newssummary-to').getValue();
            pamNewsSummaryStore.getProxy().extraParams['newsSummary.type'] = type;
            pamNewsSummaryStore.getProxy().extraParams['newsSummary.fromDate'] = from;
            pamNewsSummaryStore.getProxy().extraParams['newsSummary.toDate'] = to;
            pamNewsSummaryStore.reload();
        }
    },

    exportBatch: function(btn) {
        var t = '新闻汇总';
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    }
})