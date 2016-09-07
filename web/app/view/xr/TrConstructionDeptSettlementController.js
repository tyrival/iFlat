Ext.define('iFlat.view.xr.TrConstructionDeptSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-trconstructiondeptaettlement',

    // 根据processInstanceId查询对应的business对象，加载到form中，并刷新grid数据
    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask('加载中...');
        var store = Ext.create('iFlat.store.workflow.BusinessObj', {
            model: 'iFlat.model.xr.TrSettlement',
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
                        var form = Ext.getCmp('xr-trconstructiondeptaettlement-form');
                        form.loadRecord(record);

                        var id = record.get('trSettlement.id');
                        trConstructionDeptSettlementDetailStore.getProxy().extraParams['trSettlementDetl.pid'] = id;
                        trConstructionDeptSettlementDetailStore.reload({
                            callback: function () {
                                var amount = 0;
                                for (var i = 0; i < trConstructionDeptSettlementDetailStore.getCount(); i++) {
                                    amount += trConstructionDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountSecond');
                                }
                                Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-sum').setValue(amount);
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
        var amount = Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-act').getValue();
        if (amount == 0) {
            this.calcAmountSecondSum();
        }
        var first = Ext.getCmp('xr-trconstructiondeptaettlement-amountfirst-act').getValue();
        var second = Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-act').getValue();
        if (first < second && Flat.util.isEmpty(Ext.getCmp('xr-trconstructiondeptaettlement-balapplatt').getValue())) {
            Ext.Msg.show({
                title:'提示',
                message: '由于二级结算超过一级总额，请先上传《劳务工费二级结算超支审批表》后，才可通过/退回。',
            })
            return false;
        }
        var panel = btn.up('xr-trconstructiondeptaettlement');
        var form = Ext.getCmp('xr-trconstructiondeptaettlement-form');
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
        var url = 'xr_approveTrSettlement.action';
        if (text == 'pass') {
            url = 'xr_approveTrSettlementWithSave.action';
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
                    form.down('textfield[name=trSettlement.amountSecond]').setValue(0);
                    form.up('window').hide()
                    workflowTaskStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    form.down('textarea[name=comment]').setValue('');
                    form.down('textfield[name=trSettlement.amountSecond]').setValue(0);
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
                url: 'xr_listTrSettlementComment.action',
                extraParams: {
                    'trSettlement.id':
                        grid.up('window').down('textfield[name=trSettlement.id]').getValue()
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
                        button.up('window').down('textfield[name=trSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },
    
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('xr-trconstructiondeptaettlement-down');
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
            url: 'xr_saveTrSettlementDetl.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                trConstructionDeptSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < trConstructionDeptSettlementDetailStore.getCount(); i++) {
                            amount += trConstructionDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountSecond');
                        }
                        var score = Ext.getCmp('xr-trconstructiondeptaettlement-score').getValue();
                        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-sum').setValue(amount);
                        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-act').setValue(amount * score / 100);
                    }
                });
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                trConstructionDeptSettlementDetailStore.reload({
                    callback: function () {
                        var amount = 0;
                        for (var i = 0; i < trConstructionDeptSettlementDetailStore.getCount(); i++) {
                            amount += trConstructionDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountSecond');
                        }
                        var score = Ext.getCmp('xr-trconstructiondeptaettlement-score').getValue();
                        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-sum').setValue(amount);
                        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-act').setValue(amount * score / 100);
                    }
                });
            }
        });
    },
    
    calcAmountSecond: function(tf, newV, oldV) {
        var degree = Ext.getCmp('xr-trconstructiondeptaettlement-degree').getValue();
        var price = Ext.getCmp('xr-trconstructiondeptaettlement-pricesecond').getValue();
        var qty = Ext.getCmp('xr-trconstructiondeptaettlement-settleqtysecond').getValue();
        var amount = degree * price * qty;
        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond').setValue(amount);
    },

    calcAmountSecondSum: function (cmp, newV, oldV, op) {
        var amount = 0;
        for (var i = 0; i < trConstructionDeptSettlementDetailStore.getCount(); i++) {
            amount += trConstructionDeptSettlementDetailStore.getAt(i).get('trSettlementDetl.amountSecond');
        }
        var score = Ext.getCmp('xr-trconstructiondeptaettlement-score').getValue();
        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-sum').setValue(amount);
        Ext.getCmp('xr-trconstructiondeptaettlement-amountsecond-act').setValue(amount * score / 100);
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = Ext.getCmp('xr-trconstructiondeptaettlement-upload');
        if (form.isValid()) {
            form.submit({
                url: 'xr_uploadTrSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('xr-trconstructiondeptaettlement-balapplatt').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('xr-trconstructiondeptaettlement-att2').show();
            Ext.getCmp('xr-trconstructiondeptaettlement-link2').setHref(newValue);
        } else {
            Ext.getCmp('xr-trconstructiondeptaettlement-att2').hide();
            Ext.getCmp('xr-trconstructiondeptaettlement-link2').setHref('');
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'xr_deleteFile.action?filePath=' + Ext.getCmp('xr-trconstructiondeptaettlement-balapplatt').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('xr-trconstructiondeptaettlement-balapplatt').setValue('');
            };
        })
    },

});