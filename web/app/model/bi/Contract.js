Ext.define('iFlat.model.bi.Contract', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'contract.id', mapping: 'id', type: 'string'},
        {name: 'contract.projNo', mapping: 'projNo', type: 'string'},
        {name: 'contract.owner', mapping: 'owner', type: 'string'},
        {name: 'contract.surveyor', mapping: 'surveyor', type: 'string'},
        {name: 'contract.deliveryDate', mapping: 'deliveryDate', type: 'date'},
        {name: 'contract.amount', mapping: 'amount', type: 'number'},
        {name: 'contract.currency', mapping: 'currency', type: 'string'},
        {name: 'contract.contractRate', mapping: 'contractRate', type: 'number'},
        {name: 'contract.usd', mapping: 'usd', type: 'number'},
        {name: 'contract.actualRate', mapping: 'actualRate', type: 'number'},
        {name: 'contract.cny', mapping: 'cny', type: 'number'},
        {name: 'contract.usdAdd', mapping: 'usdAdd', type: 'number'},
        {name: 'contract.cnyAdd', mapping: 'cnyAdd', type: 'number'},
        {name: 'contract.commissionPct', mapping: 'commissionPct', type: 'number'},
        {name: 'contract.fixed', mapping: 'fixed', type: 'date'},
        {name: 'contract.version', mapping: 'version', type: 'number'},
    ]
});