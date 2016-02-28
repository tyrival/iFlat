Ext.define('iFlat.model.report.bi.Balance', {
    extend: 'Ext.data.Model',
    alias: 'model.balance',

    fields: [
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'estimate',
            mapping: function (data) {
                return data.estimate.toFixed(4);
            },
            type: 'number'},
        {name: 'target',
            mapping: function (data) {
                return data.target.toFixed(4);
            },
            type: 'number'},
        {name: 'actual',
            mapping: function (data) {
                return data.actual.toFixed(4);
            },
            type: 'number'},
        {name: 'difference',
            mapping: function (data) {
                return data.difference.toFixed(4);
            },
            type: 'number'},
        {name: 'diffPct',
            mapping: function (data) {
                return data.diffPct.toFixed(4) * 100;
            },
            type: 'number'},
    ]
})