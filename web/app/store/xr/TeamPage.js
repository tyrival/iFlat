Ext.define('iFlat.storexr.TeamPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.Team',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageTeam.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});