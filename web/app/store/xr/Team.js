Ext.define('iFlat.store.xr.Team', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.xr.Team',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'xr_listTeam.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});