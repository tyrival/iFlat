Ext.define('iFlat.view.bi.ProjectCstCtrlController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-projectcstctrl',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["projectCstCtrl.id"];
        if(id == "") {
            biProjectCstCtrlStore.remove(context.record);
        }
    },

    updateProjectCstCtrlRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'bi_saveProjectCstCtrl.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    biProjectCstCtrlStore.remove(record);
                }
                if(result['object']) {
                    record.set('projectCstCtrl.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteProjectCstCtrl: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['projectCstCtrl.id'];
        if(id == undefined || id == '') {
            biProjectCstCtrlStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项目吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteProjectCstCtrl.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biProjectCstCtrlStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biProjectCstCtrlStore.reload();
    },

    addProjectCstCtrlRecord: function() {
        biProjectCstCtrlRowEditing.cancelEdit();
        var projectcstctrl = Ext.create('iFlat.model.bi.ProjectCstCtrl');
        biProjectCstCtrlStore.insert(0, projectcstctrl);
        biProjectCstCtrlRowEditing.startEdit(0, 0);
    },

    downloadTemplate: function() {
        Ext.Ajax.request({
            url: 'bi_templateProjectCstCtrl.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },

    uploadFile: function(btn) {
        var form = Ext.getCmp('bi-projectcstctrl-import');
        if(form.isValid()) {
            form.submit({
                url: 'bi_importProjectCstCtrl.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function(fp, o) {
                    biProjectCstCtrlStore.reload();
                    Flat.util.tip(o.response.responseText);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }

    }

})