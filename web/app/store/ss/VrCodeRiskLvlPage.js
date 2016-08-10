Ext.define('iFlat.storess.VrCodeRiskLvlPage', {

    autoLoad: true,
    model: 'iFlat.model.ss.VrCodeRiskLvl',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPageVrCodeRiskLvl.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});