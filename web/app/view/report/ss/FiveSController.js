Ext.define('iFlat.view.report.ss.FiveSController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-ss-fives',

    refresh: function() {

        Ext.getCmp('rpt-ss-fives-from').setValue('');
        Ext.getCmp('rpt-ss-fives-to').setValue('');
        Ext.getCmp('rpt-ss-fives-fstype').setValue('');
        Ext.getCmp('rpt-ss-fives-belongdept').setValue('');
        Ext.getCmp('rpt-ss-fives-dept').setValue('');
        Ext.getCmp('rpt-ss-fives-person').setValue('');
        rptSsFiveSStore.removeAll();
    },

    search: function(btn) {

        var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
        if (org == '安环保卫部') {
            Ext.getCmp('rpt-ss-fives-issuer').setHidden(false);
            Ext.getCmp('rpt-ss-fives-creator').setHidden(false);
        }

        var from = Ext.getCmp('rpt-ss-fives-from').getValue();
        var to = Ext.getCmp('rpt-ss-fives-to').getValue();
        var fstype = Ext.getCmp('rpt-ss-fives-fstype').getValue();
        var belongdept = Ext.getCmp('rpt-ss-fives-belongdept').getValue();
        var dept = Ext.getCmp('rpt-ss-fives-dept').getValue();
        var person = Ext.getCmp('rpt-ss-fives-person').getValue();

        rptSsFiveSStore.getProxy().extraParams['fiveS.fsType'] = fstype;
        rptSsFiveSStore.getProxy().extraParams['fiveS.dept'] = dept;
        rptSsFiveSStore.getProxy().extraParams['fiveS.belongDept'] = belongdept;
        rptSsFiveSStore.getProxy().extraParams['fiveS.fromDate'] = from;
        rptSsFiveSStore.getProxy().extraParams['fiveS.toDate'] = to;
        rptSsFiveSStore.getProxy().extraParams['fiveS.personName'] = person;
        rptSsFiveSStore.reload();
    },


    resetFilter: function () {
        Ext.getCmp('rpt-ss-fives-from').reset();
        Ext.getCmp('rpt-ss-fives-to').reset();
        Ext.getCmp('rpt-ss-fives-fstype').reset();
        Ext.getCmp('rpt-ss-fives-belongdept').reset();
        Ext.getCmp('rpt-ss-fives-dept').reset();
        Ext.getCmp('rpt-ss-fives-person').reset();
    },

    showFiveSInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-fivesinfo');
        if(!win) {
            win = Ext.create('iFlat.view.report.ss.FiveSInfo');
            var org = Ext.getCmp('global-panel').getViewModel().get('user')['porgName'];
            if (org == '安环保卫部') {
                Ext.getCmp('rpt-ss-fivesinfo-issuer').setHidden(false);
            }

        }

        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-fivesinfo-att').show();
            Ext.getCmp('ss-fivesinfo-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-fivesinfo-att').hide();
            Ext.getCmp('ss-fivesinfo-link').setHref('');
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-fivesinfo-att2').show();
            Ext.getCmp('ss-fivesinfo-link2').setHref(newValue);
        } else {
            Ext.getCmp('ss-fivesinfo-att2').hide();
            Ext.getCmp('ss-fivesinfo-link2').setHref('');
        }
    },

    summaryRenderer: function(value, summaryData, dataIndex) {
        if (dataIndex == 'fiveS.date') {
            value = '合计';
        }
        if (dataIndex == 'fiveS.time') {
            value = value + '条';
        }
        return '<span style="font-size:15px;font-weight:bold">' + value + '</span>';
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '5S',
            fileName: '5S.xls',
        })
    }
})