Ext.define('iFlat.view.xr.TrSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-trsettlement',

    refresh: function () {
        trSettlementStore.reload();
    },
    
    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'xr_listTrSettlementComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('xr-trsettlementedit');
        if (!win) {
            win = Ext.create('iFlat.view.xr.TrSettlementEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.xr.TrSettlement', {
                'trSettlement.status': '未提交'
            });
            trSettlementStore.insert(0, record);
        }

        var form = Ext.getCmp('xr-trsettlementedit-form');
        if (record.get('trSettlement.status') != '未提交') {
            trSettlementDetailRowEditing.disable();
            Ext.getCmp('xr-trsettlementedit-detail-delete').setDisabled(true);
            Ext.getCmp('xr-trsettlementedit-detail-add').setDisabled(true);
            Ext.getCmp('xr-trsettlementedit-projno').setEditable(false);
            Ext.getCmp('xr-trsettlementedit-dept').setDisabled(true);
            Ext.getCmp('xr-trsettlementedit-team').setEditable(false);
            Ext.getCmp('xr-trsettlementedit-comment').setEditable(false);
            Ext.getCmp('xr-trsettlementedit-reason').setEditable(false);
        } else {
            trSettlementDetailRowEditing.enable();
            Ext.getCmp('xr-trsettlementedit-detail-delete').setDisabled(false);
            Ext.getCmp('xr-trsettlementedit-detail-add').setDisabled(false);
            Ext.getCmp('xr-trsettlementedit-projno').setEditable(true);
            Ext.getCmp('xr-trsettlementedit-dept').setDisabled(false);
            Ext.getCmp('xr-trsettlementedit-team').setEditable(true);
            Ext.getCmp('xr-trsettlementedit-comment').setEditable(true);
            Ext.getCmp('xr-trsettlementedit-reason').setEditable(true);
        }
        
        Ext.getCmp('xr-trsettlementedit-form').loadRecord(record);
        var pid = record.get('trSettlement.id')
        if (!Flat.util.isEmpty(pid)) {
            trSettlementDetailStore.getProxy().extraParams['trSettlementDetl.pid'] = pid;
            trSettlementDetailStore.reload();
        } else {
            trSettlementDetailStore.removeAll();
        }
        win.show();
    },

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('xr-trsettlementedit-projname').setValue(record.get('xrProject.name'));
    },
