Ext.define('iFlat.view.pam.NewsListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-newslist',
    
    showNewsView: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-newsview');
        if(!win) {
            win = Ext.create('iFlat.view.pam.NewsView');
        }
        var form = win.down('form[id=pam-newsview-form]');
        form.loadRecord(record);
        win.show();
    },

    refresh: function(btn) {
        Ext.getCmp('rpt-pam-newslist-from').setValue(null);
        Ext.getCmp('rpt-pam-newslist-to').setValue(null);
        pamNewsListStore.getProxy().extraParams['news.fromDate'] = null;
        pamNewsListStore.getProxy().extraParams['news.toDate'] = null;
        btn.up('grid').getStore().reload();
    },

    search: function (btn) {
        var from = Ext.getCmp('rpt-pam-newslist-from').getValue();
        var to = Ext.getCmp('rpt-pam-newslist-to').getValue();
        pamNewsListStore.getProxy().extraParams['news.fromDate'] = from;
        pamNewsListStore.getProxy().extraParams['news.toDate'] = to;
        pamNewsListStore.reload();
    },
    
    exportBatch: function(btn) {
        var t = '新闻' + Ext.Date.format(new Date(), "Y-m-d");
        var arr = new Array();
        for (var i = 0; i < pamNewsListStore.getCount(); i++) {
            arr.push(pamNewsListStore.getAt(i).get('attachment'));
        }
        var param = Flat.util.arrayToUrlParamList(arr, 'downloadFileList', false, false);
        Ext.Ajax.request({
            params: {
                downloadFileList: param,
                downloadFileName: t,
            },
            url: 'pam_downloadBatch.action',
            success: function (response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        })
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    },

    updateNewsRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_saveNews.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamNewsListStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamNewsListStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

})