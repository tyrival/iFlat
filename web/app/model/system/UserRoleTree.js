Ext.define('iFlat.model.system.UserRoleTree', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'text', mapping: 'text', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'parentId', mapping: 'parentId', type: 'string'},
        {name: 'expanded', mapping: 'expanded', type: 'boolean'},
        {name: 'leaf', mapping: 'leaf', type: 'boolean'},
        {name: 'iconCls', mapping: 'iconCls', type: 'string', defaultValue: 'fa-tag'},
    ]
});