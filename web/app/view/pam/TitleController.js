Ext.define('iFlat.view.pam.TitleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-title',

    deleteTitle: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('pamTitle.id');
        if(id == undefined || id == '') {
            pamTitleStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteTitle.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamTitleStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamTitleStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["pamTitle.id"];
        if(id == "") {
            pamTitleStore.remove(context.record);
        }
    },

    updateTitleRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_saveTitle.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamTitleStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamTitleStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addTitleRecord: function() {
        pamTitleRowEditing.cancelEdit();
        var title = Ext.create('iFlat.model.pam.Title');
        pamTitleStore.insert(0, title);
        pamTitleRowEditing.startEdit(0, 0);
    },
})