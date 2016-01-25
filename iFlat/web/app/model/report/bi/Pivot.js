Ext.define('iFlat.model.report.bi.Pivot', {
    extend: 'Ext.data.Model',
    alias: 'model.pivot',

    fields: [
        {name: 'left', mapping: 'left', type: 'string'},
        {name: 'leftSub', mapping: 'leftSub', type: 'string'},
        {name: 'top', mapping: 'top', type: 'string'},
        {
            name: 'value',
            mapping: function (data) {
                return data.value.toFixed(2);
            },
            type: 'number'
        },
    ]
})