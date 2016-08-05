Ext.define('iFlat.view.pam.MemberProbController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-memberprob',

    deleteMember: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['pamMember.id'];
        if(id == undefined || id == '') {
            pamMemberProbStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteMember.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamMemberProbStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function(btn) {
        btn.up('grid').getStore().reload();
    },

    showMemberEdit: function(cmp, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-memberedit');
        if(!win) {
            win = Ext.create('iFlat.view.pam.MemberEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.pam.Member', {
                'pamMember.pbName' : pamMemberProbStore.getProxy().extraParams['pamMember.pbName'],
                'pamMember.type' : '预备',
                'pamMember.source' : '1'
            });
        }
        var form = win.down('form[id=pam-memberedit-form]');
        form.loadRecord(record);
        win.show();
    },

})