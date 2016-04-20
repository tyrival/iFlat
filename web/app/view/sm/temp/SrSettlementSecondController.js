Ext.define('iFlat.view.sm.temp.SrSettlementSecondController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srsettlementsecond',

    deleteSettlementSecond: function (view, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","删除操作会导致这条二级分配项目及其明细项都被删除，不可恢复，是否删除?",function(btn) {
            if (btn == "yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteSrSettlementSecond.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        // 将对象从store中删除
                        var result = Ext.JSON.decode(response.responseText);
                        var store = view.getStore();
                        if (result['success']) {
                            var model = store.findRecord(
                                'srSettlementSecond.id', result['object']['id']);
                            store.remove(model);
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

    // 渲染附件下载列
    renderAttachment: function (v) {
        if(!v || v == '') {
            return '';
        } else {
            return "<a href='" + v + "'>下载</a>";
        }
    },


    // 新增/编辑二级结算清单，机电修理类型下，此按钮是隐藏的，所以不做考虑
    editSecond: function (cmp, rowIndex, colIndex, item, e, record, row) {
        // 查询二级结算窗口
        var win = Ext.getCmp('sm-srsettlementsecond');
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.SrSettlementSecond');
        }
        // 如果是新增，则创建record
        var w = cmp.up('window');
        if (Flat.util.isEmpty(record)) {
            record = Ext.create('iFlat.model.sm.SrSettlementSecond', {
                'srSettlementSecond.pid': w.down('textfield[name=id]').getValue(),
                'srSettlementSecond.type': w.down('textfield[name=type]').getValue(),
                'srSettlementSecond.progress': w.down('textfield[name=progress]').getValue(),
                'srSettlementSecond.projNo': w.down('textfield[name=projNo]').getValue(),
                'srSettlementSecond.projName': w.down('textfield[name=projName]').getValue(),
                'srSettlementSecond.deptName': w.down('textfield[name=deptName]').getValue(),
            });
            // 在二级结算表中插入record
            var store = cmp.up('grid').getStore();
            store.insert(0, record);
        }
        
        // 在新窗口的form中加载record
        var form = win.down('form');
        form.loadRecord(record);

        // 根据type不同，显示不同的grid
        var type = record.get('srSettlementSecond.type');
        type = Ext.util.Format.lowercase(type);
        var xtype = "sm-detail-srsettlementseconddetail" + type;
        // 遍历所有明细表组建，显示与当前单据类型匹配的表格
        var panel = win.down('panel[name=detail]');
        var items = panel.items.items;
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            item.setHidden(!item.isXType(xtype));
        }
        // 刷新对应的grid的store
        var detail = win.down(xtype);
        var store = detail.getStore();
        store.getProxy().extraParams['srSettlementDetlSecond.pid']
            = record.get('srSettlementSecond.id');
        store.reload({
            callback: function (records, operation, success) {
                var sum = 0;
                if (success) {
                    for (var i = 0; i < records.length; i++) {
                        sum += records[i].get('srSettlementDetlSecond.amount');
                    }
                };
                detail.down('label[name=distribute]').setText(sum);
            }
        });

        // 查询并加载部门结余
        var dept = record.get('srSettlementSecond.deptName');
        var balance = win.down('label[name=balance]');
        Ext.Ajax.request({
            url: 'sm_listSrSettlementBalance.action',
            method: 'post',
            params: {
                'srSettlementBalance.deptName': dept
            },
            success: function(response, opts) {
                var list = Ext.JSON.decode(response.responseText)['list'];
                balance.setText(list[0]['amount']);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });

        win.show();
    },

    uploadAttachment: function(btn) {
        var form = btn.up('window')
            .down('container[name=sm-srsettlementsecondedit-uploadatt]')
            .down('form');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadSrSettlementSecond.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    btn.up('window')
                        .down('textfield[name=srSettlementSecond.attachment]').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    changeSummaryAmount: function (field, newValue, oldValue) {
        var label = field.up('window').down('label[name=summaryAmount]');
        var sum = parseFloat(label['text']);
        if (!sum) {
            sum = 0;
        }
        // 如果是材料费，则变为减
        var diff = newValue - oldValue;
        if (field.getName() == "srSettlementSecond.materialAmount") {
            diff = 0 - diff;
        }
        sum += diff;
        label.setText(sum);

    },

    saveEdit: function (btn) {
        var win = btn.up('window');
        var form = win.down('form[name=sm-srsettlementsecondedit-form]');
        if (form.isValid()) {
            form.submit({
                url: 'sm_saveSrSettlementSecond.action',
                method: 'POST',
                waitMsg: '保存中...',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    //win.hide();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    //win.hide();
                }
            })
        }
    },
    // 删除已上传的附件，不可逆
    deleteAttachment: function(btn) {

        var textfield = btn.up('window').down('textfield[name=srSettlementSecond.attachment]');
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteFile.action?filePath=' + textfield.getValue(),
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                    }
                })
                textfield.setValue('');
            };
        })
    },

    /**
     * 明细表相关方法
     */
    addDetail: function (btn) {
        var grid = btn.up('grid');
        var plugin = grid.findPlugin('rowediting');
        plugin.cancelEdit();
        var r = Ext.create('iFlat.model.sm.SrSettlementDetlSecond', {
            'srSettlementDetlSecond.pid':
                btn.up('window').down('textfield[name=srSettlementSecond.id]').getValue()
        });
        grid.getStore().insert(0, r);
        plugin.startEdit(0, 0);
    },

    refresh: function (btn) {
        btn.up('grid').getStore().reload();
    },
    
    updateDetail: function(editor, context, eOpts) {

        var grid = editor.getCmp();
        var store = grid.getStore();
        var rec = context.record;
        var pid = rec.get('srSettlementDetlSecond.pid');
        if (Flat.util.isEmpty(pid)) {
            var win = editor.getCmp().up('window');
            var form = win.down('form[name=sm-srsettlementsecondedit-form]');
            if (form.isValid()) {
                form.submit({
                    url: 'sm_createSrSettlementDetlSecond.action',
                    method: 'POST',
                    waitMsg: '保存中...',
                    params: rec.getData(),
                    success: function(form, action) {
                        Flat.util.tip(action.response.responseText);
                        var result = Ext.JSON.decode(action.response.responseText);
                        var map = result['map'];
                        if (!Flat.util.isEmpty(map)) {
                            var head = map['head'];
                            var detail = map['detail'];
                            win.down('textfield[name=srSettlementSecond.id]')
                                .setValue(head['id']);
                            rec.set('srSettlementDetlSecond.id', detail['id']);
                            rec.set('srSettlementDetlSecond.pid', detail['pid']);
                            debugger
                            updateDistribute(grid, store)
                        }
                    },
                    failure: function(form, action) {
                        Flat.util.tip(action.response.responseText);
                    }
                });
            }
        } else {
            Flat.util.mask();
            Ext.Ajax.request({
                url: 'sm_saveSrSettlementDetlSecond.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('srSettlementDetlSecond.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (Flat.util.isEmpty(id)) {
                            rec.set('srSettlementDetlSecond.id', id);
                            store.insert(0, rec);
                        }
                    }
                    updateDistribute(grid, store)
                },
                failure: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                }
            });
        };
        function updateDistribute(grid, store) {
            var sum = 0;
            for (var i = 0; i < store.getCount(); i++) {
                var model = store.getAt(i);
                sum += model.get('srSettlementDetlSecond.amount');
            }
            grid.down('label[name=distribute]').setText(sum);
        }
    },



    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srSettlementDetlSecond.id"];
        if(id == "") {
            editor.getCmp().getStore().remove(context.record);
        }
    },

    deleteDetail: function (view, rowIndex, colIndex, item, e, record, row) {
        debugger
        Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
            if (btn == "yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteSrSettlementDetlSecond.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        var store = view.getStore();
                        if (result['success']) {
                            var model = store.findRecord(
                                'srSettlementDetlSecond.id', result['object']['id']);
                            store.remove(model);
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
});
