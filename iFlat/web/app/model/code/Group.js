Ext.define('iFlat.model.code.Group', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'deptName', mapping: 'deptName', type: 'string'},
        {name: 'teamName', mapping: 'teamName', type: 'string'},
        {name: 'groupName', mapping: 'groupName', type: 'string'},
    ]
});