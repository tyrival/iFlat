Ext.define('iFlat.model.system.TableViewEdit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tableView.tvId', mapping: 'tvId', type: 'string'},
        {name: 'tableView.nameSpace', mapping: 'nameSpace', type: 'string'},
        {name: 'tableView.moduleName', mapping: 'moduleName', type: 'string'},
        {name: 'tableView.dbInstance', mapping: 'dbInstance', type: 'string'},
        {name: 'tableView.dbName', mapping: 'dbName', type: 'string'},
        {name: 'tableView.name', mapping: 'name', type: 'string'},
        {name: 'tableView.description', mapping: 'description', type: 'string'}
    ],
});