Ext.define('iFlat.model.wip.SrOsVendor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srOsVendor.id', mapping: 'id', type: 'string'},
        {name: 'srOsVendor.code', mapping: 'code', type: 'string'},
        {name: 'srOsVendor.type', mapping: 'type', type: 'string'},
        {name: 'srOsVendor.name', mapping: 'name', type: 'string'},
        {name: 'srOsVendor.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srOsVendor.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srOsVendor.createTime', mapping: 'createTime', type: 'date'},
    ]
});