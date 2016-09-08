Ext.define('iFlat.view.report.wip.sr.SrOutsourceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-wip-sr-sroutsourceview',

    refresh: function() {

        Ext.getCmp('rpt-wip-sr-sroutsourceview-from').setValue(null);
        Ext.getCmp('rpt-wip-sr-sroutsourceview-to').setValue(null);
        rptWipSrOutsourceViewStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-wip-sr-sroutsourceview-from').getValue();
        var to = Ext.getCmp('rpt-wip-sr-sroutsourceview-to').getValue();

        if (Flat.util.isEmpty(from) || Flat.util.isEmpty(to)) {
            Ext.Msg.show({
                title:'提示',
                message: '请选择起止时间后查询。',
            });
        } else {
            rptWipSrOutsourceViewStore.getProxy().extraParams['srOutsourceView.fromDate'] = from;
            rptWipSrOutsourceViewStore.getProxy().extraParams['srOutsourceView.toDate'] = to;
            rptWipSrOutsourceViewStore.reload();
        }
    },

    columnRenderer: function(v) {
        return v == true ? '<span><i class="fa fa-check"></i></span>' : '';
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '修船委外业务清单',
            fileName: '修船委外业务清单.xls',
        })
    }
})