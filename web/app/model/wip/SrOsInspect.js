Ext.define('iFlat.model.wip.SrOsInspect', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srOsInspect.id', mapping: 'id', type: 'string'},
        {name: 'srOsInspect.pid', mapping: 'pid', type: 'string'},
        {name: 'srOsInspect.date', mapping: 'date', type: 'date'},
        {name: 'srOsInspect.result', mapping: 'result', type: 'string'},
        {name: 'srOsInspect.description', mapping: 'description', type: 'string'},
        {name: 'srOsInspect.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srOsInspect.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srOsInspect.createTime', mapping: 'createTime', type: 'date'},
    ]
});