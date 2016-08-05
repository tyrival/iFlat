Ext.define('iFlat.store.pam.Recorder', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.pam.Recorder',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'pam_listRecorder.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});