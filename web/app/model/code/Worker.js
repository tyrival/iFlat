Ext.define('iFlat.model.code.Worker', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'worker.id', mapping: 'id', type: 'string'},
        {name: 'worker.account', mapping: 'account', type: 'string'},
        {name: 'worker.name', mapping: 'name', type: 'string'},
        {name: 'worker.fullName', mapping: 'fullName', type: 'string'},
        {name: 'worker.sex', mapping: 'sex', type: 'string'},
        {name: 'worker.workType', mapping: 'workType', type: 'string'},
        {name: 'worker.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'worker.deptName', mapping: 'deptName', type: 'string'},
        {name: 'worker.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'worker.teamName', mapping: 'teamName', type: 'string'},
        {name: 'worker.groupCode', mapping: 'groupCode', type: 'string'},
        {name: 'worker.groupName', mapping: 'groupName', type: 'string'},
        {name: 'worker.category', mapping: 'category', type: 'string'},
        {name: 'worker.property', mapping: 'property', type: 'string'}
    ]
});