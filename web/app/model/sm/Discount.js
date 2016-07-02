Ext.define('iFlat.model.sm.Discount', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'discount.id', mapping: 'id', type: 'string'},
        {name: 'discount.team', mapping: 'team', type: 'string'},
        {name: 'discount.rate', mapping: 'rate', type: 'number'},
    ]
});