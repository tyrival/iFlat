Ext.define('iFlat.model.bi.AdditionalBill', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'additionalBill.id', mapping: 'id', type: 'string'},
        {name: 'additionalBill.projNo', mapping: 'projNo', type: 'string'},
        {name: 'additionalBill.item', mapping: 'item', type: 'string'},
        {name: 'additionalBill.labourUsd', mapping: 'labourUsd', type: 'number'},
        {name: 'additionalBill.labour', mapping: 'labour', type: 'number'},
        {name: 'additionalBill.deviceUsd', mapping: 'deviceUsd', type: 'number'},
        {name: 'additionalBill.device', mapping: 'device', type: 'number'},
        {name: 'additionalBill.materialUsd', mapping: 'materialUsd', type: 'number'},
        {name: 'additionalBill.material', mapping: 'material', type: 'number'},
        {name: 'additionalBill.amountUsd', mapping: 'amountUsd', type: 'number'},
        {name: 'additionalBill.amount', mapping: 'amount', type: 'number'},
        {name: 'additionalBill.comment', mapping: 'comment', type: 'string'},
        {name: 'additionalBill.month', mapping: 'month', type: 'date'},
        {name: 'additionalBill.fixed', mapping: 'fixed', type: 'date'},
        {name: 'additionalBill.version', mapping: 'version', type: 'string'},
    ]
});