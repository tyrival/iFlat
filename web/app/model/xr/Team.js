Ext.define('iFlat.model.xr.Team', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'xrTeam.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'xrTeam.dept', mapping: 'dept', type: 'string'},
        {name: 'xrTeam.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'xrTeam.team', mapping: 'team', type: 'string'},
        {name: 'xrTeam.type', mapping: 'type', type: 'string'},
    ]
});