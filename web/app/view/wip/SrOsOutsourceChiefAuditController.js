Ext.define('iFlat.view.wip.SrOsOutsourceChiefAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.wip-srosoutsourcechiefaudit',

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
                        srOsOutsourceChiefAuditDetailStore.getProxy().extraParams['srOutsourceDetl.pid'] = id;
                        srOsOutsourceChiefAuditDetailStore.reload();
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

    refreshList: function() {
        wipSrOsBiddingViewStore.reload();
    },

    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },

    completeTask: function (btn) {
        var panel = btn.up('wip-srosoutsourcechiefaudit');
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
        if (form.isValid()) {
            form.submit({
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

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srosoutsourcechiefaudit-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srosoutsourcechiefaudit-down2');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    onAttachmentChange3: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('wip-srosoutsourcechiefaudit-down3');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    showBidding: function () {
        var id = Ext.getCmp('wip-srosoutsourcechiefaudit-id').getValue();
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
});