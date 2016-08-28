Ext.define('iFlat.model.report.cst.cmp.DeptTeamExpense', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'deptTeamExpense.month', mapping: 'month', type: 'string'},
        {name: 'deptTeamExpense.projNo', mapping: 'projNo', type: 'string'},
        {name: 'deptTeamExpense.projName', mapping: 'projName', type: 'string'},
        {name: 'deptTeamExpense.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'deptTeamExpense.dept', mapping: 'dept', type: 'string'},
        {name: 'deptTeamExpense.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'deptTeamExpense.team', mapping: 'team', type: 'string'},
        {name: 'deptTeamExpense.amountFirst', mapping: 'amountFirst', type: 'number'},
        {name: 'deptTeamExpense.amountSecond', mapping: 'amountSecond', type: 'number'},
        {name: 'deptTeamExpense.status', mapping: 'status', type: 'string'},
        {name: 'deptTeamExpense.fromDate', mapping: 'fromDate', type: 'date'},
        {name: 'deptTeamExpense.toDate', mapping: 'toDate', type: 'date'},
    ]
});