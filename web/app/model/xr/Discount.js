Ext.define('iFlat.model.xr.Discount', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'xrDiscount.id', mapping: 'id', type: 'string'},
        {name: 'xrDiscount.team', mapping: 'team', type: 'string'},
        {name: 'xrDiscount.rate', mapping: 'rate', type: 'number'},
    ]
});