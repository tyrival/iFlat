Ext.define('iFlat.view.sm.SrCommercialCenterSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srcommercialcentersettlement',

    loadBusinessObjByTaskId: function(field, newValue, oldValue, eOpts) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'workflow_getBusinessObjByProcessInstanceId.action?processInstanceId=' + newValue,
            method: 'post',
            success: function(response, opts) {
                Flat.util.unmask();
                var obj = Ext.JSON.decode(response.responseText)['object'];
                var type = '';
                var id = '';
                if (obj) {
                    var record = Ext.create('iFlat.model.sm.SrSettlement', obj);
                    type = obj['type'];
                    id = obj['id'];
                    // 为了避免此处的id与taskId冲突
                    record.set('srSettlement.id', id);
                }
                var form = field.up('form');
                form.loadRecord(record);
                
                // 根据type选择相应的grid嵌入窗口
                var panel = field.up('window').down('panel[name=detail]');
                var items = panel.items.items;
                var xtype = 'sm-detail-srsettlementfirst' + type.toLowerCase();
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    item.setHidden(!item.isXType(xtype));
                }
                // 刷新store
                if (!Flat.util.isEmpty(id)) {
                    var g = panel.down(xtype);
                    var store = g.getStore();
                    store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
                    store.reload({
                        callback: function (records, operation, success) {
                            var grid = g;
                            var win = grid.up('window');
                            var type = win.down('textfield[name=type]').getValue();
                            var a = 0;
                            var b = 0;
                            for (var i = 0; i < records.length; i++) {
                                var rec = records[i];
                                var amount = rec.get('srSettlementDetlFirst.amount');
                                a += amount;
                                if (type == 'Main' || type == 'Sys') {
                                    var worktype = rec.get('srSettlementDetlFirst.type');
                                    var rate = 0;
                                    if (worktype == '钳工' || worktype == '电工' || worktype == '涂装' || worktype == '搭架') {
                                        rate = 0.15;
                                    }
                                    if (worktype == '冷作') {
                                        rate = 0.2;
                                    }
                                    if (worktype == '铜工') {
                                        rate = 0.3
                                    }
                                    b += amount * rate;
                                }
                            }
                            var form = win.down('form[name=amount]');
                            form.down('textfield[name=srSettlement.laborAmount]').setValue(a);
                            form.down('textfield[name=srSettlement.performanceAmount]').setValue(b);
                        }
                    });
                }

                //根据type显示或隐藏部分元素
                form.down('textfield[name=team]').setHidden(type != 'Sys');
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    changeSummaryAmount: function(field, newValue, oldValue, eOpts) {
        var sumField = field.up('window').down('textfield[name=summaryAmount]');
        var sum = parseFloat(sumField.getValue());
        if (!sum) {
            sum = 0;
        }
        // 如果是材料费，则变为减
        var diff = newValue - oldValue;
        if (field.getName() == "srSettlement.materialAmount") {
            diff = 0 - diff;
        }
        sum += diff;
        sumField.setValue(sum);
    },

    loadOrigRecord: function(field, newValue, oldValue, eOpts) {
        field.up('window')
            .down('textfield[name=srSettlement.' + field.getName() + ']')
            .setValue(newValue);
    },

    updateDetail: function (editor, context, eOpts) {
        var r = context.record;
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_saveSrSettlementDetlFirst.action',
            method: 'post',
            params: r.getData(),
            success: function(response, opts) {
                var grid = editor.getCmp();
                var win = grid.up('window');
                var type = win.down('textfield[name=type]').getValue();
                var a = 0;
                var b = 0;
                var s = grid.getStore();
                for (var i = 0; i < s.getCount(); i++) {
                    var rec = s.getAt(i);
                    var amount = rec.get('srSettlementDetlFirst.amount');
                    a += amount;
                    if (type == 'Main' || type == 'Sys') {
                        var worktype = rec.get('srSettlementDetlFirst.type');
                        var rate = 0;
                        if (worktype == '钳工' || worktype == '电工' || worktype == '涂装' || worktype == '搭架') {
                            rate = 0.15;
                        }
                        if (worktype == '冷作') {
                            rate = 0.2;
                        }
                        if (worktype == '铜工') {
                            rate = 0.3
                        }
                        b += amount * rate;
                    }
                }
                var form = win.down('form[name=amount]');
                form.down('textfield[name=srSettlement.laborAmount]').setValue(a);
                form.down('textfield[name=srSettlement.performanceAmount]').setValue(b);
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    showComment: function (btn) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listSrSettlementComment.action',
                extraParams: {
                    'srSettlement.id': btn.up('window').down('textfield[name=srSettlement.id]').getValue()
                }
            }
        }))
        win.show();
    },

    refresh: function (btn) {
        btn.up('grid').getStore().reload({
            callback: function (records, operation, success) {
                var grid = btn.up('grid');
                var win = grid.up('window');
                var type = win.down('textfield[name=type]').getValue();
                var a = 0;
                var b = 0;
                for (var i = 0; i < records.length; i++) {
                    var rec = records[i];
                    var amount = rec.get('srSettlementDetlFirst.amount');
                    a += amount;
                    if (type == 'Main' || type == 'Sys') {
                        var worktype = rec.get('srSettlementDetlFirst.type');
                        var rate = 0;
                        if (worktype == '钳工' || worktype == '电工' || worktype == '涂装' || worktype == '搭架') {
                            rate = 0.15;
                        }
                        if (worktype == '冷作') {
                            rate = 0.2;
                        }
                        if (worktype == '铜工') {
                            rate = 0.3
                        }
                        b += amount * rate;
                    }
                }
                var form = win.down('form[name=amount]');
                form.down('textfield[name=srSettlement.laborAmount]').setValue(a);
                form.down('textfield[name=srSettlement.performanceAmount]').setValue(b);
            }
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = field.up('form').down('button[name=down]');
        btnDown.setHref(newValue);
        if (!Flat.util.isEmpty(newValue)) {
            btnDown.show();
        } else {
            btnDown.hide();
        }
    },

    completeTask: function (btn) {

        var win = btn.up('window');
        var form = win.down('form[name=amount]');
        if (form.isValid()) {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            form.submit({
                url: 'sm_approveSrSettlementFirst.action',
                waitMsg: '提交中...',
                params: {
                    'srSettlement.id':win.down('textfield[name=srSettlement.id]').getValue(),
                    'outGoingName': text,
                },
                method: 'POST',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textfield[name=srSettlement.consumableAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.performanceAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.materialAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.laborAmount]').setValue(0);
                    form.down('textarea[name=comment]').setValue('');
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    win.hide();
                    Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                    form.down('textfield[name=srSettlement.consumableAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.performanceAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.materialAmount]').setValue(0);
                    form.down('textfield[name=srSettlement.laborAmount]').setValue(0);
                    form.down('textarea[name=comment]').setValue('');
                }
            })
        }
    },

    calcAmount: function (textfield, newValue, oldValue, eOpts) {
        var name = textfield.getName();
        var price;
        var qty;
        var amount;
        switch (name) {
            case 'srSettlementDetlFirst.price':
                price = textfield;
                qty = textfield.nextSibling('textfield[name=srSettlementDetlFirst.settleQty1]');
                if (Flat.util.isEmpty(qty)) {
                    qty = textfield.previousSibling('textfield[name=srSettlementDetlFirst.settleQty1]');
                };
                break;

            case 'srSettlementDetlFirst.settleQty1':
                qty = textfield;
                price = textfield.nextSibling('textfield[name=srSettlementDetlFirst.price]');
                if (Flat.util.isEmpty(price)) {
                    price = textfield.previousSibling('textfield[name=srSettlementDetlFirst.price]');
                };
                break;

        }
        amount = textfield.nextSibling('textfield[name=srSettlementDetlFirst.amount]');
        if (Flat.util.isEmpty(amount)) {
            amount = textfield.previousSibling('textfield[name=srSettlementDetlFirst.amount]');
        };

        var a = price.getValue() * qty.getValue();
        amount.setValue(a);
    }
    
});