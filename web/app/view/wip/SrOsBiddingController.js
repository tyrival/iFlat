Ext.define('iFlat.view.wip.SrOsBiddingController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-srosbidding',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        var store = Ext.create('iFlat.store.workflow.BusinessObj', {
            model: 'iFlat.model.wip.SrOutsource',
            proxy: {
                extraParams: {
                    'processInstanceId': newValue
                }
            }
        });
        store.reload({
            callback: function(records, option, success) {
                Flat.util.unmask();
                if (!success) {
                    Flat.util.tip(response.responseText);
                } else {
                    if (records != null && records.length > 0) {
                        var record = records[0];
                        record.set('id', newValue);
                        record.set('comment', '');
                        var form = field.up('form');
                        form.loadRecord(record);

                        var id = record.get('srOutsource.id');
                        srOsBiddingDetailStore.getProxy().extraParams['srOutsourceDetl.pid'] = id;
                        srOsBiddingDetailStore.reload();
                    }
                }
            }
        })
    },

    loadCheckbox: function (tf, newV, oldV) {
        tf.nextSibling('checkbox').setValue(newV);
    },

    // 刷新grid数据
    refresh: function (btn) {
        btn.up('grid').getStore().reload()
    },

    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },

    completeTask: function (btn) {
        var panel = btn.up('wip-srosbidding');
        var form = panel.down('form');
        var comment = form.down('textarea[name=comment]');
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        var param = {
            'outGoingName': text
        }
        if (Flat.util.isEmpty(comment.getValue())) {
            var c = text === 'pass' ? '同意' : '不同意';
            comment.setValue(c);
        }
        var url = 'wip_approveSrOutsource.action';
        if (text == 'pass') {
            url = 'wip_approveSrOutsourceWithSave.action';
        }
        var canSubmit = false;
        if (form.isValid() || text != 'pass') {
            canSubmit = true;
        }
        var vali = true;
        if (text != 'pass') {
            vali = false;
        }
        if (canSubmit) {
            form.submit({
                clientValidation: vali,
                url: url,
                waitMsg: '提交中...',
                method: 'POST',
                params: param,
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    form.down('textarea[name=comment]').setValue('');
                    form.up('window').hide()
                    workflowTaskStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    form.down('textarea[name=comment]').setValue('');
                    form.up('window').hide()
                    workflowTaskStore.reload();
                }
            })
        }
    },

    showComment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'wip_listSrOutsourceComment.action',
                extraParams: {
                    'srOutsource.id':
                        grid.up('window').down('textfield[name=srOutsource.id]').getValue()
                }
            }
        }))
        win.show();
    },

    editBidding: function () {
        var id = Ext.getCmp('wip-srosbidding-id').getValue();
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-srosbiddinglist');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOsBiddingList');
            }
            win.down('textfield[name=srOutsource.id]').setValue(id);
            wipSrOsBiddingListStore.getProxy().extraParams['srOsBidding.pid'] = id;
            wipSrOsBiddingListStore.reload();
            win.show();
        }
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srosbidding-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('wip-srosbidding-att2').show();
            Ext.getCmp('wip-srosbidding-link2').setHref(newValue);
        } else {
            Ext.getCmp('wip-srosbidding-att2').hide();
            Ext.getCmp('wip-srosbidding-link2').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment2: function(btn) {
        var form = Ext.getCmp('wip-srosbidding-upload2');
        if (form.isValid()) {
            form.submit({
                url: 'wip_uploadSrOutsource.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('wip-srosbidding-attachment2').setValue(path);
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
    deleteAttachment2: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'wip_deleteFile.action?filePath=' + Ext.getCmp('wip-srosbidding-attachment2').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('wip-srosbidding-attachment2').setValue('');
            };
        })
    },
    deleteRecord: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('srOsBidding.id');
        if(id == undefined || id == '') {
            wipSrOsBiddingListStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'wip_deleteSrOsBidding.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                wipSrOsBiddingListStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        wipSrOsBiddingListStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srOsBidding.id"];
        if(id == "") {
            wipSrOsBiddingListStore.remove(context.record);
        }
    },

    updateRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'wip_saveSrOsBidding.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                wipSrOsBiddingListStore.reload();
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
                wipSrOsBiddingListStore.reload();
            }
        });
    },

    addRecord: function(btn) {
        wipSrOsBiddingListRowEditing.cancelEdit();
        var srosbiddinglist = Ext.create('iFlat.model.wip.SrOsBidding', {
            'srOsBidding.pid': btn.up('window').down('textfield[name=srOutsource.id]').getValue()
        });
        wipSrOsBiddingListStore.insert(0, srosbiddinglist);
        wipSrOsBiddingListRowEditing.startEdit(0, 0);
    },
});