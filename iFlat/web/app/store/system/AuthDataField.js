Ext.define('iFlat.store.system.AuthDataField', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.system.AuthDataField',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'system_listFieldAuthority.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        },
        extraParams: {
            'authData.dbInstance': '',
            'authData.dbName': '',
            'authData.roleId': '',
            'authData.account': '',
            'authData.tableName': '',
            'authData.nameSpace': '',
            'authData.moduleName': '',
        }
    },
});