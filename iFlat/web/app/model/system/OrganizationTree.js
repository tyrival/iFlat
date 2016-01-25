Ext.define('iFlat.model.system.OrganizationTree', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'orgId', mapping: 'orgId', type: 'string'},
        {name: 'orgCode', mapping: 'orgCode', type: 'string'},
        {name: 'parentOrgId', mapping: 'parentOrgId', type: 'string'},
        {name: 'parentOrgName', mapping: 'parentOrgName', type: 'string'},
        {name: 'orgName', mapping: 'orgName', type: 'string'},
        {name: 'alias', mapping: 'alias', type: 'string'},
        {name: 'status', mapping: 'status', type: 'boolean'},
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'parentId', mapping: 'parentId', type: 'string'},
        {name: 'text', mapping: 'text', type: 'string'},
        {name: 'expanded', mapping: 'expanded', type: 'boolean'},
        {name: 'leaf', mapping: 'leaf', type: 'boolean'}
    ]
});