Ext.define('iFlat.model.bi.ProjectCost', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projectCost.id', mapping: 'id', type: 'string'},
        {name: 'projectCost.projNo', mapping: 'projNo', type: 'string'},
        {name: 'projectCost.type', mapping: 'type', type: 'string'},
        {name: 'projectCost.salesRevenue', mapping: 'salesRevenue', type: 'number' },
        {name: 'projectCost.cost', mapping: 'cost', type: 'number' },
        {name: 'projectCost.grossProfit', mapping: 'grossProfit', type: 'number' },
        {name: 'projectCost.profitMargin',
            mapping: function (data) {
                return data.profitMargin.toFixed(4);
            },
            type: 'number' },
        {name: 'projectCost.device', mapping: 'device', type: 'number' },
        {name: 'projectCost.raw', mapping: 'raw', type: 'number' },
        {name: 'projectCost.foundry', mapping: 'foundry', type: 'number' },
        {name: 'projectCost.matCst', mapping: 'matCst', type: 'number' },
        {name: 'projectCost.matPct',
            mapping: function (data) {
                return data.matPct.toFixed(4);
            },
            type: 'number' },
        {name: 'projectCost.casualLabor', mapping: 'casualLabor', type: 'number' },
        {name: 'projectCost.salary', mapping: 'salary', type: 'number' },
        {name: 'projectCost.maintenance', mapping: 'maintenance', type: 'number' },
        {name: 'projectCost.power', mapping: 'power', type: 'number' },
        {name: 'projectCost.outSourcing', mapping: 'outSourcing', type: 'number' },
        {name: 'projectCost.manuCst', mapping: 'manuCst', type: 'number' },
        {name: 'projectCost.manuPct',
            mapping: function (data) {
                return data.manuPct.toFixed(4);
            },
            type: 'number' },
        {name: 'projectCost.design', mapping: 'design', type: 'number' },
        {name: 'projectCost.survey', mapping: 'survey', type: 'number' },
        {name: 'projectCost.salesFee', mapping: 'salesFee', type: 'number' },
        {name: 'projectCost.salesAssCharge', mapping: 'salesAssCharge', type: 'number' },
        {name: 'projectCost.purchaseAssCharge', mapping: 'purchaseAssCharge', type: 'number' },
        {name: 'projectCost.colabouration', mapping: 'colabouration', type: 'number' },
        {name: 'projectCost.craftEquipment', mapping: 'craftEquipment', type: 'number' },
        {name: 'projectCost.seaTrial', mapping: 'seaTrial', type: 'number' },
        {name: 'projectCost.other', mapping: 'other', type: 'number' },
        {name: 'projectCost.warranty', mapping: 'warranty', type: 'number' },
        {name: 'projectCost.reserve', mapping: 'reserve', type: 'number' },
        {name: 'projectCost.auxCst', mapping: 'auxCst', type: 'number' },
        {name: 'projectCost.auxPct',
            mapping: function (data) {
                return data.auxPct.toFixed(4);
            },
            type: 'number' },
        {name: 'projectCost.matCstAdj', mapping: 'matCstAdj', type: 'number' },
        {name: 'projectCost.manuCstAdj', mapping: 'manuCstAdj', type: 'number' },
        {name: 'projectCost.auxCstAdj', mapping: 'auxCstAdj', type: 'number' },
        {name: 'projectCost.costAdj', mapping: 'costAdj', type: 'number' },
        {name: 'projectCost.month', mapping: 'month', type: 'date' },
        {name: 'projectCost.version', mapping: 'version', type: 'number' },
        {name: 'projectCost.materialPct', mapping: 'materialPct', type: 'number' },
        {name: 'projectCost.manufacturingPct', mapping: 'manufacturingPct', type: 'number' },
        {name: 'projectCost.auxiliaryPct', mapping: 'auxiliaryPct', type: 'number' },
    ]
});