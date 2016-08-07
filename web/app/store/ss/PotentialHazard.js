Ext.define('iFlat.store.ss.PotentialHazard', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.ss.PotentialHazard',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPagePotentialHazard.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});