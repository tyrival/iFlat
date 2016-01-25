Ext.define('iFlat.model.main.UserInfo', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'account', mapping: 'account', type: 'string'},
        {name: 'userName', mapping: 'userName', type: 'string'},
        {name: 'title', mapping: 'title', type: 'string'},
        {name: 'roleId', mapping: 'roleId', type: 'string'},
        {name: 'roleName', mapping: 'roleName', type: 'string'},
        {name: 'orgId', mapping: 'orgId', type: 'string'},
        {name: 'orgCode', mapping: 'orgCode', type: 'string'},
        {name: 'orgName', mapping: 'orgName', type: 'string'},
        {name: 'porgId', mapping: 'porgId', type: 'string'},
        {name: 'porgCode', mapping: 'porgCode', type: 'string'},
        {name: 'porgName', mapping: 'porgName', type: 'string'},
        {name: 'sequence', mapping: 'sequence', type: 'string'},
        {name: 'loginTime', mapping: 'loginTime', type: 'date'},
    ]
})