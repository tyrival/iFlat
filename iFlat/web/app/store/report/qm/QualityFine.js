Ext.define('iFlat.store.report.qm.QualityFine', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.qm.QualityFine',

    pageSize: 0,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'qm_listQualityFineVo.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});