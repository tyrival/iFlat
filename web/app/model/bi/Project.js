Ext.define('iFlat.model.bi.Project', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'project.id', mapping: 'id', type: 'string'},
        {name: 'project.projNo', mapping: 'projNo', type: 'string'},
        {name: 'project.code', mapping: 'code', type: 'string'},
        {name: 'project.name', mapping: 'name', type: 'string'},
        {name: 'project.shortName', mapping: 'shortName', type: 'string'},
        {name: 'project.plannedPlace', mapping: 'plannedPlace', type: 'string'},
        {name: 'project.actualPlace', mapping: 'actualPlace', type: 'string'},
        {name: 'project.materialPct', mapping: 'materialPct', type: 'number', defaultValue: 65 },
        {name: 'project.manufacturingPct', mapping: 'manufacturingPct', type: 'number', defaultValue: 20 },
        {name: 'project.auxiliaryPct', mapping: 'auxiliaryPct', type: 'number', defaultValue: 10 },
        {name: 'project.analyseDate', mapping: 'analyseDate', type: 'date' },
    ]
});