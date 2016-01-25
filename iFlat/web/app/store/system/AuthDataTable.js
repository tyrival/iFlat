Ext.define('iFlat.store.system.AuthDataTable', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.system.AuthDataTable',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'system_listTableViewByModule.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        },
        extraParams: {
            'tableView.nameSpace': '',
            'tableView.moduleName': '',
        }
    },
});