Ext.define('iFlat.view.pam.NewsInfoController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-newsinfo',

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-newsinfo-att').show();
            Ext.getCmp('pam-newsinfo-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-newsinfo-att').hide();
            Ext.getCmp('pam-newsinfo-link').setHref('');
        }
    },
})