Ext.define('iFlat.model.xr.SrProjectPrice', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srProjectPrice.id', mapping: 'id', type: 'string'},
        {name: 'srProjectPrice.projNo', mapping: 'projNo', type: 'string'},
        {name: 'srProjectPrice.projName', mapping: 'projName', type: 'string'},
        {name: 'srProjectPrice.code', mapping: 'code', type: 'string'},
        {name: 'srProjectPrice.category', mapping: 'category', type: 'string'},
        {name: 'srProjectPrice.unit', mapping: 'unit', type: 'string'},
        {name: 'srProjectPrice.price', mapping: 'price', type: 'number'},
        {name: 'srProjectPrice.attachment', mapping: 'attachment', type: 'string'},
        {name: 'srProjectPrice.comment', mapping: 'comment', type: 'string'},
        {name: 'srProjectPrice.isQuota', mapping: 'isQuota', type: 'boolean'},
        {name: 'srProjectPrice.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srProjectPrice.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srProjectPrice.createTime', mapping: 'createTime', type: 'date'},
    ]
});