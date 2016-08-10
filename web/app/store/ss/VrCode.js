Ext.define('iFlat.store.ss.VrCode', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.VrCode',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listVrCode.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});