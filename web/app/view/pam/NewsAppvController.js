Ext.define('iFlat.view.pam.NewsAppvController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-newsappv',

    refreshList: function(btn) {
        btn.up('grid').getStore().reload();
    },

    showNewsView: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-newsview');
        if(!win) {
            win = Ext.create('iFlat.view.pam.NewsView');
        }
        Ext.getCmp('pam-newsview-gosec').setHidden(record.get('news.status') != '待党群审核');
        var form = win.down('form[id=pam-newsview-form]');
        form.loadRecord(record);
        win.show();
    },
})