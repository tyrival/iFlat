Ext.define('iFlat.view.bi.ProjectInProcessController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-projectinprocess',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["projectInProcess.id"];
        if(id == "") {
            biProjectInProcessStore.remove(context.record);
        }
    },

    updateProjectInProcessRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'bi_saveProjectInProcess.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    biProjectInProcessStore.remove(record);
                }
                if(result['object']) {
                    record.set('projectInProcess.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteProjectInProcess: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['projectInProcess.id'];
        if(id == undefined || id == '') {
            biProjectInProcessStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项目吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteProjectInProcess.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biProjectInProcessStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biProjectInProcessStore.reload();
        biProjectInProcessProjectStore.reload();
    },

    addProjectInProcessRecord: function() {
        biProjectInProcessRowEditing.cancelEdit();
        var projectinprocess = Ext.create('iFlat.model.bi.ProjectInProcess');
        biProjectInProcessStore.insert(0, projectinprocess);
        biProjectInProcessRowEditing.startEdit(0, 0);
    },

    uploadFile: function(btn) {
        var form = Ext.getCmp('bi-projectinprocess-import');
        if (form.isValid()) {
            form.submit({
                url: 'bi_importProjectInProcess.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    biProjectInProcessStore.reload();
                    biProjectInProcessProjectStore.reload();
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
            url: 'bi_templateProjectInProcess.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },

})