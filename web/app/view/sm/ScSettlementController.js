Ext.define('iFlat.view.sm.ScSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-scsettlement',

    refresh: function () {
        smScSettlementStore.reload();
    },

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listScSettlementComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-scsettlementedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.ScSettlementEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.sm.ScSettlement', {
                'scSettlement.deptName': Ext.getCmp('global-panel')
                    .getViewModel()
                    .get('user')['porgName'],
                'scSettlement.status': '未提交'
            });
            smScSettlementStore.insert(0, record);
        }

        if (record.get('scSettlement.status') != '未提交') {
            smScSettlementDetailRowEditing.disable();
            Ext.getCmp('sm-scsettlementedit-detail-delete').setDisabled(true);
            Ext.getCmp('sm-scsettlementedit-time').disable();
            Ext.getCmp('sm-scsettlementedit-projno').disable();
            Ext.getCmp('sm-scsettlementedit-team').disable();
            Ext.getCmp('sm-scsettlementedit-comment').disable();
            Ext.getCmp('sm-scsettlementedit-detail-add').setDisabled(true);
        } else {
            smScSettlementDetailRowEditing.enable();
            Ext.getCmp('sm-scsettlementedit-detail-delete').setDisabled(false);
            Ext.getCmp('sm-scsettlementedit-time').enable();
            Ext.getCmp('sm-scsettlementedit-projno').enable();
            Ext.getCmp('sm-scsettlementedit-team').enable();
            Ext.getCmp('sm-scsettlementedit-comment').enable();
            Ext.getCmp('sm-scsettlementedit-detail-add').setDisabled(false);
        }

        Ext.getCmp('sm-scsettlementedit-form').loadRecord(record);
        var month = record.get('scSettlement.month');
        if (month) {
            Ext.getCmp('sm-scsettlementedit-time').setValue(new Date(month));
        } else {
            Ext.getCmp('sm-scsettlementedit-time').reset();
        }
        var id = record.get('scSettlement.id');
        smScSettlementDetailStore.getProxy()
            .extraParams['scSettlementDetail.pid'] = id;
        smScSettlementDetailStore.reload();
        win.show();
    },

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('sm-scsettlementedit-projname').setValue(record.get('project.name'));
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('sm-scsettlementedit-att').show();
            Ext.getCmp('sm-scsettlementedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-scsettlementedit-att').hide();
            Ext.getCmp('sm-scsettlementedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-scsettlementedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadScSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-scsettlementedit-attachment').setValue(path);
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
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-scsettlementedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-scsettlementedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将ScSettlement提交审批
     * ScSettlement列表界面，data为undefined，
     * ScSettlementEdit界面，data为ScSettlement.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_submitScSettlement.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smScSettlementStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smScSettlementStore.reload();
            }
        });
    },

    /**
     * 完成对ScSettlement的修改，并提交审批
     */
    saveAndSubmitScSettlementEdit: function (btn) {
        var form = Ext.getCmp('sm-scsettlementedit-form');
        form.submit({
            url: 'sm_saveAndSubmitScSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('sm-scsettlementedit-id').setValue(id);
                Ext.getCmp('sm-scsettlementedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('sm-scsettlementedit').hide();
                smScSettlementStore.reload();
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
        smScSettlementDetailRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.sm.ScSettlementDetail', {
            'scSettlementDetail.pid': Ext.getCmp('sm-scsettlementedit-id').getValue()
        });
        smScSettlementDetailStore.insert(0, r);
        smScSettlementDetailRowEditing.startEdit(0, 0);
    },

    /**
     * 查看scSettlement.id，如果是空，则保存头信息，
     * 返回id填入scSettlement.id和scSettlementDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存ScSettlement完毕后，如果是新增的ScSettlement对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {

        var rec = context.record;
        var pid = rec.get('scSettlementDetail.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('sm-scsettlementedit-form');
            form.submit({
                url: 'sm_createScSettlementDetail.action',
                waitMsg: '保存中...',
                params: rec.getData(),
                success: function(form, action) {
                    Flat.util.tip(action.response.responseText);
                    var result = Ext.JSON.decode(action.response.responseText);
                    var map = result['map'];
                    if (!Flat.util.isEmpty(map)) {
                        var head = map['head'];
                        var detail = map['detail'];
                        // 将edit界面的id值设置为返回id
                        Ext.getCmp('sm-scsettlementedit-id').setValue(head['id']);
                        
                        rec.set('scSettlementDetail.id', detail['id']);
                        rec.set('scSettlementDetail.pid', detail['pid']);
                    } else {
                        Flat.util.tip(action.response.responseText);
                    }
                },
                failure: function(form, action) {
                    Flat.util.tip(action.response.responseText);
                }
            });

        } else {

            Flat.util.mask();
            Ext.Ajax.request({
                url: 'sm_saveScSettlementDetail.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('scSettlementDetail.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (id) {
                            rec.set(
                                'scSettlementDetail.id', id);
                            smScSettlementDetailStore.insert(0, rec);
                        }
                    }
                },
                failure: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                }
            });
        };
    },

    /**
     * ScSettlementDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["scSettlementDetail.id"];
        if(id == "") {
            smScSettlementDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        smScSettlementStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存ScSettlement头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的ScSettlement对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('sm-scsettlementedit-form');
        form.submit({
            url: 'sm_saveScSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('sm-scsettlementedit').hide();
                smScSettlementStore.reload();
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });
    },

    /**
     * 删除结算申请
     */
    delete: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定要删除这条申请吗?",function(btn) {
            if (btn == "yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteScSettlement.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smScSettlementStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smScSettlementStore.reload();
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
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteScSettlementDetail.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = smScSettlementDetailStore.findRecord(
                                'scSettlementDetail.id', result['object']['id']);
                            smScSettlementDetailStore.remove(model);
                        }
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    }
                })
            };
        })
    },
});