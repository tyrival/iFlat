Ext.define('iFlat.view.sm.SbTargetCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sbtargetcost',

    refresh: function () {
        smSbTargetCostStore.reload();
    },

    search: function () {
        var projNo = Ext.getCmp('sm-sbtargetcost-combo').getValue();
        smSbTargetCostStore.getProxy().extraParams['sbTargetCost.projNo'] = projNo;
        smSbTargetCostStore.reload();
    },
    
    split: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-sbtargetcostedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.SbTargetCostEdit');
        }
        var form = win.down('form');
        form.loadRecord(record);
        smSbTargetCostSplitStore.getProxy().extraParams['sbTargetCostSplit.projNo'] = record.get('sbTargetCost.projNo');
        smSbTargetCostSplitStore.getProxy().extraParams['sbTargetCostSplit.deptName'] = record.get('sbTargetCost.deptName');
        this.refreshSplit();
        win.show();
    },

    addSplit: function () {
        smSbTargetCostSplitRowEditing.cancelEdit();
        var record = Ext.create('iFlat.model.sm.SbTargetCostSplit', {
            'sbTargetCostSplit.projNo': Ext.getCmp('sm-sbtargetcostedit-projno').getValue(),
            'sbTargetCostSplit.projName': Ext.getCmp('sm-sbtargetcostedit-projname').getValue(),
            'sbTargetCostSplit.deptName': Ext.getCmp('sm-sbtargetcostedit-deptname').getValue(),
        })
        smSbTargetCostSplitStore.insert(0, record);
        smSbTargetCostSplitRowEditing.startEdit(0, 0);
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
            url: 'sm_saveSbTargetCostSplit.action',
            method: 'post',
            params: record.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                var obj = result['object'];
                // 如果未保存成功，则从store中移除此记录
                if (Flat.util.isEmpty(obj)) {
                    smSbTargetCostSplitStore.reload();
                } else {
                    // 保存成功，则将返回的id填入相应的record的属性
                    if (Flat.util.isEmpty(record.get('sbTargetCostSplit.id'))) {
                        record.set('sbTargetCostSplit.id', obj['id']);
                        smSbTargetCostSplitStore.insert(0, record);
                        var distribution = parseFloat(Ext.getCmp('sm-sbtargetcostedit-distribute').getValue()) + parseFloat(obj['amount']);
                        var remain = parseFloat(Ext.getCmp('sm-sbtargetcostedit-remain').getValue()) - parseFloat(obj['amount']);
                        Ext.getCmp('sm-sbtargetcostedit-distribute').setValue(distribution);
                        Ext.getCmp('sm-sbtargetcostedit-remain').setValue(remain);
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
        var id = context.record.data["sbTargetCostSplit.id"];
        if(id == "") {
            smSbTargetCostSplitStore.remove(context.record);
        }
    },

    refreshSplit: function () {
        smSbTargetCostSplitStore.reload({
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
                var remain = Ext.getCmp('sm-sbtargetcostedit-amount').getValue() - distribution;
                Ext.getCmp('sm-sbtargetcostedit-distribute').setValue(distribution);
                Ext.getCmp('sm-sbtargetcostedit-remain').setValue(remain);
            }
        })
    },

    deleteSplit:function (grid, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定删除记录吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask('删除中...');
                Ext.Ajax.request({
                    url: 'sm_deleteSbTargetCostSplit.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        var obj = result['object'];
                        if (!Flat.util.isEmpty(obj)) {
                            smSbTargetCostSplitStore.remove(record);
                            var distribution = parseFloat(Ext.getCmp('sm-sbtargetcostedit-distribute').getValue()) - parseFloat(obj['amount']);
                            var remain = parseFloat(Ext.getCmp('sm-sbtargetcostedit-remain').getValue()) + parseFloat(obj['amount']);
                            Ext.getCmp('sm-sbtargetcostedit-distribute').setValue(distribution);
                            Ext.getCmp('sm-sbtargetcostedit-remain').setValue(remain);
                        }
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                    }
                });
            };
        })

    }
});