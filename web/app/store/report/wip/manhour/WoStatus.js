Ext.define('iFlat.store.report.wip.manhour.WoStatus', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.wip.manhour.WoStatus',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listWoStatus.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});