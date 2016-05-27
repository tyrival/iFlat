Ext.define('iFlat.view.sm.SbProjectTargetCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sbprojecttargetcost',

    search: function () {
        var projNo = Ext.getCmp('sm-sbprojecttargetcost-combo').getValue();
        smSbProjectTargetCostStore.getProxy().extraParams['projectTargetCostVo.projNo'] = projNo;
        smSbProjectTargetCostStore.reload();
    },

    refreshList: function() {
        smSbProjectTargetCostStore.reload();
    },

    split: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-sbprojecttargetcostedit');
        if (!win) {
            win = Ext.create('iFlat.view.sm.SbProjectTargetCostEdit');
        }
        var form = win.down('form');
        form.loadRecord(record);
        smSbProjectTargetCostSplitStore.getProxy().extraParams['targetCost.projNo'] = record.get('projectTargetCostVo.projNo');
        this.refreshSplit();
        win.show();
    },

    addSplit: function () {
        smSbProjectTargetCostSplitRowEditing.cancelEdit();
        var record = Ext.create('iFlat.model.sm.TargetCost', {
            'targetCost.projNo': Ext.getCmp('sm-sbprojecttargetcostedit-projno').getValue(),
            'targetCost.projName': Ext.getCmp('sm-sbprojecttargetcostedit-projname').getValue(),
        })
        smSbProjectTargetCostSplitStore.insert(0, record);
        smSbProjectTargetCostSplitRowEditing.startEdit(0, 0);
    },
    
    updateSplitRecord: function (editor, context, eOpts) {
        var record = context.record;
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_saveTargetCost.action',
            method: 'post',
            params: record.getData(),
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                var obj = result['object'];
                // 如果未保存成功，则从store中移除此记录
                if (Flat.util.isEmpty(obj)) {
                    smSbProjectTargetCostSplitStore.reload();
                } else {
                    // 保存成功，则将返回的id填入相应的record的属性
                    if (Flat.util.isEmpty(record.get('targetCost.id'))) {
                        record.set('targetCost.id', obj['id']);
                        smSbProjectTargetCostSplitStore.insert(0, record);
                        var distribution = parseFloat(Ext.getCmp('sm-sbprojecttargetcostedit-distribute').getValue()) + parseFloat(obj['amount']);
                        var remain = parseFloat(Ext.getCmp('sm-sbprojecttargetcostedit-remain').getValue()) - parseFloat(obj['amount']);
                        Ext.getCmp('sm-sbprojecttargetcostedit-distribute').setValue(distribution);
                        Ext.getCmp('sm-sbprojecttargetcostedit-remain').setValue(remain);
                    }
                }
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                smSbProjectTargetCostSplitStore.reload();
            }
        });
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["targetCost.id"];
        if(id == "") {
            smSbProjectTargetCostSplitStore.remove(context.record);
        }
    },

    refreshSplit: function () {
        smSbProjectTargetCostSplitStore.reload({
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
                var remain = Ext.getCmp('sm-sbprojecttargetcostedit-amount').getValue() - distribution;
                Ext.getCmp('sm-sbprojecttargetcostedit-distribute').setValue(distribution);
                Ext.getCmp('sm-sbprojecttargetcostedit-remain').setValue(remain);
            }
        })
    },

    deleteSplit:function (grid, rowIndex, colIndex, item, e, record, row) {
        Ext.Msg.confirm("提示!","确定删除记录吗?",function(btn) {
            if(btn=="yes") {
                Flat.util.mask('删除中...');
                Ext.Ajax.request({
                    url: 'sm_deleteTargetCost.action',
                    method: 'post',
                    params: record.getData(),
                    success: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        var result = Ext.JSON.decode(response.responseText);
                        var obj = result['object'];
                        if (!Flat.util.isEmpty(obj)) {
                            smSbProjectTargetCostSplitStore.remove(record);
                            var distribution = parseFloat(Ext.getCmp('sm-sbprojecttargetcostedit-distribute').getValue()) - parseFloat(obj['amount']);
                            var remain = parseFloat(Ext.getCmp('sm-sbprojecttargetcostedit-remain').getValue()) + parseFloat(obj['amount']);
                            Ext.getCmp('sm-sbprojecttargetcostedit-distribute').setValue(distribution);
                            Ext.getCmp('sm-sbprojecttargetcostedit-remain').setValue(remain);
                        }
                    },
                    failure: function(response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        smSbProjectTargetCostSplitStore.reload();
                    }
                });
            };
        })

    },

    onCostAccountChange: function (combo, record, eOpts) {
        Ext.getCmp('sm-sbprojecttargetcostedit-detail-costaccountname').setValue(record.get('targetCostAccount.name'));
    },


    uploadFile: function(btn) {
        var form = Ext.getCmp('sm-sbprojecttargetcost-import');
        if (form.isValid()) {
            form.submit({
                url: 'sm_importTargetCost.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    smProjectTargetCostStore.reload();
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
            url: 'sm_templateTargetCost.action',
            method: 'post',
            success: function(response, opts) {
                window.location.href = Ext.JSON.decode(response.responseText)['object'];
            },
        });
    },
})