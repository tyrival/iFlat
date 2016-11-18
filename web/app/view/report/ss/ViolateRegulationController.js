Ext.define('iFlat.view.report.ss.ViolateRegulationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-violateregulation',

    refresh: function() {

        Ext.getCmp('rpt-ss-violateregulation-from').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-to').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-risklvl').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-dept').setValue('');
        Ext.getCmp('rpt-ss-violateregulation-person').setValue('');
        rptSsViolateRegulationStore.removeAll();
    },

    summaryRenderer: function(value, summaryData, dataIndex) {
        if (dataIndex == 'violateRegulation.date') {
            value = '合计';
        }
        if (dataIndex == 'violateRegulation.time') {
            value = value + '条';
        }
        return '<span style="font-size:15px;font-weight:bold">' + value + '</span>';
    },

    resetFilter: function () {
        Ext.getCmp('rpt-ss-violateregulation-from').reset();
        Ext.getCmp('rpt-ss-violateregulation-to').reset();
        Ext.getCmp('rpt-ss-violateregulation-risklvl').reset();
        Ext.getCmp('rpt-ss-violateregulation-dept').reset();
        Ext.getCmp('rpt-ss-violateregulation-content').reset();
        Ext.getCmp('rpt-ss-violateregulation-person').reset();
        Ext.getCmp('rpt-ss-violateregulation-profmgr').reset();
        Ext.getCmp('rpt-ss-violateregulation-projmgr').reset();
        Ext.getCmp('rpt-ss-violateregulation-workmgr').reset();
        Ext.getCmp('rpt-ss-violateregulation-busi').reset();
        Ext.getCmp('rpt-ss-violateregulation-team').reset();
        Ext.getCmp('rpt-ss-violateregulation-projname').reset();
        Ext.getCmp('rpt-ss-violateregulation-issuer-search').reset();
    },

    search: function(btn) {

        var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
        if (org == '安环保卫部') {
            Ext.getCmp('rpt-ss-violateregulation-issuer').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulation-creator').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulation-amount').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulation-issuer-search').setHidden(false);
        }

        var from = Ext.getCmp('rpt-ss-violateregulation-from').getValue();
        var to = Ext.getCmp('rpt-ss-violateregulation-to').getValue();
        var risklvl = Ext.getCmp('rpt-ss-violateregulation-risklvl').getValue();
        var dept = Ext.getCmp('rpt-ss-violateregulation-dept').getValue();
        var person = Ext.getCmp('rpt-ss-violateregulation-person').getValue();
        var content = Ext.getCmp('rpt-ss-violateregulation-content').getValue();
        var profmgr = Ext.getCmp('rpt-ss-violateregulation-profmgr').getValue();
        var projmgr = Ext.getCmp('rpt-ss-violateregulation-projmgr').getValue();
        var workmgr = Ext.getCmp('rpt-ss-violateregulation-workmgr').getValue();
        var busi = Ext.getCmp('rpt-ss-violateregulation-busi').getValue();
        var team = Ext.getCmp('rpt-ss-violateregulation-team').getValue();
        var projname = Ext.getCmp('rpt-ss-violateregulation-projname').getValue();
        var issuer = Ext.getCmp('rpt-ss-violateregulation-issuer-search').getValue();

        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.riskLvl'] = risklvl;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.dept'] = dept;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.fromDate'] = from;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.toDate'] = to;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.personName'] = person;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.content'] = content;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.profMgr'] = profmgr;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.projMgr'] = projmgr;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.workMgr'] = workmgr;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.busiDivision'] = busi;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.team'] = team;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.projName'] = projname;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.issuer'] = issuer;
        rptSsViolateRegulationStore.reload();
    },

    showViolateRegulationInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-violateregulationinfo');
        if(!win) {
            win = Ext.create('iFlat.view.report.ss.ViolateRegulationInfo');
            var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
            if (org == '安环保卫部') {
                Ext.getCmp('rpt-ss-violateregulationinfo-issuer').setHidden(false);
                Ext.getCmp('rpt-ss-violateregulationinfo-amount').setHidden(false);
            }
        }

        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-violateregulationinfo-att').show();
            Ext.getCmp('ss-violateregulationinfo-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-violateregulationinfo-att').hide();
            Ext.getCmp('ss-violateregulationinfo-link').setHref('');
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-violateregulationinfo-att2').show();
            Ext.getCmp('ss-violateregulationinfo-link2').setHref(newValue);
        } else {
            Ext.getCmp('ss-violateregulationinfo-att2').hide();
            Ext.getCmp('ss-violateregulationinfo-link2').setHref('');
        }
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '违章',
            fileName: '违章.xls',
        })
    }
})