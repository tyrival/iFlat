Ext.define('iFlat.model.sm.SbRequest', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'sbRequest.id', mapping: 'id', type: 'string'},
        {name: 'sbRequest.projNo', mapping: 'projNo', type: 'string'},
        {name: 'sbRequest.projName', mapping: 'projName', type: 'string'},
        {name: 'sbRequest.team', mapping: 'team', type: 'string'},
        {name: 'sbRequest.status', mapping: 'status', type: 'number'},
    ]
});