Ext.define('iFlat.store.workflow.Task', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.workflow.Task',

    pageSize: 0,
    proxy: {
        enablePaging: false,
        type: 'ajax',
        url: 'workflow_listTask.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});