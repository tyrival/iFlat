Ext.define('iFlat.model.pam.NewsSummary', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'newsSummary.type', mapping: 'type', type: 'string'},
        {name: 'newsSummary.name', mapping: 'name', type: 'string'},
        {name: 'newsSummary.total', mapping: 'total', type: 'number'},
        {name: 'newsSummary.adopt', mapping: 'adopt', type: 'number'},
        {name: 'newsSummary.fromDate', mapping: 'fromDate', type: 'date'},
        {name: 'newsSummary.toDate', mapping: 'toDate', type: 'date'},
        {name: 'newsSummary.dept', mapping: 'dept', type: 'string'},
        {name: 'newsSummary.pbName', mapping: 'pbName', type: 'string'},
    ]
});