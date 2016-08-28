Ext.define('iFlat.model.xr.LaborExpense', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'laborExpense.projNo', mapping: 'projNo', type: 'string'},
        {name: 'laborExpense.projName', mapping: 'projName', type: 'string'},
        {name: 'laborExpense.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'laborExpense.dept', mapping: 'dept', type: 'string'},
        {name: 'laborExpense.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'laborExpense.team', mapping: 'team', type: 'string'},
        {name: 'laborExpense.amountFirst', mapping: 'amountFirst', type: 'number'},
        {name: 'laborExpense.amountSecond', mapping: 'amountSecond', type: 'number'},
        {name: 'laborExpense.amountDiff', mapping: 'amountDiff', type: 'number'},
        {name: 'laborExpense.amountRating', mapping: 'amountRating', type: 'number'},
        {name: 'laborExpense.amountWithDiscount', mapping: 'amountWithDiscount', type: 'number'},
        {name: 'laborExpense.settlementTime', mapping: 'settlementTime', type: 'date'},
        {name: 'laborExpense.status', mapping: 'status', type: 'string'},
        {name: 'laborExpense.createTime', mapping: 'createTime', type: 'date'},
        {name: 'laborExpense.fromDate', mapping: 'fromDate', type: 'date'},
        {name: 'laborExpense.toDate', mapping: 'toDate', type: 'date'},
    ]
});