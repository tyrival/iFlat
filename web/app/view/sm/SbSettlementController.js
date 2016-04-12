Ext.define('iFlat.view.sm.SbSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sbsettlement',

    refresh: function () {
        smSbSettlementStore.reload();
    },
    
    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listSbSettlementComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-sbsettlementedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.SbSettlementEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.sm.SbSettlement', {
                'sbSettlement.deptName': Ext.getCmp('global-panel')
                    .getViewModel()
                    .get('user')['porgName'],
                'sbSettlement.status': '未提交'
            });
            smSbSettlementStore.insert(0, record);
        }

        if (record.get('sbSettlement.status') != '未提交') {
            smSbSettlementDetailRowEditing.disable();
            Ext.getCmp('sm-sbsettlementedit-detail-delete').setDisabled(true);
            Ext.getCmp('sm-sbsettlementedit-time').disable();
            Ext.getCmp('sm-sbsettlementedit-projno').disable();
            Ext.getCmp('sm-sbsettlementedit-team').disable();
            Ext.getCmp('sm-sbsettlementedit-comment').disable();
            Ext.getCmp('sm-sbsettlementedit-detail-add').setDisabled(true);
        } else {
            smSbSettlementDetailRowEditing.enable();
            Ext.getCmp('sm-sbsettlementedit-detail-delete').setDisabled(false);
            Ext.getCmp('sm-sbsettlementedit-time').enable();
            Ext.getCmp('sm-sbsettlementedit-projno').enable();
            Ext.getCmp('sm-sbsettlementedit-team').enable();
            Ext.getCmp('sm-sbsettlementedit-comment').enable();
            Ext.getCmp('sm-sbsettlementedit-detail-add').setDisabled(false);
        }
        
        Ext.getCmp('sm-sbsettlementedit-form').loadRecord(record);
        var month = record.get('sbSettlement.month');
        if (month) {
            Ext.getCmp('sm-sbsettlementedit-time').setValue(new Date(month));
        } else {
            Ext.getCmp('sm-sbsettlementedit-time').reset();
        }
        var id = record.get('sbSettlement.id');
        smSbSettlementDetailStore.getProxy()
            .extraParams['sbSettlementDetail.pid'] = id;
        smSbSettlementDetailStore.reload();
        win.show();
    },

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('sm-sbsettlementedit-projname').setValue(record.get('project.name'));
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('sm-sbsettlementedit-att').show();
            Ext.getCmp('sm-sbsettlementedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-sbsettlementedit-att').hide();
            Ext.getCmp('sm-sbsettlementedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-sbsettlementedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadSbSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-sbsettlementedit-attachment').setValue(path);
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
                Ext.Ajax.request({
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-sbsettlementedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-sbsettlementedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将SbSettlement提交审批
     * SbSettlement列表界面，data为undefined，
     * SbSettlementEdit界面，data为SbSettlement.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.Ajax.request({
            url: 'sm_submitSbSettlement.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.tip(response.responseText);
                smSbSettlementStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.tip(response.responseText);
                smSbSettlementStore.reload();
            }
        });
    },

    /**
     * 完成对SbSettlement的修改，并提交审批
     */
    saveAndSubmitSbSettlementEdit: function (btn) {
        var form = Ext.getCmp('sm-sbsettlementedit-form');
        form.submit({
            url: 'sm_saveAndSubmitSbSettlement.action',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('sm-sbsettlementedit-id').setValue(id);
                Ext.getCmp('sm-sbsettlementedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('sm-sbsettlementedit').hide();
                smSbSettlementStore.reload();
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });
    },

    /**
     * 渲染附件下载列
     */
    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },

    /**
     * 表格中新增行信息
     */
    addDetail: function() {
        smSbSettlementDetailRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.sm.SbSettlementDetail', {
            'sbSettlementDetail.pid': Ext.getCmp('sm-sbsettlementedit-id').getValue()
        });
        smSbSettlementDetailStore.insert(0, r);
        smSbSettlementDetailRowEditing.startEdit(0, 0);
    },
    
    /**
     * 查看sbSettlement.id，如果是空，则保存头信息，
     * 返回id填入sbSettlement.id和sbSettlementDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存SbSettlement完毕后，如果是新增的SbSettlement对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {
        
        var rec = context.record;
        var pid = rec.get('sbSettlementDetail.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('sm-sbsettlementedit-form');
            form.submit({
                url: 'sm_saveSbSettlement.action',
                success: function(form, action) {
                    var result = Ext.JSON.decode(action.response.responseText);
                    if (result['object']['id']) {
                        var id = result['object']['id'];
                        // 将edit界面的id值设置为返回id
                        Ext.getCmp('sm-sbsettlementedit-id').setValue(id);
                        // 将明细项的pid设置为返回id值
                        rec.set('sbSettlementDetail.pid', id);
                        saveDetail(rec);
                    } else {
                        Flat.util.tip(action.response.responseText);
                    }
                },
                failure: function(form, action) {
                    Flat.util.tip(action.response.responseText);
                }
            });

        } else {
            saveDetail(rec);
        };
        function saveDetail (recordDetail) {
            Ext.Ajax.request({
                url: 'sm_saveSbSettlementDetail.action',
                method: 'post',
                params: recordDetail.getData(),
                success: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(recordDetail.get('sbSettlementDetail.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (id) {
                            recordDetail.set(
                                'sbSettlementDetail.id', id);
                            smSbSettlementDetailStore.insert(0, recordDetail);
                        }
                    }
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                }
            });
        }
    },

    /**
     * SbSettlementDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["sbSettlementDetail.id"];
        if(id == "") {
            smSbSettlementDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        smSbSettlementStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存SbSettlement头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的SbSettlement对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('sm-sbsettlementedit-form');
        form.submit({
            url: 'sm_saveSbSettlement.action',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('sm-sbsettlementedit').hide();
                smSbSettlementStore.reload();
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });
    },
/*
    /!**
     * 保存SbSettlementDetail内容
     *!/
    saveSbSettlementDetail: function (recordDetail) {
        Ext.Ajax.request({
            url: 'sm_saveSbSettlementDetail.action',
            method: 'post',
            params: recordDetail.getData(),
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                if (Flat.util.isEmpty(recordDetail.get('sbSettlementDetail.id'))) {
                    var result = Ext.JSON.decode(response.responseText);
                    recordDetail.set(
                        'sbSettlementDetail.id', result['object']['id']);
                    smSbSettlementDetailStore.insert(0, recordDetail);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },*/

    /**
     * 删除结算申请
     */
    delete: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定要删除这条申请吗?",function(btn) {
            if (btn == "yes") {
                Ext.Ajax.request({
                    url: 'sm_deleteSbSettlement.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        smSbSettlementStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        smSbSettlementStore.reload();
                    }
                })
            };
        })
    },

    /**
     * 删除明细项目
     */
    deleteDetail: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
            if (btn == "yes") {
                Ext.Ajax.request({
                    url: 'sm_deleteSbSettlementDetail.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = smSbSettlementDetailStore.findRecord(
                                'sbSettlementDetail.id', result['object']['id']);
                            smSbSettlementDetailStore.remove(model);
                        }
                    },
                    failure: function(response, opts) {
                        Flat.util.tip(response.responseText);
                    }
                })
            };
        })
    },
});