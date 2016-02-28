Ext.define('iFlat.store.code.Team', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.code.Team',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'code_listTeam.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});