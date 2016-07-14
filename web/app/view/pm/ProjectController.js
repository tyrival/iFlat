Ext.define('iFlat.view.pm.ProjectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pm-project',

    deleteProject: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['pmProject.id'];
        if(id == undefined || id == '') {
            pmProjectStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pm_deleteProject.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pmProjectStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('pm-project-tbar-type').setValue('');
        Ext.getCmp('pm-project-tbar-name').setValue('');
        Ext.getCmp('pm-project-tbar-comment').setValue('');
        Ext.getCmp('pm-project-tbar-status').setValue('');
        pmProjectStore.getProxy().extraParams['pmProject.type'] = null;
        pmProjectStore.getProxy().extraParams['pmProject.name'] = null;
        pmProjectStore.getProxy().extraParams['pmProject.comment'] = null;
        pmProjectStore.getProxy().extraParams['pmProject.status'] = null;
        pmProjectStore.reload();
    },

    showProjectEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pm-projectedit');
        if(!win) {
            win = Ext.create('iFlat.view.pm.ProjectEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.pm.Project');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    submitProjectEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        if (form.isValid()) {
            form.submit({
                url :'pm_saveProject.action',
            });
        }
    },

    searchProject: function(btn) {
        var type = Ext.getCmp('pm-project-tbar-type').getValue();
        var name = Ext.getCmp('pm-project-tbar-name').getValue();
        var comment = Ext.getCmp('pm-project-tbar-comment').getValue();
        var status = Ext.getCmp('pm-project-tbar-status').getValue();
        pmProjectStore.getProxy().extraParams['pmProject.type'] = type;
        pmProjectStore.getProxy().extraParams['pmProject.name'] = name;
        pmProjectStore.getProxy().extraParams['pmProject.comment'] = comment;
        pmProjectStore.getProxy().extraParams['pmProject.status'] = status;
        pmProjectStore.reload();
    },


    uploadAttachment: function(btn) {
        var form = Ext.getCmp('pm-projectedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'pm_uploadProject.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('pm-projectedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'pm_deleteFile.action?filePath=' + Ext.getCmp('pm-projectedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('pm-projectedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pm-projectedit-att').show();
            Ext.getCmp('pm-projectedit-link').setHref(newValue);
        } else {
            Ext.getCmp('pm-projectedit-att').hide();
            Ext.getCmp('pm-projectedit-link').setHref('');
        }
    },

})