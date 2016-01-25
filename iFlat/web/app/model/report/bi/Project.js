Ext.define('iFlat.model.report.bi.Project', {
    extend: 'Ext.data.Model',
    alias: 'model.rpt-bi-project',

    fields: [
        {name: 'projNo', mapping: 'projNo', type: 'string'},
        {name: 'category', mapping: 'category', type: 'string'},
        {name: 'code', mapping: 'code', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'shortName', mapping: 'shortName', type: 'string'},
        {name: 'status', mapping: 'status', type: 'string'},
    ]
})