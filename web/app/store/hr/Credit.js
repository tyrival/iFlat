Ext.define('iFlat.store.hr.Credit', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.hr.Credit',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'hr_listPageCredit.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});