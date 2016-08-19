Ext.define('iFlat.model.xr.SrBalance', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srBalance.id', mapping: 'id', type: 'string'},
        {name: 'srBalance.dept', mapping: 'dept', type: 'string'},
        {name: 'srBalance.amount', mapping: 'amount', type: 'number'},
        {name: 'srBalance.adjustment', mapping: 'adjustment', type: 'number'},
    ]
});