Ext.define('iFlat.view.sm.ProjectTargetCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-projecttargetcost',

    deleteProjectTargetCost: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('projectTargetCost.id');
        if(id == undefined || id == '') {
            smProjectTargetCostStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteProjectTargetCost.action',
                        params: record.getData(),
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smProjectTargetCostStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    search: function () {
        var projNo = Ext.getCmp('sm-projecttargetcost-combo').getValue();
        smProjectTargetCostStore.getProxy().extraParams['projectTargetCost.projNo'] = projNo;
        smProjectTargetCostStore.reload();
    },

    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('sm-projecttargetcost-projname').setValue(record.get('rptProject.name'));
    },
    
    refreshList: function() {
        smProjectTargetCostStore.reload();
    },

    editClose: function () {
        smProjectTargetCostStore.reload();
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('sm-projecttargetcostedit-att').show();
            Ext.getCmp('sm-projecttargetcostedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-projecttargetcostedit-att').hide();
            Ext.getCmp('sm-projecttargetcostedit-link').setHref('');
        }
    },

    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-projecttargetcostedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.ProjectTargetCostEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.sm.ProjectTargetCost');
            smProjectTargetCostStore.insert(0, record);
        }

        Ext.getCmp('sm-projecttargetcostedit-form').loadRecord(record);
        win.show();
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-projecttargetcostedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadProjectTargetCost.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-projecttargetcostedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    /**
     * 删除已上传的附件，不可逆
     */
    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-projecttargetcostedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-projecttargetcostedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将ProjectTargetCost提交审批
     * ProjectTargetCost列表界面，data为undefined，
     * ProjectTargetCostEdit界面，data为ProjectTargetCost.id
     */
    submit: function (btn) {
        var form = Ext.getCmp('sm-projecttargetcostedit-form');
        if (form.isValid()) {
            Flat.util.mask();
            form.submit({
                url: 'sm_saveProjectTargetCost.action',
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.unmask();
                    Flat.util.tip(o.response.responseText);
                    smProjectTargetCostStore.reload();

                },
                failure: function (fp, o) {
                    Flat.util.unmask();
                    Flat.util.tip(o.response.responseText);
                    smProjectTargetCostStore.reload();
                }
            })
        }
    },


    uploadFile: function(btn) {
        var form = Ext.getCmp('sm-projecttargetcost-import');
        if (form.isValid()) {
            form.submit({
                url: 'sm_importProjectTargetCost.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    smProjectTargetCostStore.reload();
                    Flat.util.tip(o.response.responseText);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
            
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'sm_templateProjectTargetCost.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },
})