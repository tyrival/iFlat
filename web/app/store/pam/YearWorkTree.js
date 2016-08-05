Ext.define('iFlat.store.pam.YearWorkTree', {
    extend: 'Ext.data.TreeStore',

    autoLoad: false,
    model: 'iFlat.model.pam.YearWorkTree',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listYearWork.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
    rootVisible: false,
    //parentIdProperty: 'parentId',
    folderSort: true,
});