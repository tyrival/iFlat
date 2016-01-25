Ext.define('iFlat.store.report.cst.sb.SbProjectCostNode', {
    extend: 'Ext.data.TreeStore',

    autoLoad: true,
    model: 'iFlat.model.report.cst.sb.SbProjectCostNode',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listSbProjectCostNode.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
    rootVisible: false,
    parentIdProperty: 'parentId',
    folderSort: true,
});