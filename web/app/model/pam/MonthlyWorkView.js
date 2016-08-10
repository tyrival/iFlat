Ext.define('iFlat.model.pam.MonthlyWorkView', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'monthlyWorkView.pbName', mapping: 'pbName', type: 'string'},
        {name: 'monthlyWorkView.month', mapping: 'month', type: 'date'},
        {name: 'monthlyWorkView.status', mapping: 'status', type: 'string'},
    ]
});