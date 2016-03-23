Ext.define('iFlat.view.system.DataDictionaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-datadictionary',

    generateDataDictionary: function() {
        Ext.Ajax.request({
            url: 'system_generateDataDictionary.action',
            method: 'post',
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
        });
    },

    updateDataDictionaryRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'system_saveDataDictionary.action',
            method: 'post',
            params: record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
        });
    },
    refreshPage: function(button) {
        sysDataDictionaryStore.reload();
    }

});
