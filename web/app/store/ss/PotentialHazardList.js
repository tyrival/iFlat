Ext.define('iFlat.store.ss.PotentialHazardList', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.ss.PotentialHazard',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listPotentialHazard.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});