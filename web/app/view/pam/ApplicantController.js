Ext.define('iFlat.view.pam.ApplicantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-applicant',

    deleteApplicant: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('applicant.id');
        if(id == undefined || id == '') {
            pamApplicantStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteApplicant.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamApplicantStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        pamApplicantStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["applicant.id"];
        if(id == "") {
            pamApplicantStore.remove(context.record);
        }
    },

    updateApplicantRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'pam_saveApplicant.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                pamApplicantStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                pamApplicantStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addApplicantRecord: function() {
        pamApplicantRowEditing.cancelEdit();
        var applicant = Ext.create('iFlat.model.pam.Applicant');
        pamApplicantStore.insert(0, applicant);
        pamApplicantRowEditing.startEdit(0, 0);
    },
})