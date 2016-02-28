Ext.define('iFlat.model.report.mm.PaintMRP', {
    extend: 'Ext.data.Model',
    alias: 'model.rpt-mm-paintMRP',

    fields: [
        {name: 'projNo', mapping: 'projNo', type: 'string'},
        {name: 'code', mapping: 'code', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'description', mapping: 'description', type: 'string'},
        {name: 'unit', mapping: 'unit', type: 'string'},
        {
            name: 'demand',
            mapping: function (data) {
                return data['demand'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'hasRequest',
            mapping: function (data) {
                return data['hasRequest'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'carryOver',
            mapping: function (data) {
                return data['carryOver'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'delivery',
            mapping: function (data) {
                return data['delivery'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'rest',
            mapping: function (data) {
                return data['rest'].toFixed(2);
            },
            type: 'number'
        }
    ]
})