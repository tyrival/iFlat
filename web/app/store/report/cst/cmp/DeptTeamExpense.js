Ext.define('iFlat.store.report.cst.cmp.DeptTeamExpense', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    model: 'iFlat.model.report.cst.cmp.DeptTeamExpense',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listDeptTeamExpense.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});