Ext.define('iFlat.view.xr.BenefitController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-benefit',

    deleteBenefit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('benefit.id');
        if(id == undefined || id == '') {
            benefitStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'xr_deleteBenefit.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                benefitStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        benefitStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["benefit.id"];
        if(id == "") {
            benefitStore.remove(context.record);
        }
    },

    updateBenefitRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'xr_saveBenefit.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                benefitStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                benefitStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addBenefitRecord: function() {
        benefitRowEditing.cancelEdit();
        var benefit = Ext.create('iFlat.model.xr.Benefit');
        benefitStore.insert(0, benefit);
        benefitRowEditing.startEdit(0, 0);
    },

    uploadFile: function(btn) {
        var form = btn.previousSibling('form');
        if (form.isValid()) {
            form.submit({
                url: 'xr_importBenefit.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    benefitStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'xr_templateBenefit.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
})