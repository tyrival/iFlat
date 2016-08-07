Ext.define('iFlat.model.ss.VrCode', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'vrCode.id', mapping: 'id', type: 'string'},
        {name: 'vrCode.riskLvl', mapping: 'riskLvl', type: 'string'},
        {name: 'vrCode.code', mapping: 'code', type: 'string'},
        {name: 'vrCode.description', mapping: 'description', type: 'string'},
        {name: 'vrCode.amount', mapping: 'amount', type: 'number'},
        {name: 'vrCode.score', mapping: 'score', type: 'number'},
    ]
});