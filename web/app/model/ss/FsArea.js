Ext.define('iFlat.model.ss.FsArea', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'fsArea.id', mapping: 'id', type: 'string'},
        {name: 'fsArea.code', mapping: 'code', type: 'string'},
        {name: 'fsArea.dept', mapping: 'dept', type: 'string'},
        {name: 'fsArea.type', mapping: 'type', type: 'string'},
        {name: 'fsArea.area', mapping: 'area', type: 'string'},
    ]
});