Ext.define('iFlat.store.system.TableViewEdit', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.system.TableViewEdit',
    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: 'system_listTableViewOfModule.action',
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