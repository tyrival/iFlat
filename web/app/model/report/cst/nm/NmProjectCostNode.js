Ext.define('iFlat.model.report.cst.nm.NmProjectCostNode', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'projNo', mapping: 'projNo', type: 'string'},
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'parentId', mapping: 'parentId', type: 'string'},
        {name: 'text', mapping: 'text', type: 'string'},
        {name: 'leaf', mapping: 'leaf', type: 'boolean'},
    ]
});