Ext.define('iFlat.view.sm.SrProfessionalManagerAuditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srprofessionalmanageraudit',

    /**
     * 在创建明细信息时，将调整数量与原始数量保持一致，
     * 避免在此处分不清到底是调整为0，还是原始为0，
     * 所以此处只要原始数量和调整数量不同，就提交修改
     */
    updateDetail: function (editor, context, eOpts) {
        var r = context.record;
        var applyContent = r.get('srSettlementDetlFirst.applyContent');
        var adjustContent = r.get('srSettlementDetlFirst.adjustContent');
        var applyQty1 = r.get('srSettlementDetlFirst.applyQty1');
        var adjustQty1 = r.get('srSettlementDetlFirst.adjustQty1');
        var applyQty2 = r.get('srSettlementDetlFirst.applyQty2');
        var adjustQty2 = r.get('srSettlementDetlFirst.adjustQty2');
        var applyQty3 = r.get('srSettlementDetlFirst.applyQty3');
        var adjustQty3 = r.get('srSettlementDetlFirst.adjustQty3');
        var applyQty4 = r.get('srSettlementDetlFirst.applyQty4');
        var adjustQty4 = r.get('srSettlementDetlFirst.adjustQty4');
        var applyQty5 = r.get('srSettlementDetlFirst.applyQty5');
        var adjustQty5 = r.get('srSettlementDetlFirst.adjustQty5');
        var applyQty6 = r.get('srSettlementDetlFirst.applyQty6');
        var adjustQty6 = r.get('srSettlementDetlFirst.adjustQty6');

        if (applyContent != adjustContent
            || adjustQty1 != applyQty1 || adjustQty2 != applyQty2
            || adjustQty3 != applyQty3 || adjustQty4 != applyQty4
            || adjustQty5 != applyQty5 || adjustQty6 != applyQty6) {
            
            // 将结算数量初始值与确认数量保持一致
            r.set('srSettlementDetlFirst.settleQty1', adjustQty1);
            r.set('srSettlementDetlFirst.settleQty2', adjustQty2);
            r.set('srSettlementDetlFirst.settleQty3', adjustQty3);
            r.set('srSettlementDetlFirst.settleQty4', adjustQty4);
            r.set('srSettlementDetlFirst.settleQty5', adjustQty5);
            r.set('srSettlementDetlFirst.settleQty6', adjustQty6);

            Flat.util.mask();
            Ext.Ajax.request({
                url: 'sm_saveSrSettlementDetlFirst.action',
                method: 'post',
                params: r.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                },
                failure: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                }
            });
        }
    },

    deleteDetail: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
            if (btn == "yes") {
                Flat.util.mask('删除中...');
                Ext.Ajax.request({
                    url: 'sm_deleteSrSettlementDetlFirst.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        if (result['success']) {
                            var model = view.getStore().findRecord(
                                'srSettlementDetlFirst.id', result['object']['id']);
                            view.getStore().remove(model);
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

    amountFormat: function(value, metaData) {
        return Flat.util.financeFormat(value,2);
    },

    renderType: function(value, metaData) {
        return this.convertTypeToName(value);
    },

    convertTypeToName: function (type) {
        switch (type) {
            case "Main":
                type = "修船主体工程";
                break;
            case "Misc":
                type = "修船零星工程";
                break;
            case "Sys":
                type = "修船机电修理工程";
                break;
        }
        return type;
    },

    showComment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listSrSettlementComment.action',
                extraParams: {
                    'srSettlement.id': Ext.getCmp('sm-srprofessionalmanagerauditedit-id').getValue()
                }
            }
        }))
        win.show();
    },

    refresh: function (btn) {
        // 刷新列表的store
        btn.up('grid').getStore().reload()
    },

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-srprofessionalmanagerauditedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.SrProfessionalManagerAuditEdit');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    changeGridWithType: function (window, eOpts) {
        var type = window.down('textfield[name=srSettlement.type]').getValue();
        var xtype = 'sm-detail-sradjust' + type.toLowerCase();
        var panel = window.down('panel[name=detail]');
        panel.removeAll();
        panel.add({ xtype : xtype });

        // 刷新store
        var store = panel.down(xtype).getStore();
        var id = panel.up('window').down('textfield[name=srSettlement.id]').getValue();
        store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
        store.reload();
    },

    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('sm-srprofessionalmanagerauditedit-down');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },

    completeTask: function (btn) {

        var comment = Ext.getCmp('sm-srprofessionalmanagerauditedit-comment').getValue();
        if (Flat.util.isEmpty(comment)) {
            Ext.Msg.show({
                title:'警告',
                message: '请填写审批意见。',
            });
        } else {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            Flat.util.mask('提交中...');
            Ext.Ajax.request({
                url: 'sm_approveSrSettlement.action',
                method: 'post',
                params: {
                    'srSettlement.id': Ext.getCmp('sm-srprofessionalmanagerauditedit-id')
                        .getValue(),
                    'outGoingName': text,
                    'comment': comment,
                },
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-srprofessionalmanagerauditedit').hide();
                    var active = Ext.WindowManager.getActive();
                    if (active && active.isXType('window')) {
                        active.down('grid').getStore().reload();
                    }
                },
                failure: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-srprofessionalmanagerauditedit').hide();
                    var active = Ext.WindowManager.getActive();
                    if (active && active.isXType('window')) {
                        active.down('grid').getStore().reload();
                    }
                }
            });
        }

    }
});