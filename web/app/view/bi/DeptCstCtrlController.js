Ext.define('iFlat.view.bi.DeptCstCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-deptcstctrl',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["deptCstCtrl.id"];
        if(id == "") {
            biDeptCstCtrlStore.remove(context.record);
        }
    },

    updateDeptCstCtrlRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'bi_saveDeptCstCtrl.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    biDeptCstCtrlStore.remove(record);
                }
                if(result['object']) {
                    record.set('deptCstCtrl.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteDeptCstCtrl: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['deptCstCtrl.id'];
        if(id == undefined || id == '') {
            biDeptCstCtrlStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项目吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteDeptCstCtrl.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biDeptCstCtrlStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biDeptCstCtrlStore.reload();
    },

    addDeptCstCtrlRecord: function() {
        biDeptCstCtrlRowEditing.cancelEdit();
        var deptcstctrl = Ext.create('iFlat.model.bi.DeptCstCtrl');
        biDeptCstCtrlStore.insert(0, deptcstctrl);
        biDeptCstCtrlRowEditing.startEdit(0, 0);
    },

    uploadFile: function(btn) {
        var form = Ext.getCmp('bi-deptcstctrl-import');
        if (form.isValid()) {
            form.submit({
                url: 'bi_importDeptCstCtrl.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    biDeptCstCtrlStore.reload();
                    Flat.util.tip(o.response.responseText);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function() {
        Ext.Ajax.request({
            url: 'bi_templateDeptCstCtrl.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },

})