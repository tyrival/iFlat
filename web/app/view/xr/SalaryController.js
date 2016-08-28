Ext.define('iFlat.view.xr.SalaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-salary',

    deleteSalary: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('salary.id');
        if(id == undefined || id == '') {
            salaryStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'xr_deleteSalary.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                salaryStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        salaryStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["salary.id"];
        if(id == "") {
            salaryStore.remove(context.record);
        }
    },

    updateSalaryRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'xr_saveSalary.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                salaryStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                salaryStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addSalaryRecord: function() {
        salaryRowEditing.cancelEdit();
        var salary = Ext.create('iFlat.model.xr.Salary');
        salaryStore.insert(0, salary);
        salaryRowEditing.startEdit(0, 0);
    },

    uploadFile: function(btn) {
        var form = btn.previousSibling('form');
        if (form.isValid()) {
            form.submit({
                url: 'xr_importSalary.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    salaryStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'xr_templateSalary.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
})