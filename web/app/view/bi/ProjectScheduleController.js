Ext.define('iFlat.view.bi.ProjectScheduleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-projectschedule',

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["projectSchedule.id"];
        if(id == "") {
            biProjectScheduleStore.remove(context.record);
        }
    },

    updateProjectScheduleRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'bi_saveProjectSchedule.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                debugger;
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    biProjectScheduleStore.remove(record);
                }
                if(result['object']) {
                    record.set('projectSchedule.id', result['object']['id']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteProjectSchedule: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['projectSchedule.id'];
        if(id == undefined || id == '') {
            biProjectScheduleStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该项目吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteProjectSchedule.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biProjectScheduleStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biProjectScheduleStore.reload();
    },

    addProjectScheduleRecord: function() {
        biProjectScheduleRowEditing.cancelEdit();
        var projectschedule = Ext.create('iFlat.model.bi.ProjectSchedule');
        biProjectScheduleStore.insert(0, projectschedule);
        biProjectScheduleRowEditing.startEdit(0, 0);
    },

    renderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.Date.format(value, 'Y-m-d');
    }

})