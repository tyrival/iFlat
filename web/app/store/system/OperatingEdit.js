Ext.define('iFlat.store.system.OperatingEdit', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.Operating',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'system_listOperatingOfModule.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
        extraParams: {
            'operating.nameSpace': '',
            'operating.moduleName': '',
        }
    },
});