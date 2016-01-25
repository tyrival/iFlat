Ext.define('iFlat.model.code.Worker', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'account', mapping: 'account', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'sex', mapping: 'sex', type: 'string'},
        {name: 'workType', mapping: 'workType', type: 'string'},
        {name: 'deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'deptName', mapping: 'deptName', type: 'string'},
        {name: 'teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'teamName', mapping: 'teamName', type: 'string'},
        {name: 'groupCode', mapping: 'groupCode', type: 'string'},
        {name: 'groupName', mapping: 'groupName', type: 'string'},
        {name: 'category', mapping: 'category', type: 'string'},
        {name: 'property', mapping: 'property', type: 'string'}
    ]
});