Ext.define('iFlat.model.report.mm.MatQuato', {
    extend: 'Ext.data.Model',
    alias: 'model.rpt-mm-matQuato',

    fields: [
        {name: 'projNo', mapping: 'projNo', type: 'string'},
        {name: 'category', mapping: 'category', type: 'string'},
        {name: 'unit', mapping: 'unit', type: 'string'},
        {
            name: 'palletQuato',
            mapping: function (data) {
                return data['palletQuato'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'additionalQuato',
            mapping: function (data) {
                return data['additionalQuato'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'design',
            mapping: function (data) {
                return data['design'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'material',
            mapping: function (data) {
                return data['material'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'construction',
            mapping: function (data) {
                return data['construction'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'shipowner',
            mapping: function (data) {
                return data['shipowner'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'outSourcing',
            mapping: function (data) {
                return data['outSourcing'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'lack',
            mapping: function (data) {
                return data['lack'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'subtotal',
            mapping: function (data) {
                return data['subtotal'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'totalQuato',
            mapping: function (data) {
                return data['totalQuato'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'requisition',
            mapping: function (data) {
                return data['requisition'].toFixed(2);
            },
            type: 'number'
        },{
            name: 'progress',
            mapping: function (data) {
                return data['progress'].toFixed(2);
            },
            type: 'number'
        },
    ]
})