Ext.define('iFlat.store.report.cst.nm.NmProjectCostNode', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.report.cst.nm.NmProjectCostNode',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listNmProjectCostNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    folderSort: true,
});