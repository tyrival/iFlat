Ext.define('iFlat.store.workflow.BusinessObj', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    pageSize: 0,
    proxy: {
        enablePaging: false,
        type: 'ajax',
        url: 'workflow_getBusinessObjByProcessInstanceId.action',
        reader: {
            type: 'json',
            rootProperty: 'object',
        },
    },
});