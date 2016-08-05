Ext.define('iFlat.view.pam.MemberEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-memberedit',

    saveMemberEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=pam-memberedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'pam_saveMember.action',
            });
        }
    },

})