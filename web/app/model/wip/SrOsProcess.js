Ext.define('iFlat.model.wip.SrOsProcess', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srOsProcess.id', mapping: 'id', type: 'string'},
        {name: 'srOsProcess.pid', mapping: 'pid', type: 'string'},
        {name: 'srOsProcess.date', mapping: 'date', type: 'date'},
        {name: 'srOsProcess.description', mapping: 'description', type: 'string'},
        {name: 'srOsProcess.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srOsProcess.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srOsProcess.createTime', mapping: 'createTime', type: 'string'},
    ]
});