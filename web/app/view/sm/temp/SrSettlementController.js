Ext.define('iFlat.view.sm.temp.SrSettlementController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srsettlement',

    refresh: function (btn) {
        btn.up('grid').getStore().reload();
    },

    amountFormat: function(value, metaData) {
        return Flat.util.financeFormat(value,2);
    },

    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listSrSettlementComment.action',
                extraParams: record.getData()
            }
        }))
        win.show();
    },

    /**
     * 新增或编辑时，弹出窗口，装载数据
     */
    edit: function (comp, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-srsettlementedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.SrSettlementEdit');
        };
        /* 三个流程的界面中不同的add按钮，生成的srSettlement.type不同 */
        var type = '';
        var text = comp.up('grid').getTitle();
        if (Flat.util.isEmpty(record)) {
            type = this.convertTitleToType(text);

            // 非主体工程由车间开单，由自己所属部门带出部门名称，隐藏部门选项
            var deptName = '';
            if (type != 'Main') {
                deptName = Ext.getCmp('global-panel').getViewModel().get('user')['porgName']
            }
            record = Ext.create('iFlat.model.sm.SrSettlement', {
                'srSettlement.progress': 100,
                'srSettlement.deptName': deptName,
                'srSettlement.type': type,
                'srSettlement.status': '未提交'
            });
            Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().insert(0, record);
        } else {
            type = record.get('srSettlement.type');
        }

        // 设置弹窗标题，用于后续用哪个grid的判断
        win.setTitle(text);
        win.down('form').loadRecord(record);
        win.show();
    },

    changeGridWithType: function (window, eOpts) {
        var panel = window.down('panel[name=detail]');
        var title = panel.up('window').getTitle();
        var type = this.convertTitleToType(title);
        type = Ext.util.Format.lowercase(type);
        var xtype = 'sm-detail-srapply' + type;

        // 遍历所有明细表组建，显示与当前单据类型匹配的表格
        var items = panel.items.items;
        for (var i = 0; i < items.length; i++) {
            var cmp = items[i];
            cmp.setHidden(!cmp.isXType(xtype));
        }

        // 刷新明细store
        var store = window.down('sm-detail-srapply' + type).getStore();
        var id = window.down('textfield[name=srSettlement.id]').getValue();
        store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
        store.reload();

        // 根据单据状态，决定内容是否可修改
        var status = window.down('textfield[name=srSettlement.status]').getValue();
        var isSubmit = status != '未提交';
        window.down('combo[name=srSettlement.projNo]').setDisabled(isSubmit);
        window.down('combo[name=srSettlement.team]').setDisabled(isSubmit);
        window.down('textfield[name=srSettlement.comment]').setDisabled(isSubmit);
        window.down('container[name=sm-srsettlementedit-uploadatt]').setHidden(isSubmit);
        window.down('button[name=sm-srsettlementedit-detail-add]').setDisabled(isSubmit);
        window.down(xtype).getColumns()[0].setDisabled(isSubmit);
        if (isSubmit) {
            window.down(xtype).findPlugin('rowediting').disable();
        } else {
            window.down(xtype).findPlugin('rowediting').enable();
        }

        /* 根据单据类型，显示或隐藏部分组件 */
        // 如果不是机电修理类型，则不显示工程队选择菜单
        var team = window.down('combo[name=srSettlement.team]');
        team.setHidden(type != 'sys');
        var teamAcc = window.down('textfield[name=srSettlement.teamName]');
        teamAcc.setHidden(type != 'sys');
        if (type != 'sys') {
            team.setValue(null);
        }
        // 如果是主体工程类型，则显示部门选项，隐藏主修选择
        window.down('combo[name=srSettlement.deptName]').setHidden(type != 'main');
        window.down('combo[name=srSettlement.professionalMgrAcc]').setHidden(type == 'main');

    },

    convertTitleToType: function (text) {
        var type = '';
        switch (text) {
            case '修船主体工程':
                type = 'Main';
                break;
            case '修船零星工程':
                type = 'Misc';
                break;
            case '修船机电修理工程':
                type = 'Sys';
                break;
        }
        return type;
    },

    /**
     * 上传附件
     */
    uploadAttachment: function(btn) {
        var form = btn.up('window').down('container[name=sm-srsettlementedit-uploadatt]').down('form');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadSrSettlement.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    btn.up('window').down('textfield[name=srSettlement.attachment]').setValue(path);
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

        var textfield = btn.up('window').down('textfield[name=srSettlement.attachment]');
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
     * 将SrSettlement提交审批
     * SrSettlement列表界面，data为undefined，
     * SrSettlementEdit界面，data为SrSettlement.id
     */
    submit: function (view, rowIndex, colIndex, item, e, record, row) {
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_submitSrSettlement.action',
            params: record.getData(),
            method: 'POST',
            success: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                view.up('grid').getStore().reload();
            },
            failure: function (response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                view.up('grid').getStore().reload();
            }
        });
    },

    /**
     * 完成对SrSettlement的修改，并提交审批
     */
    saveAndSubmitSrSettlementEdit: function (btn) {
        var win = btn.up('window');
        var form = win.down('form');
        form.submit({
            url: 'sm_saveAndSubmitSrSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                win.hide();
                Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
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
    addDetail: function(btn) {
        var grid = btn.up('grid');
        var plugin = grid.findPlugin('rowediting');
        plugin.cancelEdit();
        var r = Ext.create('iFlat.model.sm.SrSettlementDetlFirst', {
            'srSettlementDetlFirst.pid': btn.up('window').down('textfield[name=srSettlement.id]').getValue()
        });
        grid.getStore().insert(0, r);
        plugin.startEdit(0, 0);
    },

    /**
     * 查看srSettlement.id，如果是空，则保存头信息，
     * 返回id填入srSettlement.id和srSettlementDetail.pid，然后保存行信息
     * 如果不为空，则说明头信息存在，直接保存行信息
     * 保存SrSettlement完毕后，如果是新增的SrSettlement对象，则启动流程，
     */
    updateDetail: function(editor, context, eOpts) {
        var rec = context.record;
        // 为了后续事业部确认时方便，将确认数量与原数量保持一致
        rec.set('srSettlementDetlFirst.adjustContent', rec.get('srSettlementDetlFirst.applyContent'));
        rec.set('srSettlementDetlFirst.adjustQty1', rec.get('srSettlementDetlFirst.applyQty1'));
        rec.set('srSettlementDetlFirst.adjustQty2', rec.get('srSettlementDetlFirst.applyQty2'));
        rec.set('srSettlementDetlFirst.adjustQty3', rec.get('srSettlementDetlFirst.applyQty3'));
        rec.set('srSettlementDetlFirst.adjustQty4', rec.get('srSettlementDetlFirst.applyQty4'));
        rec.set('srSettlementDetlFirst.adjustQty5', rec.get('srSettlementDetlFirst.applyQty5'));
        rec.set('srSettlementDetlFirst.adjustQty6', rec.get('srSettlementDetlFirst.applyQty6'));
        rec.set('srSettlementDetlFirst.settleQty1', rec.get('srSettlementDetlFirst.applyQty1'));
        rec.set('srSettlementDetlFirst.settleQty2', rec.get('srSettlementDetlFirst.applyQty2'));
        rec.set('srSettlementDetlFirst.settleQty3', rec.get('srSettlementDetlFirst.applyQty3'));
        rec.set('srSettlementDetlFirst.settleQty4', rec.get('srSettlementDetlFirst.applyQty4'));
        rec.set('srSettlementDetlFirst.settleQty5', rec.get('srSettlementDetlFirst.applyQty5'));
        rec.set('srSettlementDetlFirst.settleQty6', rec.get('srSettlementDetlFirst.applyQty6'));
        var pid = rec.get('srSettlementDetlFirst.pid');
        if (Flat.util.isEmpty(pid)) {
            var win = editor.getCmp().up('window');
            var form = win.down('form[name=sm-srsettlementedit-form]');
            if (form.isValid()) {
                form.submit({
                    url: 'sm_createSrSettlementDetlFirst.action',
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
                            win.down('textfield[name=srSettlement.id]').setValue(head['id']);
                            rec.set('srSettlementDetlFirst.id', detail['id']);
                            rec.set('srSettlementDetlFirst.pid', detail['pid']);
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
                url: 'sm_saveSrSettlementDetlFirst.action',
                method: 'post',
                params: rec.getData(),
                success: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    if (Flat.util.isEmpty(rec.get('srSettlementDetlFirst.id'))) {
                        var result = Ext.JSON.decode(response.responseText);
                        var id = result['object']['id'];
                        if (Flat.util.isEmpty(id)) {
                            rec.set('srSettlementDetlFirst.id', id);
                            editor.getCmp().getStore().insert(0, rec);
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
        var id = context.record.data["srSettlementDetlFirst.id"];
        if(id == "") {
            editor.getCmp().getStore().remove(context.record);
        }
    },

    /**
     * 关闭窗口时，刷新清单
     */
    editClose: function (panel) {
        Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
        panel.down('textfield[name=srSettlement.type]').setValue('');
    },

    /**
     * 点击右下角保存按钮时，保存SrSettlement头信息
     * 由于明细行信息在表格内部保存，此时无需考虑行信息，所以只要保存头信息
     * 保存头信息后，如果是新增的SrSettlement对象，则启动流程
     */
    saveEdit: function (btn) {
        var win = btn.up('window');
        var form = win.down('form');
        form.submit({
            url: 'sm_saveSrSettlement.action',
            waitMsg: '保存中...',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                win.hide();
                Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
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
        Ext.Msg.confirm("提示!","删除操作会导致此申请及其明细项均被删除，不可恢复，是否删除？",function(btn) {
            if (btn == "yes") {
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'sm_deleteSrSettlement.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().remove(record);
                        Flat.util.unmask();
                    },
                    failure: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        Ext.getCmp('main-view-tabpanel').getActiveTab().getStore().reload();
                        Flat.util.unmask();
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

    refreshDetail: function (btn) {
        btn.up('window').down('grid').getStore().reload();
    },


    uploadFile: function(btn) {
        var grid = btn.up('grid');
        var m;
        switch (grid.getXType()) {
            case 'sm-srmain':
                m = 'Main';
                break;
            case 'sm-srmisc':
                m = 'Misc';
                break;
            case 'sm-srsys':
                m = 'Sys';
                break;
        }
        var form = btn.previousSibling('form');
        if (form.isValid()) {
            form.submit({
                url: 'sm_importSrSettlement.action',
                method: 'POST',
                waitMsg: '正在导入......',
                params: {
                    'srtype': m
                },
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    grid.getStore().reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        var panel = btn.up('panel');
        if(panel) {
            var m;
            switch (panel.getXType()) {
                case 'sm-srmain':
                    m = 'Main';
                    break;
                case 'sm-srmisc':
                    m = 'Misc';
                    break;
                case 'sm-srsys':
                    m = 'Sys';
                    break;
            }
            Ext.Ajax.request({
                url: 'sm_templateSrSettlement.action?srtype=' + m,
                method: 'post',
                success: function(response, opts) {
                    window.open(Ext.JSON.decode(response.responseText)['object']);
                },
            });
        }
    },
});