Ext.define('iFlat.storexr.SalaryPage', {

    autoLoad: true,
    model: 'iFlat.model.xr.Salary',

    pageSize: 20,
    proxy: {
        enablePaging: true,
        type: 'ajax',
        url: 'xr_listPageSalary.action',
        reader: {
            type: 'json',
            rootProperty: 'object.list',
            totalProperty: 'object.total'
        },
    },
});