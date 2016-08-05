Ext.define('iFlat.view.pam.MemberFullController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-memberfull',

    deleteMember: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['pamMember.id'];
        if(id == undefined || id == '') {
            pamMemberFullStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteMember.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamMemberFullStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function(btn) {
        pamMemberFullStore.reload();
    },

    showMemberEdit: function(cmp, rowIndex, colIndex, actionItem, event, record, row) {
        var text = cmp.getText();
        var t = text.substring(2, 4);
        var win = Ext.getCmp('pam-memberedit');
        if(!win) {
            win = Ext.create('iFlat.view.pam.MemberEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.pam.Member', {
                'pamMember.pbName' : pamMemberFullStore.getProxy().extraParams['pamMember.pbName'],
                'pamMember.type' : '正式',
                'pamMember.source' : '1'
            });
        }
        var form = win.down('form[id=pam-memberedit-form]');
        form.loadRecord(record);
        win.show();
    },

})