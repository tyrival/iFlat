Ext.define('iFlat.model.system.OrganizationEdit', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'orgId', mapping: 'orgId', type: 'string'},
        {name: 'orgCode', mapping: 'orgCode', type: 'string'},
        {name: 'parentOrgId', mapping: 'parentOrgId', type: 'string'},
        {name: 'orgName', mapping: 'orgName', type: 'string'},
        {name: 'alias', mapping: 'alias', type: 'string'},
        {name: 'status', mapping: 'status', type: 'boolean'},
        {name: 'createTime', mapping: 'createTime', type: 'date'}
    ]
});