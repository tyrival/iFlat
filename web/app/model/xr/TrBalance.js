Ext.define('iFlat.model.xr.TrBalance', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'trBalance.id', mapping: 'id', type: 'string'},
        {name: 'trBalance.dept', mapping: 'dept', type: 'string'},
        {name: 'trBalance.amount', mapping: 'amount', type: 'number'},
        {name: 'trBalance.adjustment', mapping: 'adjustment', type: 'number'},
    ]
});