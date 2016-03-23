Ext.define('iFlat.view.bi.ProjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-project',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["project.id"];
        if(id == "") {
            biProjectStore.remove(context.record);
        }
    },

    updateProjectRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'bi_saveProject.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteProject: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['project.id'];
        if(id == undefined || id == '') {
            biProjectStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该工号吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteProject.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biProjectStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biProjectStore.reload();
    },

    addProjectRecord: function() {
        biProjectRowEditing.cancelEdit();
        var project = Ext.create('iFlat.model.bi.Project');
        biProjectStore.insert(0, project);
        biProjectRowEditing.startEdit(0, 0);
    },
    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.Date.format(value, 'Y-m-d');
    }

})