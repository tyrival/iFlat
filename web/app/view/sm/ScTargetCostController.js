Ext.define('iFlat.view.sm.ScTargetCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sctargetcost',

    refresh: function () {
        smScProjectTargetCostStore.reload();
    },

    search: function () {
        var projNo = Ext.getCmp('sm-sctargetcost-combo').getValue();
        smScProjectTargetCostStore.getProxy().extraParams['projectTargetCostVo.projNo'] = projNo;
        smScProjectTargetCostStore.reload();
    },

    split: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-sctargetcostedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.ScTargetCostEdit');
        }
        var form = win.down('form');
        form.loadRecord(record);
        smScTargetCostSplitStore.getProxy().extraParams['targetCostSplit.projNo'] = record.get('projectTargetCostVo.projNo');
        this.refreshSplit();
        win.show();
    },

    addSplit: function () {
        smScTargetCostSplitRowEditing.cancelEdit();
        var record = Ext.create('iFlat.model.sm.TargetCostSplit', {
            'targetCostSplit.projNo': Ext.getCmp('sm-sctargetcostedit-projno').getValue(),
            'targetCostSplit.projName': Ext.getCmp('sm-sctargetcostedit-projname').getValue(),
        })
        smScTargetCostSplitStore.insert(0, record);
        smScTargetCostSplitRowEditing.startEdit(0, 0);
    },

    /**
     * 提交金额时，后台需验证提交后的总金额是否超过原始金额
     * @param editor
     * @param context
     * @param eOpts
     */
    updateSplitRecord: function (editor, context, eOpts) {
        var record = context.record;
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_saveTargetCostSplit.action',
            method: 'post',
            params: record.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                var obj = result['object'];
                // 如果未保存成功，则从store中移除此记录
                if (Flat.util.isEmpty(obj)) {
                    smScTargetCostSplitStore.reload();
                } else {
                    // 保存成功，则将返回的id填入相应的record的属性
                    if (Flat.util.isEmpty(record.get('targetCostSplit.id'))) {
                        record.set('targetCostSplit.id', obj['id']);
                        smScTargetCostSplitStore.insert(0, record);
                        var distribution = parseFloat(Ext.getCmp('sm-sctargetcostedit-distribute').getValue()) + parseFloat(obj['amount']);
                        var remain = parseFloat(Ext.getCmp('sm-sctargetcostedit-remain').getValue()) - parseFloat(obj['amount']);
                        Ext.getCmp('sm-sctargetcostedit-distribute').setValue(distribution);
                        Ext.getCmp('sm-sctargetcostedit-remain').setValue(remain);
                    }
                }
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["targetCostSplit.id"];
        if(id == "") {
            smScTargetCostSplitStore.remove(context.record);
        }
    },

    refreshSplit: function () {
        smScTargetCostSplitStore.reload({
            callback: function(records) {
                /**
                 * 遍历store中的所有对象的金额，加起来后作为已分配金额的数量，与总金额相减作为余额
                 */
                var distribution = 0;
                if (!Flat.util.isEmpty(records)) {
                    for (var i = 0; i < records.length; i++) {
                        distribution += records[i].getData()['amount'];
                    }
                }
                var remain = Ext.getCmp('sm-sctargetcostedit-amount').getValue() - distribution;
                Ext.getCmp('sm-sctargetcostedit-distribute').setValue(distribution);
                Ext.getCmp('sm-sctargetcostedit-remain').setValue(remain);
            }
        })
    },

    deleteSplit:function (grid, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定删除记录吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask('删除中...');
                Ext.Ajax.request({
                    url: 'sm_deleteTargetCostSplit.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        var obj = result['object'];
                        if (!Flat.util.isEmpty(obj)) {
                            smScTargetCostSplitStore.remove(record);
                            var distribution = parseFloat(Ext.getCmp('sm-sctargetcostedit-distribute').getValue()) - parseFloat(obj['amount']);
                            var remain = parseFloat(Ext.getCmp('sm-sctargetcostedit-remain').getValue()) + parseFloat(obj['amount']);
                            Ext.getCmp('sm-sctargetcostedit-distribute').setValue(distribution);
                            Ext.getCmp('sm-sctargetcostedit-remain').setValue(remain);
                        }
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    }
                });
            };
        })

    },

    uploadFile: function(btn) {
        var form = Ext.getCmp('sm-sctargetcost-import');
        if (form.isValid()) {
            form.submit({
                url: 'sm_importTargetCostSplit.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    smScTargetCostSplitStore.reload();
                    Flat.util.tip(o.response.responseText);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'sm_templateTargetCostSplit.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },

    onCostAccountChange: function (combo, newValue, oldValue, eOpts) {
        var v = combo.getStore().findRecord('code', newValue).get('name');
        Ext.getCmp('sm-sctargetcostedit-detail-costaccountname').setValue(v);
    },

    exportToExcel: function(btn) {
        var t = '造船目标成本分解';
        var grid = Ext.getCmp('sm-sctargetcostedit-detail');
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    }
});