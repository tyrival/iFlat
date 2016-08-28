Ext.define('iFlat.storexr.BenefitPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.Benefit',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageBenefit.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});