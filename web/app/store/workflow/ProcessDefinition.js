Ext.define('iFlat.store.workflow.ProcessDefinition', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.workflow.ProcessDefinition',

    pageSize: 0,
    proxy: {
        enablePaging: false,
        type: 'ajax',
        url: 'workflow_listProcessDefinition.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});