Ext.define('iFlat.view.wip.SrOsSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-srossettlement',

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
        var assess = Ext.create('iFlat.store.wip.SrOsAssess');
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
                        var account = Ext.getCmp('global-panel').getViewModel().get('user')['account'];
                        assess.getProxy().extraParams['srOsAssess.pid'] = id;
                        assess.getProxy().extraParams['srOsAssess.creatorAcc'] = account;
                        assess.reload({
                            callback: function(rcs, option, scs) {
                                if (!scs) {
                                    Flat.util.tip(response.responseText);
                                } else {
                                    var rec;
                                    if (rcs != null && rcs.length > 0) {
                                        rec = rcs[0];
                                    } else {
                                        rec = Ext.create('iFlat.model.wip.SrOsAssess', {
                                            'srOsAssess.pid': id,
                                            'srOsAssess.creatorAcc': account
                                        })
                                    }
                                    form.loadRecord(rec);
                                }
                            }
                        });

                        var id = record.get('srOutsource.id');
                        srOsSettlementDetailStore.getProxy().extraParams['srOutsourceDetl.pid'] = id;
                        srOsSettlementDetailStore.reload();
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

    refreshList: function(btn) {
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
        var panel = btn.up('wip-srossettlement');
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
            url = 'wip_approveSrOutsourceWithSaveAndAssess.action';
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

    showBidding: function () {
        var id = Ext.getCmp('wip-srossettlement-id').getValue();
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-srosbiddingview');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOsBiddingView');
            }
            wipSrOsBiddingViewStore.getProxy().extraParams['srOsBidding.pid'] = id;
            wipSrOsBiddingViewStore.reload();
            win.show();
        }
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srossettlement-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srossettlement-down2');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange3: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srossettlement-down3');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange4: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srossettlement-down4');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    showProcess: function () {
        var id = Ext.getCmp('wip-srossettlement-id').getValue();
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-srosprocessview');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOsProcessView');
            }
            wipSrOsProcessViewStore.getProxy().extraParams['srOsProcess.pid'] = id;
            wipSrOsProcessViewStore.reload();
            win.show();
        }
    },

    showAssess: function (button) {
        var id = button.up('window').down('textfield[name=srOutsource.id]').getValue();
        var win = Ext.getCmp('wip-srosassess');
        if (!win) {
            win = Ext.create('iFlat.view.wip.SrOsAssess');
        }
        wipSrOsAssessStore.getProxy().extraParams['srOsAssess.pid'] = id;
        wipSrOsAssessStore.reload();
        win.show();
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange5: function(field, newValue, oldValue, eOpts) {
        if (!Flat.util.isEmpty(newValue)) {
            Ext.getCmp('wip-srossettlement-att5').show();
            Ext.getCmp('wip-srossettlement-link5').setHref(newValue);
        } else {
            Ext.getCmp('wip-srossettlement-att5').hide();
            Ext.getCmp('wip-srossettlement-link5').setHref('');
        }
    },

    /**
     * 上传附件
     */
    uploadAttachment5: function(btn) {
        var form = Ext.getCmp('wip-srossettlement-upload5');
        if (form.isValid()) {
            form.submit({
                url: 'wip_uploadSrOutsource.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('wip-srossettlement-attachment5').setValue(path);
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
    deleteAttachment5: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'wip_deleteFile.action?filePath=' + Ext.getCmp('wip-srossettlement-attachment5').getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('wip-srossettlement-attachment5').setValue('');
            };
        })
    },
});