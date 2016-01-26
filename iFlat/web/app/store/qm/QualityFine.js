Ext.define('iFlat.store.qm.QualityFine', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.qm.QualityFine',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'qm_listPageQualityFineVo.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});