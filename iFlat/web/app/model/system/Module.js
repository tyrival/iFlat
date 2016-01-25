Ext.define('iFlat.model.system.Module', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'module.nodeId', mapping: 'nodeId', type: 'string'},
        {name: 'module.nodeName', mapping: 'nodeName', type: 'string'},
        {name: 'module.moduleName', mapping: 'moduleName', type: 'string'},
        {name: 'module.parentNodeId', mapping: 'parentNodeId', type: 'string'},
        {name: 'module.aweIcon', mapping: 'aweIcon', type: 'string'},
        {name: 'module.sequence', mapping: 'sequence', type: 'string'},
        {name: 'module.nameSpace', mapping: 'nameSpace', type: 'string'},
        {name: 'module.viewName', mapping: 'viewName', type: 'string'},
        {name: 'module.controller', mapping: 'controller', type: 'string'},
        {name: 'module.url', mapping: 'url', type: 'string'},
        {name: 'module.status', mapping: 'status', type: 'boolean'},
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'parentId', mapping: 'parentId', type: 'string'},
        {name: 'text', mapping: 'text', type: 'string'},
        {name: 'expanded', mapping: 'expanded', type: 'boolean'},
        {name: 'leaf', mapping: 'leaf', type: 'boolean'}
    ]
});