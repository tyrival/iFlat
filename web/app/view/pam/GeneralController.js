Ext.define('iFlat.view.pam.GeneralController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-general',
    
    save: function(button) {
        var form = Ext.getCmp('pam-general-form');
        if (form.isValid()) {
            form.submit({
                url :'pam_saveGeneral.action',
            });
        }
    },

})