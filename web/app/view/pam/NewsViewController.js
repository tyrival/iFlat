Ext.define('iFlat.view.pam.NewsViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-newsview',

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-newsview-att').show();
            Ext.getCmp('pam-newsview-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-newsview-att').hide();
            Ext.getCmp('pam-newsview-link').setHref('');
        }
    },

    appvNews: function(button) {
        var text = button.getText();
        var statusCmp = button.up('window').down('textfield[name=news.status]');
        var status = statusCmp.getValue();
        var param = {
            'news.isAdopt': null,
            'news.secApprv': null,
            'news.status': null,
        };
        var url;
        switch (text) {
            case '采用':
                if (status == '待党群审核') {
                    param['news.isAdopt'] = '1';
                    param['news.secApprv'] = '0';
                    param['news.amount'] = 5;
                    url = 'pam_approveNewsPam.action';
                } else {
                    url = 'pam_approveNewsSec.action';
                }
                statusCmp.setValue('采用');
                break;
            case '不采用':
                if (status == '待党群审核') {
                    param['news.isAdopt'] = '0';
                    param['news.secApprv'] = '0';
                    url = 'pam_approveNewsPam.action';
                } else {
                    url = 'pam_approveNewsSec.action';
                }
                statusCmp.setValue('不采用');
                break;
            case '转保密办审核':
                param['news.isAdopt'] = '1';
                param['news.secApprv'] = '1';
                param['news.amount'] = 5;
                statusCmp.setValue('待保密办审核');
                url = 'pam_approveNewsPam.action';
                break;
            case '退回':
                url = 'pam_rejectNews.action';
                break;
        }
        Ext.Msg.confirm("提示!","确定" + text + "?",function(btn) {
            if(btn=="yes") {
                var win = button.up('window');
                var form = win.down('form[id=pam-newsview-form]');
                if (form.isValid()) {
                    form.submit({
                        url: url,
                        params: param,
                    });
                }
            };
        })
    },
})