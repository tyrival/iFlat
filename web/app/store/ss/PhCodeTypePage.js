Ext.define('iFlat.storess.PhCodeTypePage', {

    autoLoad: true,
    model: 'iFlat.model.ss.PhCodeType',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'ss_listPagePhCodeType.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});