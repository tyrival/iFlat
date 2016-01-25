Ext.define('iFlat.store.bi.DeptCstCtrl', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.bi.DeptCstCtrl',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'bi_listDeptCstCtrl.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});