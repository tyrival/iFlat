Ext.define('iFlat.model.xr.SrStandardPrice', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srStandardPrice.id', mapping: 'id', type: 'string'},
        {name: 'srStandardPrice.code', mapping: 'code', type: 'string'},
        {name: 'srStandardPrice.category', mapping: 'category', type: 'string'},
        {name: 'srStandardPrice.content', mapping: 'content', type: 'string'},
        {name: 'srStandardPrice.specs', mapping: 'specs', type: 'string'},
        {name: 'srStandardPrice.degree', mapping: 'degree', type: 'number'},
        {name: 'srStandardPrice.comment', mapping: 'comment', type: 'string'},
        {name: 'srStandardPrice.unit', mapping: 'unit', type: 'string'},
        {name: 'srStandardPrice.quota', mapping: 'quota', type: 'number'},
        {name: 'srStandardPrice.price', mapping: 'price', type: 'number'},
        {name: 'srStandardPrice.isQuota', mapping: 'isQuota', type: 'boolean'},
    ]
});