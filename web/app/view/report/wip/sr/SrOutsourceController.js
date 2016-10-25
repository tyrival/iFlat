Ext.define('iFlat.view.report.wip.sr.SrOutsourceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-wip-sr-sroutsource',

    showComment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'wip_listSrOutsourceComment.action',
                extraParams: {
                    'srOutsource.id': record.get('srOutsource.id')
                }
            }
        }))
        win.show();
    },

    showInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('rpt-wip-sr-sroutsourceinfo');
        if(!win) {
            win = Ext.create('iFlat.view.report.wip.sr.SrOutsourceInfo');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('rpt-wip-sr-sroutsourceinfo-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('rpt-wip-sr-sroutsourceinfo-down2');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange3: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('rpt-wip-sr-sroutsourceinfo-down3');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange4: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('rpt-wip-sr-sroutsourceinfo-down4');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange5: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('rpt-wip-sr-sroutsourceinfo-down5');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    loadCheckbox: function (tf, newV, oldV) {
        tf.nextSibling('checkbox').setValue(newV);
    },

    refresh: function() {

        Ext.getCmp('rpt-wip-sr-sroutsource-projno').setValue(null);
        Ext.getCmp('rpt-wip-sr-sroutsource-status').setValue(null);
        Ext.getCmp('rpt-wip-sr-sroutsource-from').setValue(null);
        Ext.getCmp('rpt-wip-sr-sroutsource-to').setValue(null);
        rptWipSrOutsourceStore.removeAll();
    },

    search: function(btn) {
        var role = Ext.getCmp('global-panel').getViewModel().get('user')['roleName'];
        if (role == '修船外协员' || role == '修船外协科科长' || role == '修船事业部部长') {
            Ext.getCmp('rpt-wip-sr-sroutsource-info').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-printreq').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-printappr').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-biddinginfo').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-biddinginfo2').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-biddingdetl').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-cont').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-cont2').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-sett').setHidden(false);
            Ext.getCmp('rpt-wip-sr-sroutsource-sett2').setHidden(false);
        }
        if (role == '修船总管' || role == '修船主修') {
            Ext.getCmp('rpt-wip-sr-sroutsource-printreq').setHidden(false);
        }

        var projno = Ext.getCmp('rpt-wip-sr-sroutsource-projno').getValue();
        var status = Ext.getCmp('rpt-wip-sr-sroutsource-status').getValue();
        var from = Ext.getCmp('rpt-wip-sr-sroutsource-from').getValue();
        var to = Ext.getCmp('rpt-wip-sr-sroutsource-to').getValue();

        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.status'] = status;
        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.fromDate'] = from;
        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.toDate'] = to;
        rptWipSrOutsourceStore.getProxy().extraParams['srOutsource.projNo'] = projno;
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