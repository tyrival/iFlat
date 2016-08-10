Ext.define('iFlat.store.ss.VrCodeRiskLvl', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    model: 'iFlat.model.ss.VrCodeRiskLvl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'ss_listVrCodeRiskLvl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});