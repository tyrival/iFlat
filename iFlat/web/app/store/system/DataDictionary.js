Ext.define('iFlat.store.system.DataDictionary', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.DataDictionary',

    proxy: {
        type: 'ajax',
        url: 'system_listDataDictionary.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    },
    groupField: 'dataDictionary.tableName',
});