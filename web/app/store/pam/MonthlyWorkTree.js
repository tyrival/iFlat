Ext.define('iFlat.store.pam.MonthlyWorkTree', {
    extend: 'Ext.data.TreeStore',

    autoLoad: false,
    model: 'iFlat.model.pam.MonthlyWorkTree',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listMonthlyWork.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
    rootVisible: false,
    //parentIdProperty: 'parentId',
    folderSort: true,
});