Ext.define('iFlat.model.system.ModuleEdit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'nodeId',  type: 'string'},
        {name: 'nodeName', type: 'string'},
        {name: 'moduleName', type: 'string'},
        {name: 'parentNodeId', type: 'string'},
        {name: 'aweIcon', type: 'string'},
        {name: 'sequence', type: 'string'},
        {name: 'nameSpace', type: 'string'},
        {name: 'viewName', type: 'string'},
        {name: 'controller', type: 'string'},
        {name: 'url', type: 'string'},
        {name: 'status', type: 'boolean'}
    ]
});