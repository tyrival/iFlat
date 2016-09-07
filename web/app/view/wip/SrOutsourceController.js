Ext.define('iFlat.view.wip.SrOutsourceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-sroutsource',

    refresh: function () {
        wipSrOutsourceStore.reload();
    },

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'wip_listSrOutsourceComment.action',
                extraParams: {
                    'srOutsource.id': record.get('srOutsource.id')
                }
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('wip-sroutsourceedit');
        if (!win) {
            win = Ext.create('iFlat.view.wip.SrOutsourceEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.wip.SrOutsource', {
                'srOutsource.status': '未提交'
            });
            wipSrOutsourceStore.insert(0, record);
        }

        var form = Ext.getCmp('wip-sroutsourceedit-form');
        if (record.get('srOutsource.status') != '未提交') {
            wipSrOutsourceDetailRowEditing.disable();
            Ext.getCmp('wip-sroutsourceedit-toolbar').setDisabled(true);
            Ext.getCmp('wip-sroutsourceedit-detail-delete').setDisabled(true);
            Ext.getCmp('wip-sroutsourceedit-detail-add').setDisabled(true);
        } else {
            wipSrOutsourceDetailRowEditing.enable();
            Ext.getCmp('wip-sroutsourceedit-toolbar').setDisabled(false);
            Ext.getCmp('wip-sroutsourceedit-detail-delete').setDisabled(false);
            Ext.getCmp('wip-sroutsourceedit-detail-add').setDisabled(false);
        }

        Ext.getCmp('wip-sroutsourceedit-form').loadRecord(record);
        var pid = record.get('srOutsource.id')
        if (!Flat.util.isEmpty(pid)) {
            wipSrOutsourceDetailStore.getProxy().extraParams['srOutsourceDetl.pid'] = pid;
            wipSrOutsourceDetailStore.reload();
        } else {
            wipSrOutsourceDetailStore.removeAll();
        }
        win.show();
    },

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('wip-sroutsourceedit-projname').setValue(record.get('rptProject.name'));
        Ext.getCmp('wip-sroutsourceedit-projtype').setValue(record.get('rptProject.category'));
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('wip-sroutsourceedit-att').show();
            Ext.getCmp('wip-sroutsourceedit-link').setHref(newValue);
        } else {
            Ext.getCmp('wip-sroutsourceedit-att').hide();
            Ext.getCmp('wip-sroutsourceedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('wip-sroutsourceedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'wip_uploadSrOutsource.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('wip-sroutsourceedit-attachment').setValue(path);
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
                    url: 'wip_deleteFile.action?filePath=' + Ext.getCmp('wip-sroutsourceedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('wip-sroutsourceedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将SrOutsource提交审批
     * SrOutsource列表界面，data为undefined，
     * sroutsourceedit界面，data为SrOutsource.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'wip_submitSrOutsource.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                wipSrOutsourceStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                wipSrOutsourceStore.reload();
            }
        });
    },

    /**
     * 完成对SrOutsource的修改，并提交审批
     */
    saveAndSubmitSrOutsourceEdit: function (btn) {
        var form = Ext.getCmp('wip-sroutsourceedit-form');
        form.submit({
            url: 'wip_saveAndSubmitSrOutsource.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('wip-sroutsourceedit-id').setValue(id);
                Ext.getCmp('wip-sroutsourceedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('wip-sroutsourceedit').hide();
                wipSrOutsourceStore.reload();
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
        wipSrOutsourceDetailRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.wip.SrOutsourceDetl', {
            'srOutsourceDetl.pid': Ext.getCmp('wip-sroutsourceedit-id').getValue()
        });
        wipSrOutsourceDetailStore.insert(0, r);
        wipSrOutsourceDetailRowEditing.startEdit(0, 0);
    },

    /**
     * 查看srOutsource.id，如果是空，则保存头信息，
     * 返回id填入srOutsource.id和srOutsourceDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存SrOutsource完毕后，如果是新增的SrOutsource对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {

        var rec = context.record;
        var pid = rec.get('wipSrOutsourceDetl.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('wip-sroutsourceedit-form');
            if (form.isValid()) {
                form.submit({
                    url: 'wip_createSrOutsourceDetl.action',
                    waitMsg: '保存中...',
                    params: rec.getData(),
                    success: function(form, action) {
                        Flat.util.tip(action.response.responseText);
                        debugger
                        var result = Ext.JSON.decode(action.response.responseText);
                        var map = result['map'];
                        if (!Flat.util.isEmpty(map)) {
                            var head = map['head'];
                            var detail = map['detail'];
                            // 将edit界面的id值设置为返回id
                            Ext.getCmp('wip-sroutsourceedit-id').setValue(head['id']);

                            rec.set('srOutsourceDetl.id', detail['id']);
                            rec.set('srOutsourceDetl.pid', detail['pid']);
                        } else {
                            wipSrOutsourceDetailStore.reload();
                        }
                    },
                    failure: function(form, action) {
                        Flat.util.tip(action.response.responseText);
                        wipSrOutsourceDetailStore.reload();
                    }
                });
            } else {
                Ext.Msg.show({
                    title:'提示',
                    message: '请先选择工程名和施工队。',
                })
            }
        } else {
            Flat.util.mask();
            Ext.Ajax.request({
                url: 'wip_saveSrOutsourceDetl.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('srOutsourceDetl.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (id) {
                            rec.set(
                                'srOutsourceDetl.id', id);
                            wipSrOutsourceDetailStore.insert(0, rec);
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
     * SrOutsourceDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srOutsourceDetl.id"];
        if(id == "") {
            wipSrOutsourceDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        wipSrOutsourceStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存SrOutsource头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的SrOutsource对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('wip-sroutsourceedit-form');
        form.submit({
            url: 'wip_saveSrOutsource.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('wip-sroutsourceedit').hide();
                wipSrOutsourceStore.reload();
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
                    url: 'wip_deleteSrOutsource.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        wipSrOutsourceStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        wipSrOutsourceStore.reload();
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
                    url: 'wip_deleteSrOutsourceDetl.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = wipSrOutsourceDetailStore.findRecord(
                                'srOutsourceDetl.id', result['object']['id']);
                            wipSrOutsourceDetailStore.remove(model);
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


    uploadFile: function(btn) {
        var form = btn.previousSibling('form');
        if (form.isValid()) {
            form.submit({
                url: 'wip_importSrOutsource.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    wipSrOutsourceStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'wip_templateSrOutsource.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
});