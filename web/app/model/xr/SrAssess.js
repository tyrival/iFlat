Ext.define('iFlat.model.xr.SrAssess', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srAssess.id', mapping: 'id', type: 'string'},
        {name: 'srAssess.settId', mapping: 'settId', type: 'string'},
        {name: 'srAssess.type', mapping: 'type', type: 'string'},
        {name: 'srAssess.score', mapping: 'score', defaultValue: 100, type: 'number'},
        {name: 'srAssess.description', mapping: 'description', type: 'string'},
        {name: 'srAssess.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srAssess.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srAssess.createTime', mapping: 'createTime', type: 'date'},
    ]
});