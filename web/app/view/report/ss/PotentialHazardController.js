Ext.define('iFlat.view.report.ss.PotentialHazardController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-potentialhazard',

    refresh: function() {

        Ext.getCmp('rpt-ss-potentialhazard-from').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-to').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-risklvl').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-phtype').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-dept').setValue('');
        Ext.getCmp('rpt-ss-potentialhazard-person').setValue('');
        rptSsPotentialHazardStore.removeAll();
    },

    search: function(btn) {

        var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
        if (org == '安环保卫部') {
            Ext.getCmp('rpt-ss-potentialhazard-issuer').setHidden(false);
            Ext.getCmp('rpt-ss-potentialhazard-issuer-search').setHidden(false);
            Ext.getCmp('rpt-ss-potentialhazard-creator').setHidden(false);
            Ext.getCmp('rpt-ss-potentialhazard-amount').setHidden(false);
        }

        var from = Ext.getCmp('rpt-ss-potentialhazard-from').getValue();
        var to = Ext.getCmp('rpt-ss-potentialhazard-to').getValue();
        var risklvl = Ext.getCmp('rpt-ss-potentialhazard-risklvl').getValue();
        var phtype = Ext.getCmp('rpt-ss-potentialhazard-phtype').getValue();
        var dept = Ext.getCmp('rpt-ss-potentialhazard-dept').getValue();
        var person = Ext.getCmp('rpt-ss-potentialhazard-person').getValue();
        var content = Ext.getCmp('rpt-ss-potentialhazard-content').getValue();
        var profmgr = Ext.getCmp('rpt-ss-potentialhazard-profmgr').getValue();
        var projmgr = Ext.getCmp('rpt-ss-potentialhazard-projmgr').getValue();
        var workmgr = Ext.getCmp('rpt-ss-potentialhazard-workmgr').getValue();
        var busi = Ext.getCmp('rpt-ss-potentialhazard-busi').getValue();
        var team = Ext.getCmp('rpt-ss-potentialhazard-team').getValue();
        var projname = Ext.getCmp('rpt-ss-potentialhazard-projname').getValue();
        var issuer = Ext.getCmp('rpt-ss-potentialhazard-issuer-search').getValue();

        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.riskLvl'] = risklvl;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.dept'] = dept;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.phType'] = phtype;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.fromDate'] = from;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.toDate'] = to;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.personName'] = person;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.content'] = content;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.profMgr'] = profmgr;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.projMgr'] = projmgr;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.workMgr'] = workmgr;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.busiDivision'] = busi;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.team'] = team;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.projName'] = projname;
        rptSsPotentialHazardStore.getProxy().extraParams['potentialHazard.issuer'] = issuer;
        rptSsPotentialHazardStore.reload();
    },

    resetFilter: function () {
        Ext.getCmp('rpt-ss-potentialhazard-from').reset();
        Ext.getCmp('rpt-ss-potentialhazard-to').reset();
        Ext.getCmp('rpt-ss-potentialhazard-risklvl').reset();
        Ext.getCmp('rpt-ss-potentialhazard-phtype').reset();
        Ext.getCmp('rpt-ss-potentialhazard-dept').reset();
        Ext.getCmp('rpt-ss-potentialhazard-person').reset();
        Ext.getCmp('rpt-ss-potentialhazard-content').reset();
        Ext.getCmp('rpt-ss-potentialhazard-profmgr').reset();
        Ext.getCmp('rpt-ss-potentialhazard-projmgr').reset();
        Ext.getCmp('rpt-ss-potentialhazard-workmgr').reset();
        Ext.getCmp('rpt-ss-potentialhazard-busi').reset();
        Ext.getCmp('rpt-ss-potentialhazard-team').reset();
        Ext.getCmp('rpt-ss-potentialhazard-projname').reset();
        Ext.getCmp('rpt-ss-potentialhazard-issuer-search').reset();
    },

    summaryRenderer: function(value, summaryData, dataIndex) {
        if (dataIndex == 'potentialHazard.date') {
            value = '合计';
        }
        if (dataIndex == 'potentialHazard.time') {
            value = value + '条';
        }
        return '<span style="font-size:15px;font-weight:bold">' + value + '</span>';
    },

    showPotentialHazardInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-potentialhazardinfo');
        if(!win) {
            win = Ext.create('iFlat.view.report.ss.PotentialHazardInfo');
            var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
            if (org == '安环保卫部') {
                Ext.getCmp('rpt-ss-potentialhazardinfo-issuer').setHidden(false);
                Ext.getCmp('rpt-ss-potentialhazardinfo-amount').setHidden(false);
            }

        }

        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },
    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '隐患',
            fileName: '隐患.xls',
        })
    }
})