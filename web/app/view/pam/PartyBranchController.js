Ext.define('iFlat.view.pam.PartyBranchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-partybranch',

    deletePartyBranch: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('partyBranch.id');
        if(id == undefined || id == '') {
            pamPartyBranchStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deletePartyBranch.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamPartyBranchStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamPartyBranchStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["partyBranch.id"];
        if(id == "") {
            pamPartyBranchStore.remove(context.record);
        }
    },

    updatePartyBranchRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_savePartyBranch.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamPartyBranchStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamPartyBranchStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addPartyBranchRecord: function() {
        pamPartyBranchRowEditing.cancelEdit();
        var partyBranch = Ext.create('iFlat.model.pam.PartyBranch');
        pamPartyBranchStore.insert(0, partyBranch);
        pamPartyBranchRowEditing.startEdit(0, 0);
    },
})