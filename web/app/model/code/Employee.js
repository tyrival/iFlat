Ext.define('iFlat.model.code.Employee', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'employee.account', mapping: 'account', type: 'string'},
        {name: 'employee.name', mapping: 'name', type: 'string'},
        {name: 'employee.fullName', mapping: 'fullName', type: 'string'},
        {name: 'employee.sex', mapping: 'sex', type: 'string'},
        {name: 'employee.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'employee.deptName', mapping: 'deptName', type: 'string'},
        {name: 'employee.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'employee.teamName', mapping: 'teamName', type: 'string'},
        {name: 'employee.groupCode', mapping: 'groupCode', type: 'string'},
        {name: 'employee.groupName', mapping: 'groupName', type: 'string'},
        {name: 'employee.category', mapping: 'category', type: 'string'},
        {name: 'employee.type', mapping: 'type', type: 'string'},
        {name: 'employee.property', mapping: 'property', type: 'string'},
        {name: 'employee.title', mapping: 'title', type: 'string'},
    ]
});