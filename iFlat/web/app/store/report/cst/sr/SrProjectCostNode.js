Ext.define('iFlat.store.report.cst.sr.SrProjectCostNode', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.report.cst.sr.SrProjectCostNode',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listSrProjectCostNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    folderSort: true,
});