Ext.define('iFlat.view.report.wip.sr.SrOutsourceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-wip-sr-sroutsource',

    refresh: function() {

        Ext.getCmp('rpt-wip-sr-sroutsource-status').setValue(null);
        Ext.getCmp('rpt-wip-sr-sroutsource-from').setValue(null);
        Ext.getCmp('rpt-wip-sr-sroutsource-to').setValue(null);
        rptWipSrOutsourceStore.removeAll();
    },

    search: function(btn) {
        var status = Ext.getCmp('rpt-wip-sr-sroutsource-status').getValue();
        var from = Ext.getCmp('rpt-wip-sr-sroutsource-from').getValue();
        var to = Ext.getCmp('rpt-wip-sr-sroutsource-to').getValue();

        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.status'] = status;
        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.fromDate'] = from;
        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.toDate'] = to;
        rptWipSrOutsourceStore.reload();
    },

    columnRenderer: function(v) {
        return v == true ? '<span><i class="fa fa-check"></i></span>' : '';
    },

    renderAtt: function(v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a target='_blank' href='" + v + "'>下载</a>";
        }
    },

    showAssess: function (grid, rowIndex, colIndex, item, e, record, row) {
        var id = record.get('srOutsource.id');
        var win = Ext.getCmp('wip-srosassess');
        if (!win) {
            win = Ext.create('iFlat.view.wip.SrOsAssess');
        }
        wipSrOsAssessStore.getProxy().extraParams['srOsAssess.pid'] = id;
        wipSrOsAssessStore.reload();
        win.show();
    },

    showBidding: function (grid, rowIndex, colIndex, item, e, record, row) {
        var id = record.get('srOutsource.id');
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-srosbiddingview');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOsBiddingView');
            }
            wipSrOsBiddingViewStore.getProxy().extraParams['srOsBidding.pid'] = id;
            wipSrOsBiddingViewStore.reload();
            win.show();
        }
    },

    showProcess: function (grid, rowIndex, colIndex, item, e, record, row) {
        var id = record.get('srOutsource.id');
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-srosprocessview');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOsProcessView');
            }
            wipSrOsProcessViewStore.getProxy().extraParams['srOsProcess.pid'] = id;
            wipSrOsProcessViewStore.reload();
            win.show();
        }
    },

    showDetail: function (grid, rowIndex, colIndex, item, e, record, row) {
        var id = record.get('srOutsource.id');
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-sroutsourcedetlview');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOutsourceDetlView');
            }
            wipSrOutsourceDetlViewStore.getProxy().extraParams['srOutsourceDetl.pid'] = id;
            wipSrOutsourceDetlViewStore.reload();
            win.show();
        }
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '修船委外业务清单',
            fileName: '修船委外业务清单.xls',
        })
    }
})