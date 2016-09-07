Ext.define('iFlat.view.xr.SrWorkshopSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-srworkshopaettlement',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        var store = Ext.create('iFlat.store.workflow.BusinessObj', {
            model: 'iFlat.model.xr.SrSettlement',
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
                        var form = Ext.getCmp('xr-srworkshopaettlement-form');
                        form.loadRecord(record);

                        var id = record.get('xrSrSettlement.id');
                        srWorkshopSettlementDetailStore.getProxy().extraParams['srSettlementDetl.pid'] = id;
                        srWorkshopSettlementDetailStore.reload({
                            callback: function () {
                                var amount = 0;
                                for (var i = 0; i < srWorkshopSettlementDetailStore.getCount(); i++) {
                                    amount += srWorkshopSettlementDetailStore.getAt(i).get('srSettlementDetl.amountSecond');
                                }
                                Ext.getCmp('xr-srworkshopaettlement-amountsecond-sum').setValue(amount);
                            }
                        });
                    }
                }
            }
        })
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
        debugger
        var amount = Ext.getCmp('xr-srworkshopaettlement-amountsecond-act').getValue();
        if (amount == 0) {
            this.calcAmountSecondSum();
        }
        var first = Ext.getCmp('xr-srworkshopaettlement-amountfirst-act').getValue();
        var second = Ext.getCmp('xr-srworkshopaettlement-amountsecond-act').getValue();
        if (first < second && Flat.util.isEmpty(Ext.getCmp('xr-srworkshopaettlement-balapplatt').getValue())) {
            Ext.Msg.show({
                title:'提示',
                message: '由于二级结算超过一级总额，请先上传《劳务工费二级结算超支审批表》后，才可通过/退回。',
            })
            return false;
        }
        var panel = btn.up('xr-srworkshopaettlement');
        var form = Ext.getCmp('xr-srworkshopaettlement-form');
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
        var url = 'xr_approveSrSettlement.action';
        if (text == 'pass') {
            url = 'xr_approveSrSettlementWithSave.action';
        }
        var canSubmit = false;
        if (form.isValid() || text != 'pass') {
            canSubmit = true
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
                    form.down('textfield[name=xrSrSettlement.amountSecond]').setValue(0);
                    form.up('window').hide()
                    workflowTaskStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    form.down('textarea[name=comment]').setValue('');
                    form.down('textfield[name=xrSrSettlement.amountSecond]').setValue(0);
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
                url: 'xr_listSrSettlementComment.action',
                extraParams: {
                    'xrSrSettlement.id':
                        grid.up('window').down('textfield[name=xrSrSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    showAssess: function (button) {
        var win = Ext.getCmp('xr-srassess');
        if (!win) {
            win = Ext.create('iFlat.view.xr.SrAssess');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.xr.SrAssess', {
            proxy: {
                url: 'xr_listSrAssess.action',
                extraParams: {
                    'srAssess.settId':
                        button.up('window').down('textfield[name=xrSrSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-srworkshopaettlement-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    updateDetail: function(editor, context, eOpts) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'xr_saveSrSettlementDetl.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                srWorkshopSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < srWorkshopSettlementDetailStore.getCount(); i++) {
                            amount += srWorkshopSettlementDetailStore.getAt(i).get('srSettlementDetl.amountSecond');
                        }
                        var score = Ext.getCmp('xr-srworkshopaettlement-score').getValue();
                        Ext.getCmp('xr-srworkshopaettlement-amountsecond-sum').setValue(amount);
                        Ext.getCmp('xr-srworkshopaettlement-amountsecond-act').setValue(amount * score / 100);
                    }
                });
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                srWorkshopSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < srWorkshopSettlementDetailStore.getCount(); i++) {
                            amount += srWorkshopSettlementDetailStore.getAt(i).get('srSettlementDetl.amountSecond');
                        }
                        var score = Ext.getCmp('xr-srworkshopaettlement-score').getValue();
                        Ext.getCmp('xr-srworkshopaettlement-amountsecond-sum').setValue(amount);
                        Ext.getCmp('xr-srworkshopaettlement-amountsecond-act').setValue(amount * score / 100);
                    }
                });
            }
        });
    },
    
    calcAmountSecond: function(tf, newV, oldV) {
        var isQuota = Ext.getCmp('xr-srworkshopaettlement-isquota').getValue();
        var degree = Ext.getCmp('xr-srworkshopaettlement-degree').getValue();
        var amount;
        if (isQuota) {
            var quota = Ext.getCmp('xr-srworkshopaettlement-quota').getValue();
            amount = newV * quota * degree;
        } else {
            var qty = Ext.getCmp('xr-srworkshopaettlement-adjustqty').getValue();
            amount = newV * qty * degree;
        }
        Ext.getCmp('xr-srworkshopaettlement-amountsecond').setValue(amount);
    },

    calcAmountSecondSum: function (cmp, newV, oldV, op) {
        var amount = 0;
        for (var i = 0; i < srWorkshopSettlementDetailStore.getCount(); i++) {
            amount += srWorkshopSettlementDetailStore.getAt(i).get('srSettlementDetl.amountSecond');
        }
        var score = Ext.getCmp('xr-srworkshopaettlement-score').getValue();
        Ext.getCmp('xr-srworkshopaettlement-amountsecond-sum').setValue(amount);
        Ext.getCmp('xr-srworkshopaettlement-amountsecond-act').setValue(amount * score / 100);
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('xr-srworkshopaettlement-upload');
        if (form.isValid()) {
            form.submit({
                url: 'xr_uploadSrSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('xr-srworkshopaettlement-balapplatt').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('xr-srworkshopaettlement-att2').show();
            Ext.getCmp('xr-srworkshopaettlement-link2').setHref(newValue);
        } else {
            Ext.getCmp('xr-srworkshopaettlement-att2').hide();
            Ext.getCmp('xr-srworkshopaettlement-link2').setHref('');
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'xr_deleteFile.action?filePath=' + Ext.getCmp('xr-srworkshopaettlement-balapplatt').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('xr-srworkshopaettlement-balapplatt').setValue('');
            };
        })
    },

});