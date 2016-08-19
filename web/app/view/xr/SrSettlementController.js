Ext.define('iFlat.view.xr.SrSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-srsettlement',

    refresh: function () {
        xrSrSettlementStore.reload();
    },
    
    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'xr_listSrSettlementComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('xr-srsettlementedit');
        if (!win) {
            win = Ext.create('iFlat.view.xr.SrSettlementEdit');
        };
        if (record == undefined) {
            record = Ext.create('iFlat.model.xr.SrSettlement', {
                'xrSrSettlement.dept': Ext.getCmp('global-panel')
                    .getViewModel()
                    .get('user')['porgName'],
                'xrSrSettlement.status': '未提交'
            });
            xrSrSettlementStore.insert(0, record);
        }

        var form = Ext.getCmp('xr-srsettlementedit-form');
        if (record.get('xrSrSettlement.status') != '未提交') {
            xrSrSettlementDetailRowEditing.disable();
            Ext.getCmp('xr-srsettlementedit-detail-delete').setDisabled(true);
            Ext.getCmp('xr-srsettlementedit-detail-add').setDisabled(true);
            Ext.getCmp('xr-srsettlementedit-projno').setEditable(false);
            Ext.getCmp('xr-srsettlementedit-team').setEditable(false);
            Ext.getCmp('xr-srsettlementedit-comment').setEditable(false);
            form.down('textfield[name=xrSrSettlement.score]').setEditable(false);
            form.down('textfield[name=xrSrSettlement.opinion]').setEditable(false);
        } else {
            xrSrSettlementDetailRowEditing.enable();
            Ext.getCmp('xr-srsettlementedit-detail-delete').setDisabled(false);
            Ext.getCmp('xr-srsettlementedit-detail-add').setDisabled(false);
            Ext.getCmp('xr-srsettlementedit-projno').setEditable(true);
            Ext.getCmp('xr-srsettlementedit-team').setEditable(true);
            Ext.getCmp('xr-srsettlementedit-comment').setEditable(true);
            form.down('textfield[name=xrSrSettlement.score]').setEditable(true);
            form.down('textfield[name=xrSrSettlement.opinion]').setEditable(true);
        }
        
        Ext.getCmp('xr-srsettlementedit-form').loadRecord(record);
        var pid = record.get('xrSrSettlement.id')
        if (!Flat.util.isEmpty(pid)) {
            xrSrSettlementDetailStore.getProxy().extraParams['srSettlementDetl.pid'] = pid;
            xrSrSettlementDetailStore.reload();
        } else {
            xrSrSettlementDetailStore.removeAll();
        }
        win.show();
    },

    /**
     * 选择工号时，在隐藏单元格中保存船名
     */
    onProjNoChange: function (combo, record, eOpts) {
        Ext.getCmp('xr-srsettlementedit-projname').setValue(record.get('xrProject.name'));
    },

    /**
     * 选择项目
     */
    onSrStandardPriceChange: function (combo, record, eOpts) {
        Ext.getCmp('xr-srsettlementedit-detail-content').setValue(record.get('srStandardPrice.content'));
    },

    onApplyContentChange: function (textarea, newV, oldV, eOpts) {
        var record = xrSrStandardPriceComboStore.findRecord('srStandardPrice.content', newV);
        if (!Flat.util.isEmpty(record)) {
            Ext.getCmp('xr-srsettlementedit-detail-category').setValue(record.get('srStandardPrice.category'));
            Ext.getCmp('xr-srsettlementedit-detail-specs').setValue(record.get('srStandardPrice.specs'));
            Ext.getCmp('xr-srsettlementedit-detail-quotaunit').setValue(record.get('srStandardPrice.quota'));
            Ext.getCmp('xr-srsettlementedit-detail-unit').setValue(record.get('srStandardPrice.unit'));
            Ext.getCmp('xr-srsettlementedit-detail-degree').setValue(record.get('srStandardPrice.degree'));
            Ext.getCmp('xr-srsettlementedit-detail-price').setValue(record.get('srStandardPrice.price'));
            Ext.getCmp('xr-srsettlementedit-detail-price2').setValue(record.get('srStandardPrice.price'));
            Ext.getCmp('xr-srsettlementedit-detail-isquota').setValue(record.get('srStandardPrice.isQuota'))
            
        } else {
            Ext.getCmp('xr-srsettlementedit-detail-category').setValue(null);
            Ext.getCmp('xr-srsettlementedit-detail-specs').setValue(null);
            Ext.getCmp('xr-srsettlementedit-detail-quotaunit').setValue(0);
            Ext.getCmp('xr-srsettlementedit-detail-unit').setValue(null);
            Ext.getCmp('xr-srsettlementedit-detail-degree').setValue(0);
            Ext.getCmp('xr-srsettlementedit-detail-price').setValue(0);
            Ext.getCmp('xr-srsettlementedit-detail-price2').setValue(0);
            Ext.getCmp('xr-srsettlementedit-detail-isquota').setValue(false)
        }
    },
    
    calcQuota: function () {
        var quotaUnit = Ext.getCmp('xr-srsettlementedit-detail-quotaunit').getValue();
        var qty = Ext.getCmp('xr-srsettlementedit-detail-applyqty').getValue();
        Ext.getCmp('xr-srsettlementedit-detail-quota').setValue(quotaUnit * qty);
    },

    onApplyQtyChange: function() {
        var isQuota = Ext.getCmp('xr-srsettlementedit-detail-isquota').getValue();
        var qty = Ext.getCmp('xr-srsettlementedit-detail-applyqty').getValue();
        if (isQuota) {
            var quotaUnit = Ext.getCmp('xr-srsettlementedit-detail-quotaunit').getValue();
            Ext.getCmp('xr-srsettlementedit-detail-quota').setValue(quotaUnit * qty);
        } else {
            var degree = Ext.getCmp('xr-srsettlementedit-detail-degree').getValue();
            var price = Ext.getCmp('xr-srsettlementedit-detail-price').getValue();
            Ext.getCmp('xr-srsettlementedit-detail-amount').setValue(degree * price * qty);
            Ext.getCmp('xr-srsettlementedit-detail-amount2').setValue(degree * price * qty);
        }
    },

    calcAmount: function() {
        var degree = Ext.getCmp('xr-srsettlementedit-detail-degree').getValue();
        var isQuota = Ext.getCmp('xr-srsettlementedit-detail-isquota').getValue();
        var price = Ext.getCmp('xr-srsettlementedit-detail-price').getValue();
        var amount = 0;
        if (isQuota) {
            var quota = Ext.getCmp('xr-srsettlementedit-detail-quota').getValue();
            amount = price * quota * degree;
        } else {
            var qty = Ext.getCmp('xr-srsettlementedit-detail-applyqty').getValue();
            amount = price * qty * degree;
        }
        Ext.getCmp('xr-srsettlementedit-detail-amount').setValue(amount);
        Ext.getCmp('xr-srsettlementedit-detail-amount2').setValue(amount);
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('xr-srsettlementedit-att').show();
            Ext.getCmp('xr-srsettlementedit-link').setHref(newValue);
        } else {
            Ext.getCmp('xr-srsettlementedit-att').hide();
            Ext.getCmp('xr-srsettlementedit-link').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('xr-srsettlementedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'xr_uploadSrSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('xr-srsettlementedit-attachment').setValue(path);
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
                    url: 'xr_deleteFile.action?filePath=' + Ext.getCmp('xr-srsettlementedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('xr-srsettlementedit-attachment').setValue('');
            };
        })
    },

    /**
     * 将SrSettlement提交审批
     * SrSettlement列表界面，data为undefined，
     * SrSettlementEdit界面，data为SrSettlement.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'xr_submitSrSettlement.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                xrSrSettlementStore.reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                xrSrSettlementStore.reload();
            }
        });
    },

    /**
     * 完成对SrSettlement的修改，并提交审批
     */
    saveAndSubmitSrSettlementEdit: function (btn) {
        var form = Ext.getCmp('xr-srsettlementedit-form');
        form.submit({
            url: 'xr_saveAndSubmitSrSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                var result = Ext.JSON.decode(action.response.responseText);
                var id = result['object']['id'];
                var status = result['object']['status'];
                // 将edit界面的id值设置为返回id
                Ext.getCmp('xr-srsettlementedit-id').setValue(id);
                Ext.getCmp('xr-srsettlementedit-status').setValue(status);
                // 将明细项的pid设置为返回id值
                Ext.getCmp('xr-srsettlementedit').hide();
                xrSrSettlementStore.reload();
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
        xrSrSettlementDetailRowEditing.cancelEdit();
        debugger
        var r = Ext.create('iFlat.model.xr.SrSettlementDetl', {
            'srSettlementDetl.pid': Ext.getCmp('xr-srsettlementedit-id').getValue()
        });
        xrSrSettlementDetailStore.insert(0, r);
        xrSrSettlementDetailRowEditing.startEdit(0, 0);
    },
    
    /**
     * 查看xrSrSettlement.id，如果是空，则保存头信息，
     * 返回id填入xrSrSettlement.id和srSettlementDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存SrSettlement完毕后，如果是新增的SrSettlement对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {
        
        var rec = context.record;
        rec.set('srSettlementDetl.adjustContent', rec.get('srSettlementDetl.applyContent'));
        rec.set('srSettlementDetl.adjustQty', rec.get('srSettlementDetl.applyQty'));
        var pid = rec.get('xrSrSettlementDetl.pid');
        if (Flat.util.isEmpty(pid)) {
            var form = Ext.getCmp('xr-srsettlementedit-form');
            if (form.isValid()) {
                form.submit({
                    url: 'xr_createSrSettlementDetl.action',
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
                            Ext.getCmp('xr-srsettlementedit-id').setValue(head['id']);

                            rec.set('srSettlementDetl.id', detail['id']);
                            rec.set('srSettlementDetl.pid', detail['pid']);
                        } else {
                            xrSrSettlementDetailStore.reload();
                        }
                    },
                    failure: function(form, action) {
                        Flat.util.tip(action.response.responseText);
                        xrSrSettlementDetailStore.reload();
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
                url: 'xr_saveSrSettlementDetl.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('srSettlementDetl.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (id) {
                            rec.set(
                                'srSettlementDetl.id', id);
                            xrSrSettlementDetailStore.insert(0, rec);
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
     * SrSettlementDetail信息退出编辑时，删除未保存的信息
     */
    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srSettlementDetl.id"];
        if(id == "") {
            xrSrSettlementDetailStore.remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function () {
        xrSrSettlementStore.reload();
    },

    /**
     * 点击右下角保存按钮时，保存SrSettlement头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的SrSettlement对象，则启动流程
     */
    saveEdit: function () {
        var form = Ext.getCmp('xr-srsettlementedit-form');
        form.submit({
            url: 'xr_saveSrSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                Ext.getCmp('xr-srsettlementedit').hide();
                xrSrSettlementStore.reload();
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
                    url: 'xr_deleteSrSettlement.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        xrSrSettlementStore.remove(record);
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        xrSrSettlementStore.reload();
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
                    url: 'xr_deleteSrSettlementDetl.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = xrSrSettlementDetailStore.findRecord(
                                'srSettlementDetl.id', result['object']['id']);
                            xrSrSettlementDetailStore.remove(model);
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
                url: 'xr_importSrSettlement.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    xrSrSettlementStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'xr_templateSrSettlement.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
});