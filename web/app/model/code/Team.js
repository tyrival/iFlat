Ext.define('iFlat.model.code.Team', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'team.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'team.deptName', mapping: 'deptName', type: 'string'},
        {name: 'team.teamName', mapping: 'teamName', type: 'string'},
        {name: 'team.teamFullName', mapping: 'teamFullName', type: 'string'},
        {name: 'team.type', mapping: 'type', type: 'string'},
    ]
});