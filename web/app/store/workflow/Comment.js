Ext.define('iFlat.store.workflow.Comment', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.workflow.Comment',

    pageSize: 0,
    proxy: {
        enablePaging: false,
        type: 'ajax',
        url: 'workflow_listProcessInstanceCommentsByTaskId.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});