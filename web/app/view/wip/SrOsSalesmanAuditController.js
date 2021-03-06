Ext.define('iFlat.view.wip.SrOsSalesmanAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-srossalesmanaudit',

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
                        srOsSalesmanAuditDetailStore.getProxy().extraParams['srOutsourceDetl.pid'] = id;
                        srOsSalesmanAuditDetailStore.reload();
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
        var panel = btn.up('wip-srossalesmanaudit');
        var form = panel.down('form');
        var comment = form.down('textarea[name=comment]');
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        var param = {
            'outGoingName': text
        }
        var opinion = comment.getValue();
        if (Flat.util.isEmpty(opinion)) {
            var c = text === 'pass' ? '同意' : '不同意';
            opinion = c;
            comment.setValue(c);
        }
        form.down('textfield[name=srOutsource.saleOpinion]').setValue(opinion);
        if (form.isValid()) {
            form.submit({
                url: 'wip_approveSrOutsourceWithSave.action',
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

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srossalesmanaudit-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srossalesmanaudit-down2');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    completeProcess: function (btn) {

        var firstTip = "结束流程将使流程不再向后流转，表示经营代表不同意此工程委外，是否结束？";
        Ext.Msg.confirm("提示!", firstTip, function(btn) {

            if (btn == 'no') {
                return;
            }

            Ext.Msg.confirm (
                "提示!", "结束流程操作为单向操作，不可恢复，是否继续？", function (btn) {

                if (btn == "no") {
                    return;
                }

                var panel = btn.up('wip-srossalesmanaudit');
                var form = panel.down('form');
                var comment = form.down('textarea[name=comment]');
                var param = {
                    'outGoingName': 'finish'
                }
                var opinion = comment.getValue();
                if (Flat.util.isEmpty(opinion)) {
                    var c = '经营代表不同意此工程委外。';
                    opinion = c;
                    comment.setValue(c);
                }
                form.down('textfield[name=srOutsource.saleOpinion]').setValue(opinion);
                if (form.isValid()) {
                    form.submit({
                        url: 'wip_approveSrOutsourceWithSave.action',
                        waitMsg: '正在结束流程...',
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
            })
        })
    },
});