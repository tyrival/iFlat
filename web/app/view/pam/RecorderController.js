Ext.define('iFlat.view.pam.RecorderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-recorder',

    deleteRecorder: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('recorder.id');
        if(id == undefined || id == '') {
            pamRecorderStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteRecorder.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamRecorderStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamRecorderStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["recorder.id"];
        if(id == "") {
            pamRecorderStore.remove(context.record);
        }
    },

    updateRecorderRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_saveRecorder.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamRecorderStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamRecorderStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addRecorderRecord: function() {
        pamRecorderRowEditing.cancelEdit();
        var recorder = Ext.create('iFlat.model.pam.Recorder');
        pamRecorderStore.insert(0, recorder);
        pamRecorderRowEditing.startEdit(0, 0);
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('pam-recorder-account').setValue(model.get('account'));
        }
    },

})