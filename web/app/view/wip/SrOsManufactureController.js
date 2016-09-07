Ext.define('iFlat.view.wip.SrOsManufactureController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-srosmanufacture',

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
                        var account = Ext.getCmp('global-panel').getViewModel().get('user')['account'];

                        var id = record.get('srOutsource.id');
                        srOsManufactureDetailStore.getProxy().extraParams['srOutsourceDetl.pid'] = id;
                        srOsManufactureDetailStore.reload();
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
        var panel = btn.up('wip-srosmanufacture');
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

    showBidding: function () {
        var id = Ext.getCmp('wip-srosmanufacture-id').getValue();
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
        var btnDown = Ext.getCmp('wip-srosmanufacture-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srosmanufacture-down2');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange3: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srosmanufacture-down3');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    editProcess: function () {
        var id = Ext.getCmp('wip-srosmanufacture-id').getValue();
        if (!Flat.util.isEmpty(id)) {
            var win = Ext.getCmp('wip-srosprocessedit');
            if (!win) {
                win = Ext.create('iFlat.view.wip.SrOsProcessEdit');
            }
            win.down('textfield[name=srOutsource.id]').setValue(id);
            wipSrOsProcessEditStore.getProxy().extraParams['srOsProcess.pid'] = id;
            wipSrOsProcessEditStore.reload();
            win.show();
        }
    },

    deleteRecord: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('srOsProcess.id');
        if(id == undefined || id == '') {
            wipSrOsProcessEditStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'wip_deleteSrOsProcess.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                wipSrOsProcessEditStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srOsProcess.id"];
        if(id == "") {
            wipSrOsProcessEditStore.remove(context.record);
        }
    },

    updateRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'wip_saveSrOsProcess.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                wipSrOsProcessEditStore.reload();
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
                wipSrOsProcessEditStore.reload();
            }
        });
    },

    addRecord: function(btn) {
        wipSrOsProcessEditRowEditing.cancelEdit();
        var srosbidding = Ext.create('iFlat.model.wip.SrOsProcess', {
            'srOsProcess.pid': btn.up('window').down('textfield[name=srOutsource.id]').getValue()
        });
        wipSrOsProcessEditStore.insert(0, srosbidding);
        wipSrOsProcessEditRowEditing.startEdit(0, 0);
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

});