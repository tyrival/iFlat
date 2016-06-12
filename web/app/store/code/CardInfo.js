Ext.define('iFlat.store.code.CardInfo', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.code.CardInfo',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'code_listCardInfo.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});