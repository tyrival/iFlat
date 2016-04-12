Ext.define('iFlat.model.report.bi.Project', {
    extend: 'Ext.data.Model',
    alias: 'model.rpt-bi-project',

    fields: [
        {name: 'rptProject.projNo', mapping: 'projNo', type: 'string'},
        {name: 'rptProject.category', mapping: 'category', type: 'string'},
        {name: 'rptProject.code', mapping: 'code', type: 'string'},
        {name: 'rptProject.name', mapping: 'name', type: 'string'},
        {name: 'rptProject.shortName', mapping: 'shortName', type: 'string'},
        {name: 'rptProject.status', mapping: 'status', type: 'string'},
        {name: 'rptProject.type', mapping: 'type', type: 'string'},
    ]
})