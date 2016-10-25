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

    search: function(btn) {

        var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
        if (org == '安环保卫部') {
            Ext.getCmp('rpt-ss-violateregulation-issuer').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulationinfo-issuer').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulation-creator').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulation-amount').setHidden(false);
            Ext.getCmp('rpt-ss-violateregulationinfo-amount').setHidden(false);
        }

        var from = Ext.getCmp('rpt-ss-violateregulation-from').getValue();
        var to = Ext.getCmp('rpt-ss-violateregulation-to').getValue();
        var risklvl = Ext.getCmp('rpt-ss-violateregulation-risklvl').getValue();
        var dept = Ext.getCmp('rpt-ss-violateregulation-dept').getValue();
        var person = Ext.getCmp('rpt-ss-violateregulation-person').getValue();

        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.riskLvl'] = risklvl;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.dept'] = dept;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.fromDate'] = from;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.toDate'] = to;
        rptSsViolateRegulationStore.getProxy().extraParams['violateRegulation.personName'] = person;
        rptSsViolateRegulationStore.reload();
    },

    showViolateRegulationInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-violateregulationinfo');
        if(!win) {
            win = Ext.create('iFlat.view.report.ss.ViolateRegulationInfo');
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