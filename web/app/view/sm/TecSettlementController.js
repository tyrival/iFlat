Ext.define('iFlat.view.sm.TecSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-tecsettlement',

    refresh: function () {
        smTecSettlementStore.reload();
    },

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listTecSettlementComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-tecsettlementedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.TecSettlementEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.sm.TecSettlement', {
                'tecSettlement.deptName': Ext.getCmp('global-panel')
                    .getViewModel()
                    .get('user')['porgName'],
                'tecSettlement.status': '未提交'
            });
            smTecSettlementStore.insert(0, record);
        }

        if (record.get('tecSettlement.status') != '未提交') {
            smTecSettlementDetailRowEditing.disable();
            Ext.getCmp('sm-tecsettlementedit-detail-delete').setDisabled(true);
            Ext.getCmp('sm-tecsettlementedit-time').disable();
            Ext.getCmp('sm-tecsettlementedit-projno').disable();
            Ext.getCmp('sm-tecsettlementedit-team').disable();
            Ext.getCmp('sm-tecsettlementedit-comment').disable();
            Ext.getCmp('sm-tecsettlementedit-detail-add').setDisabled(true);
        } else {
            smTecSettlementDetailRowEditing.enable();
            Ext.getCmp('sm-tecsettlementedit-detail-delete').setDisabled(false);
            Ext.getCmp('sm-tecsettlementedit-time').enable();
            Ext.getCmp('sm-tecsettlementedit-projno').enable();
            Ext.getCmp('sm-tecsettlementedit-team').enable();
            Ext.getCmp('sm-tecsettlementedit-comment').enable();
            Ext.getCmp('sm-tecsettlementedit-detail-add').setDisabled(false);
        }

        Ext.getCmp('sm-tecsettlementedit-form').loadRecord(record);
        var month = record.get('tecSettlement.month');
        if (month) {
            Ext.getCmp('sm-tecsettlementedit-time').setValue(new Date(month));
        } else {
            Ext.getCmp('sm-tecsettlementedit-time').reset();
        }
        var id = record.get('tecSettlement.id');
        smTecSettlementDetailStore.getProxy()
            .extraParams['tecSettlementDetail.pid'] = id;
        smTecSettlementDetailStore.reload();
        win.show();
    },

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('sm-tecsettlementedit-projname').setValue(record.get('project.name'));
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('sm-tecsettlementedit-att').show();
            Ext.getCmp('sm-tecsettlementedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-tecsettlementedit-att').hide();
            Ext.getCmp('sm-tecsettlementedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-tecsettlementedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadTecSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-tecsettlementedit-attachment').setValue(path);
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
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-tecsettlementedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-tecsettlementedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将TecSettlement提交审批
     * TecSettlement列表界面，data为undefined，
     * TecSettlementEdit界面，data为TecSettlement.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_submitTecSettlement.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smTecSettlementStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smTecSettlementStore.reload();
            }
        });
    },

    /**
     * 完成对TecSettlement的修改，并提交审批
     */
    saveAndSubmitTecSettlementEdit: function (btn) {
        var form = Ext.getCmp('sm-tecsettlementedit-form');
        form.submit({
            url: 'sm_saveAndSubmitTecSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('sm-tecsettlementedit-id').setValue(id);
                Ext.getCmp('sm-tecsettlementedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('sm-tecsettlementedit').hide();
                smTecSettlementStore.reload();
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
        smTecSettlementDetailRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.sm.TecSettlementDetail', {
            'tecSettlementDetail.pid': Ext.getCmp('sm-tecsettlementedit-id').getValue()
        });
        smTecSettlementDetailStore.insert(0, r);
        smTecSettlementDetailRowEditing.startEdit(0, 0);
    },

    /**
     * 查看tecSettlement.id，如果是空，则保存头信息，
     * 返回id填入tecSettlement.id和tecSettlementDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存TecSettlement完毕后，如果是新增的TecSettlement对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {

        var rec = context.record;
        var pid = rec.get('tecSettlementDetail.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('sm-tecsettlementedit-form');
            form.submit({
                url: 'sm_createTecSettlementDetail.action',
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
                        Ext.getCmp('sm-tecsettlementedit-id').setValue(head['id']);
                        
                        rec.set('tecSettlementDetail.id', detail['id']);
                        rec.set('tecSettlementDetail.pid', detail['pid']);
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
                url: 'sm_saveTecSettlementDetail.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('tecSettlementDetail.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (id) {
                            rec.set(
                                'tecSettlementDetail.id', id);
                            smTecSettlementDetailStore.insert(0, rec);
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
     * TecSettlementDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["tecSettlementDetail.id"];
        if(id == "") {
            smTecSettlementDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        smTecSettlementStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存TecSettlement头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的TecSettlement对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('sm-tecsettlementedit-form');
        form.submit({
            url: 'sm_saveTecSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('sm-tecsettlementedit').hide();
                smTecSettlementStore.reload();
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
                    url: 'sm_deleteTecSettlement.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smTecSettlementStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smTecSettlementStore.reload();
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
                    url: 'sm_deleteTecSettlementDetail.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = smTecSettlementDetailStore.findRecord(
                                'tecSettlementDetail.id', result['object']['id']);
                            smTecSettlementDetailStore.remove(model);
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