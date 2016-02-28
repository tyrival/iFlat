Ext.define('iFlat.model.report.cst.sb.SbProjectCost', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projNo', mapping: 'projNo', type: 'string'},
        {name: 'type', mapping: 'type', type: 'string'},
        {name: 'estimate',
            mapping: function (data) {
                return data.estimate.toFixed(2);
            },
            type: 'number' },
        {name: 'amount',
            mapping: function (data) {
                return data.amount.toFixed(2);
            },
            type: 'number' },
        {name: 'amountShort',
            mapping: function (data) {
                return (data.amount / 10000).toFixed(2);
            },
            type: 'number' },
        {name: 'grossProfit',
            mapping: function (data) {
                return data.grossProfit.toFixed(2);
            },
            type: 'number' },
        {name: 'profitMargin',
            mapping: function (data) {
                return data.profitMargin.toFixed(2) + '%';
            },
            type: 'string' },
    ]
});