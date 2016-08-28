Ext.define('iFlat.model.xr.DockPeriod', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'dockPeriod.id', mapping: 'id', type: 'string'},
        {name: 'dockPeriod.projNo', mapping: 'projNo', type: 'string'},
        {name: 'dockPeriod.inDock', mapping: 'inDock', type: 'date'},
        {name: 'dockPeriod.outDock', mapping: 'outDock', type: 'date'},
        {name: 'dockPeriod.period', mapping: 'period', type: 'number'},
    ]
});