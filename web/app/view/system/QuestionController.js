Ext.define('iFlat.view.system.QuestionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-question',

    addQuestionEdit: function(button) {
        var win = Ext.getCmp('system-questionedit');
        if(!win) {
            win = Ext.create('iFlat.view.system.QuestionEdit');
        }
        win.show();
    },

    changeSolver: function(combo, newValue, oldValue, eOpts) {
        Ext.getCmp('system-questionedit-ansusername').setValue(combo.getSelection().get('userName'));
    },

    uploadFile: function(button) {
        var form = button.up('form');
        form.submit({
            url: 'system_uploadQuAttachment.action',
            success: function(form, action) {
                var result = Ext.JSON.decode(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });
/*        Ext.Ajax.request({
            url: 'system_uploadQuAttachment.action',
            method: 'POST',
            isUpload: true,
            form: 'system-questionedit-form',
            success: function(response, opts) {
                var data = Ext.JSON.decode(response.responseText);
                if(data.success){

                }
                Flat.util.tip(response.responseText);
            }
        })*/
    }

})