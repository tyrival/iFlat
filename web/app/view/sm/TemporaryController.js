Ext.define('iFlat.view.sm.TemporaryController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-temporary',

    refresh: function () {
        smTemporaryStore.reload();
    },

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listTemporaryComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-temporaryedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.TemporaryEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.sm.Temporary', {
                'temporary.deptName': Ext.getCmp('global-panel')
                    .getViewModel()
                    .get('user')['porgName'],
                'temporary.status': '未提交'
            });
            smTemporaryStore.insert(0, record);
        }

        if (record.get('temporary.status') != '未提交') {
            smTemporaryDetailRowEditing.disable();
            Ext.getCmp('sm-temporaryedit-detail-delete').setDisabled(true);
            Ext.getCmp('sm-temporaryedit-time').disable();
            Ext.getCmp('sm-temporaryedit-comment').disable();
            Ext.getCmp('sm-temporaryedit-detail-add').setDisabled(true);
        } else {
            smTemporaryDetailRowEditing.enable();
            Ext.getCmp('sm-temporaryedit-detail-delete').setDisabled(false);
            Ext.getCmp('sm-temporaryedit-time').enable();
            Ext.getCmp('sm-temporaryedit-comment').enable();
            Ext.getCmp('sm-temporaryedit-detail-add').setDisabled(false);
        }

        Ext.getCmp('sm-temporaryedit-form').loadRecord(record);
        var month = record.get('temporary.month');
        if (month) {
            Ext.getCmp('sm-temporaryedit-time').setValue(new Date(month));
        } else {
            Ext.getCmp('sm-temporaryedit-time').reset();
        }
        var id = record.get('temporary.id');
        smTemporaryDetailStore.getProxy()
            .extraParams['temporaryDetail.pid'] = id;
        smTemporaryDetailStore.reload();
        win.show();
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('sm-temporaryedit-att').show();
            Ext.getCmp('sm-temporaryedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-temporaryedit-att').hide();
            Ext.getCmp('sm-temporaryedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-temporaryedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadTemporary.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-temporaryedit-attachment').setValue(path);
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
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-temporaryedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-temporaryedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将Temporary提交审批
     * Temporary列表界面，data为undefined，
     * TemporaryEdit界面，data为Temporary.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_submitTemporary.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smTemporaryStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smTemporaryStore.reload();
            }
        });
    },

    /**
     * 完成对Temporary的修改，并提交审批
     */
    saveAndSubmitTemporaryEdit: function (btn) {
        var form = Ext.getCmp('sm-temporaryedit-form');
        form.submit({
            url: 'sm_saveAndSubmitTemporary.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('sm-temporaryedit-id').setValue(id);
                Ext.getCmp('sm-temporaryedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('sm-temporaryedit').hide();
                smTemporaryStore.reload();
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
        smTemporaryDetailRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.sm.TemporaryDetail', {
            'temporaryDetail.pid': Ext.getCmp('sm-temporaryedit-id').getValue()
        });
        smTemporaryDetailStore.insert(0, r);
        smTemporaryDetailRowEditing.startEdit(0, 0);
    },

    /**
     * 查看temporary.id，如果是空，则保存头信息，
     * 返回id填入temporary.id和temporaryDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存Temporary完毕后，如果是新增的Temporary对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {

        var rec = context.record;
        var origId = rec.get('temporaryDetail.id');
        var pid = rec.get('temporaryDetail.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('sm-temporaryedit-form');
            form.submit({
                url: 'sm_createTemporaryDetail.action',
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
                        Ext.getCmp('sm-temporaryedit-id').setValue(head['id']);
                        
                        rec.set('temporaryDetail.id', detail['id']);
                        rec.set('temporaryDetail.pid', detail['pid']);
                        rec.set('temporaryDetail.summary', detail['summary']);
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
                url: 'sm_saveTemporaryDetail.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    var result = Ext.JSON.decode(response.responseText);
                    var summary = result['object']['summary'];
                    rec.set('temporaryDetail.summary', summary);
                    if (Flat.util.isEmpty(rec.get('temporaryDetail.id'))) {
                        var id = result['object']['id'];
                        if (id) {
                            rec.set('temporaryDetail.id', id);
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
     * TemporaryDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["temporaryDetail.id"];
        if(id == "") {
            smTemporaryDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        smTemporaryStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存Temporary头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的Temporary对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('sm-temporaryedit-form');
        form.submit({
            url: 'sm_saveTemporary.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('sm-temporaryedit').hide();
                smTemporaryStore.reload();
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
                    url: 'sm_deleteTemporary.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smTemporaryStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smTemporaryStore.reload();
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
                    url: 'sm_deleteTemporaryDetail.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = smTemporaryDetailStore.findRecord(
                                'temporaryDetail.id', result['object']['id']);
                            smTemporaryDetailStore.remove(model);
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