Ext.define('iFlat.view.pam.PartyGroupController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-partygroup',

    deletePartyGroup: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('partyGroup.id');
        if(id == undefined || id == '') {
            pamPartyGroupStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deletePartyGroup.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamPartyGroupStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamPartyGroupStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["partyGroup.id"];
        if(id == "") {
            pamPartyGroupStore.remove(context.record);
        }
    },

    updatePartyGroupRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_savePartyGroup.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamPartyGroupStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamPartyGroupStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addPartyGroupRecord: function() {
        pamPartyGroupRowEditing.cancelEdit();
        var partyGroup = Ext.create('iFlat.model.pam.PartyGroup');
        pamPartyGroupStore.insert(0, partyGroup);
        pamPartyGroupRowEditing.startEdit(0, 0);
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('pam-partygroup-account').setValue(model.get('account'));
        }
    },

})