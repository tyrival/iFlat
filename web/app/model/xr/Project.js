Ext.define('iFlat.model.xr.Project', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'xrProject.projNo', mapping: 'projNo', type: 'string'},
        {name: 'xrProject.category', mapping: 'category', type: 'string'},
        {name: 'xrProject.code', mapping: 'code', type: 'string'},
        {name: 'xrProject.name', mapping: 'name', type: 'string'},
        {name: 'xrProject.shortName', mapping: 'shortName', type: 'string'},
        {name: 'xrProject.status', mapping: 'status', type: 'string'},
        {name: 'xrProject.type', mapping: 'type', type: 'string'},
        {name: 'xrProject.completeTime', mapping: 'completeTime', type: 'date'},
        {name: 'xrProject.dockPeriod', mapping: 'dockPeriod', type: 'number'},
    ]
});