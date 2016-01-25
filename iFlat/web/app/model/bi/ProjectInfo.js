Ext.define('iFlat.model.bi.ProjectInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projectInfo.projNo', mapping: 'projNo', type: 'string'},
        {name: 'projectInfo.code', mapping: 'code', type: 'string'},
        {name: 'projectInfo.name', mapping: 'name', type: 'string'},
        {name: 'projectInfo.shortName', mapping: 'shortName', type: 'string'},
        {name: 'projectInfo.plannedPlace', mapping: 'plannedPlace', type: 'string'},
        {name: 'projectInfo.actualPlace', mapping: 'actualPlace', type: 'string'},
        {name: 'projectInfo.materialPct', mapping: 'materialPct', type: 'number', defaultValue: 65 },
        {name: 'projectInfo.manufacturingPct', mapping: 'manufacturingPct', type: 'number', defaultValue: 20 },
        {name: 'projectInfo.auxiliaryPct', mapping: 'auxiliaryPct', type: 'number', defaultValue: 10 },
        {name: 'projectInfo.owner', mapping: 'owner', type: 'string'},
        {name: 'projectInfo.surveyor', mapping: 'surveyor', type: 'string'},
        {name: 'projectInfo.deliveryDate', mapping: 'deliveryDate', type: 'date'},
        {name: 'projectInfo.amount', mapping: 'amount', type: 'number'},
        {name: 'projectInfo.currency', mapping: 'currency', type: 'string'},
        {name: 'projectInfo.contractRate', mapping: 'contractRate', type: 'number'},
        {name: 'projectInfo.usd', mapping: 'usd', type: 'number'},
        {name: 'projectInfo.actualRate', mapping: 'actualRate', type: 'number'},
        {name: 'projectInfo.cny', mapping: 'cny', type: 'number'},
        {name: 'projectInfo.usdAdd', mapping: 'usdAdd', type: 'number'},
        {name: 'projectInfo.cnyAdd', mapping: 'cnyAdd', type: 'number'},
        {name: 'projectInfo.commissionPct', mapping: 'commissionPct', type: 'number'},
        {name: 'projectInfo.commencePln', mapping: 'commencePln', type: 'date',},
        {name: 'projectInfo.commenceAct', mapping: 'commenceAct', type: 'date',},
        {name: 'projectInfo.shipwayPln', mapping: 'shipwayPln', type: 'date'},
        {name: 'projectInfo.shipwayAct', mapping: 'shipwayAct', type: 'date'},
        {name: 'projectInfo.launchPln', mapping: 'launchPln', type: 'date'},
        {name: 'projectInfo.launchAct', mapping: 'launchAct', type: 'date'},
        {name: 'projectInfo.seaTrialPln', mapping: 'seaTrialPln', type: 'date'},
        {name: 'projectInfo.seaTrialAct', mapping: 'seaTrialAct', type: 'date'},
        {name: 'projectInfo.deliveryPln', mapping: 'deliveryPln', type: 'date'},
        {name: 'projectInfo.deliveryAct', mapping: 'deliveryAct', type: 'date'},
        {name: 'projectInfo.blockPrdPln', mapping: 'blockPrdPln', type: 'number'},
        {name: 'projectInfo.blockPrdAct', mapping: 'blockPrdAct', type: 'number'},
        {name: 'projectInfo.shipwayPrdPln', mapping: 'shipwayPrdPln', type: 'number'},
        {name: 'projectInfo.shipwayPrdAct', mapping: 'shipwayPrdAct', type: 'number'},
        {name: 'projectInfo.dockPrdPln', mapping: 'dockPrdPln', type: 'number'},
        {name: 'projectInfo.dockPrdAct', mapping: 'dockPrdAct', type: 'number'},
        {name: 'projectInfo.buildPrdPln', mapping: 'buildPrdPln', type: 'number'},
        {name: 'projectInfo.buildPrdAct', mapping: 'buildPrdAct', type: 'number'},
        {name: 'projectInfo.analyseDate', mapping: 'analyseDate', type: 'date'},
    ]
});