Ext.define('iFlat.model.wip.SrOsAssess', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srOsAssess.id', mapping: 'id', type: 'string'},
        {name: 'srOsAssess.pid', mapping: 'pid', type: 'string'},
        {name: 'srOsAssess.description', mapping: 'description', type: 'string'},
        {name: 'srOsAssess.fineAmount', mapping: 'fineAmount', type: 'number'},
        {name: 'srOsAssess.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srOsAssess.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srOsAssess.creatorRole', mapping: 'creatorRole', type: 'string'},
        {name: 'srOsAssess.createTime', mapping: 'createTime', type: 'date'},
    ]
});