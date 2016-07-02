Ext.define('iFlat.model.report.sm.MonthlyProjectSettlement', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'monthlyProjectSettlement.type', mapping: 'type', type: 'string'},
        {name: 'monthlyProjectSettlement.month', mapping: 'month', type: 'date'},
        {name: 'monthlyProjectSettlement.projNo', mapping: 'projNo', type: 'string'},
        {name: 'monthlyProjectSettlement.projName', mapping: 'projName', type: 'string'},
        {name: 'monthlyProjectSettlement.team', mapping: 'team', type: 'string'},
        {name: 'monthlyProjectSettlement.dept', mapping: 'dept', type: 'string'},
        {name: 'monthlyProjectSettlement.labor', mapping: 'labor', type: 'number'},
        {name: 'monthlyProjectSettlement.consumable', mapping: 'consumable', type: 'number'},
        {name: 'monthlyProjectSettlement.performance', mapping: 'performance', type: 'number'},
        {name: 'monthlyProjectSettlement.material', mapping: 'material', type: 'number'},
        {name: 'monthlyProjectSettlement.summary', mapping: 'summary', type: 'number'},
        {name: 'monthlyProjectSettlement.invoice', mapping: 'invoice', type: 'number'},
        {name: 'monthlyProjectSettlement.rate', mapping: 'rate', type: 'number'},
        {name: 'monthlyProjectSettlement.fine', mapping: 'fine', type: 'number'},
    ]
});