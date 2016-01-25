Ext.define('iFlat.model.system.Organization', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'organization.orgId', mapping: 'orgId', type: 'string'},
        {name: 'organization.orgCode', mapping: 'orgCode', type: 'string'},
        {name: 'organization.parentOrgId', mapping: 'parentOrgId', type: 'string'},
        {name: 'organization.parentOrgName', mapping: 'parentOrgName', type: 'string'},
        {name: 'organization.orgName', mapping: 'orgName', type: 'string'},
        {name: 'organization.alias', mapping: 'alias', type: 'string'},
        {name: 'organization.status', mapping: 'status', type: 'boolean'},
        {name: 'organization.createTime', mapping: 'createTime', type: 'date'}
    ]
});