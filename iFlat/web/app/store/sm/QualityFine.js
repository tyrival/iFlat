Ext.define('iFlat.store.sm.QualityFine', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.sm.QualityFine',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'sm_listPageQualityFineVo.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});