/*

    /!**
     * 选择项目
     *!/
    onSrStandardPriceChange: function (combo, record, eOpts) {
        Ext.getCmp('xr-trsettlementedit-detail-content').setValue(record.get('srStandardPrice.content'));
    },

    onApplyContentChange: function (textarea, newV, oldV, eOpts) {
        var record = xrSrStandardPriceComboStore.findRecord('srStandardPrice.content', newV);
        if (!Flat.util.isEmpty(record)) {
            Ext.getCmp('xr-trsettlementedit-detail-category').setValue(record.get('srStandardPrice.category'));
            Ext.getCmp('xr-trsettlementedit-detail-specs').setValue(record.get('srStandardPrice.specs'));
            Ext.getCmp('xr-trsettlementedit-detail-quotaunit').setValue(record.get('srStandardPrice.quota'));
            Ext.getCmp('xr-trsettlementedit-detail-unit').setValue(record.get('srStandardPrice.unit'));
            Ext.getCmp('xr-trsettlementedit-detail-degree').setValue(record.get('srStandardPrice.degree'));
            Ext.getCmp('xr-trsettlementedit-detail-price').setValue(record.get('srStandardPrice.price'));
            Ext.getCmp('xr-trsettlementedit-detail-price2').setValue(record.get('srStandardPrice.price'));
            Ext.getCmp('xr-trsettlementedit-detail-isquota').setValue(record.get('srStandardPrice.isQuota'))
            
        } else {
            Ext.getCmp('xr-trsettlementedit-detail-category').setValue(null);
            Ext.getCmp('xr-trsettlementedit-detail-specs').setValue(null);
            Ext.getCmp('xr-trsettlementedit-detail-quotaunit').setValue(0);
            Ext.getCmp('xr-trsettlementedit-detail-unit').setValue(null);
            Ext.getCmp('xr-trsettlementedit-detail-degree').setValue(0);
            Ext.getCmp('xr-trsettlementedit-detail-price').setValue(0);
            Ext.getCmp('xr-trsettlementedit-detail-price2').setValue(0);
            Ext.getCmp('xr-trsettlementedit-detail-isquota').setValue(false)
        }
    },
    
    calcQuota: function () {
        var quotaUnit = Ext.getCmp('xr-trsettlementedit-detail-quotaunit').getValue();
        var qty = Ext.getCmp('xr-trsettlementedit-detail-applyqty').getValue();
        Ext.getCmp('xr-trsettlementedit-detail-quota').setValue(quotaUnit * qty);
    },

    onApplyQtyChange: function() {
        var isQuota = Ext.getCmp('xr-trsettlementedit-detail-isquota').getValue();
        var qty = Ext.getCmp('xr-trsettlementedit-detail-applyqty').getValue();
        if (isQuota) {
            var quotaUnit = Ext.getCmp('xr-trsettlementedit-detail-quotaunit').getValue();
            Ext.getCmp('xr-trsettlementedit-detail-quota').setValue(quotaUnit * qty);
        } else {
            var degree = Ext.getCmp('xr-trsettlementedit-detail-degree').getValue();
            var price = Ext.getCmp('xr-trsettlementedit-detail-price').getValue();
            Ext.getCmp('xr-trsettlementedit-detail-amount').setValue(degree * price * qty);
            Ext.getCmp('xr-trsettlementedit-detail-amount2').setValue(degree * price * qty);
        }
    },

    calcAmount: function() {
        var degree = Ext.getCmp('xr-trsettlementedit-detail-degree').getValue();
        var isQuota = Ext.getCmp('xr-trsettlementedit-detail-isquota').getValue();
        var price = Ext.getCmp('xr-trsettlementedit-detail-price').getValue();
        var amount = 0;
        if (isQuota) {
            var quota = Ext.getCmp('xr-trsettlementedit-detail-quota').getValue();
            amount = price * quota * degree;
        } else {
            var qty = Ext.getCmp('xr-trsettlementedit-detail-applyqty').getValue();
            amount = price * qty * degree;
        }
        Ext.getCmp('xr-trsettlementedit-detail-amount').setValue(amount);
        Ext.getCmp('xr-trsettlementedit-detail-amount2').setValue(amount);
    },
*/

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('xr-trsettlementedit-att').show();
            Ext.getCmp('xr-trsettlementedit-link').setHref(newValue);
        } else {
            Ext.getCmp('xr-trsettlementedit-att').hide();
            Ext.getCmp('xr-trsettlementedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('xr-trsettlementedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'xr_uploadTrSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('xr-trsettlementedit-attachment').setValue(path);
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
                    url: 'xr_deleteFile.action?filePath=' + Ext.getCmp('xr-trsettlementedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('xr-trsettlementedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将TrSettlement提交审批
     * TrSettlement列表界面，data为undefined，
     * TrSettlementEdit界面，data为TrSettlement.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'xr_submitTrSettlement.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                trSettlementStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                trSettlementStore.reload();
            }
        });
    },

    /**
     * 完成对TrSettlement的修改，并提交审批
     */
    saveAndSubmitTrSettlementEdit: function (btn) {
        var form = Ext.getCmp('xr-trsettlementedit-form');
        form.submit({
            url: 'xr_saveAndSubmitTrSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('xr-trsettlementedit-id').setValue(id);
                Ext.getCmp('xr-trsettlementedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('xr-trsettlementedit').hide();
                trSettlementStore.reload();
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
        trSettlementDetailRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.xr.TrSettlementDetl', {
            'trSettlementDetl.pid': Ext.getCmp('xr-trsettlementedit-id').getValue()
        });
        trSettlementDetailStore.insert(0, r);
        trSettlementDetailRowEditing.startEdit(0, 0);
    },
    
    /**
     * 查看trSettlement.id，如果是空，则保存头信息，
     * 返回id填入trSettlement.id和trSettlementDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存TrSettlement完毕后，如果是新增的TrSettlement对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {
        
        var rec = context.record;
        var pid = rec.get('trSettlementDetl.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('xr-trsettlementedit-form');
            if (form.isValid()) {
                form.submit({
                    url: 'xr_createTrSettlementDetl.action',
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
                            Ext.getCmp('xr-trsettlementedit-id').setValue(head['id']);

                            rec.set('trSettlementDetl.id', detail['id']);
                            rec.set('trSettlementDetl.pid', detail['pid']);
                        } else {
                            trSettlementDetailStore.reload();
                        }
                    },
                    failure: function(form, action) {
                        Flat.util.tip(action.response.responseText);
                        trSettlementDetailStore.reload();
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
                url: 'xr_saveTrSettlementDetl.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('trSettlementDetl.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (id) {
                            rec.set(
                                'trSettlementDetl.id', id);
                            trSettlementDetailStore.insert(0, rec);
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
     * TrSettlementDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["trSettlementDetl.id"];
        if(id == "") {
            trSettlementDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        trSettlementStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存TrSettlement头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的TrSettlement对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('xr-trsettlementedit-form');
        form.submit({
            url: 'xr_saveTrSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('xr-trsettlementedit').hide();
                trSettlementStore.reload();
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
                    url: 'xr_deleteTrSettlement.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        trSettlementStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        trSettlementStore.reload();
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
                    url: 'xr_deleteTrSettlementDetl.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = trSettlementDetailStore.findRecord(
                                'trSettlementDetl.id', result['object']['id']);
                            trSettlementDetailStore.remove(model);
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
                url: 'xr_importTrSettlement.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    trSettlementStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'xr_templateTrSettlement.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
});