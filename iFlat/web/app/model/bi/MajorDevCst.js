Ext.define('iFlat.model.bi.MajorDevCst', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'majorDevCst.id', mapping: 'id', type: 'string'},
        {name: 'majorDevCst.projNo', mapping: 'projNo', type: 'string'},
        {name: 'majorDevCst.type', mapping: 'type', type: 'string'},
        {name: 'majorDevCst.mainEngine', mapping: 'mainEngine', type: 'number'},
        {name: 'majorDevCst.genset', mapping: 'genset', type: 'number'},
        {name: 'majorDevCst.steeringGear', mapping: 'steeringGear', type: 'number'},
        {name: 'majorDevCst.ballastWaterTrtmt', mapping: 'ballastWaterTrtmt', type: 'number'},
        {name: 'majorDevCst.hatchCoverSys', mapping: 'hatchCoverSys', type: 'number'},
        {name: 'majorDevCst.distributionSys', mapping: 'distributionSys', type: 'number'},
        {name: 'majorDevCst.navigationSys', mapping: 'navigationSys', type: 'number'},
        {name: 'majorDevCst.boiler', mapping: 'boiler', type: 'number'},
        {name: 'majorDevCst.windlass', mapping: 'windlass', type: 'number'},
        {name: 'majorDevCst.crane', mapping: 'crane', type: 'number'},
        {name: 'majorDevCst.month', mapping: 'month', type: 'date'},
        {name: 'majorDevCst.version', mapping: 'version', type: 'number'},
    ]
});