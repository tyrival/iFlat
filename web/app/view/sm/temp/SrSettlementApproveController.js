Ext.define('iFlat.view.sm.temp.SrSettlementApproveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-srsettlementapprove',
    
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
                    'srSettlement.id': Ext.getCmp('sm-srsettlementapproveinfo-id').getValue()
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
        var win = Ext.getCmp('sm-srsettlementapproveinfo');
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.SrSettlementApproveInfo');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    changeGridWithType: function (panel, eOpts) {
        var type = panel.up('window').down('textfield[name=srSettlement.type]').getValue();
        var xtype = 'sm-detail-srapprove' + type.toLowerCase();
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
        var btnDown = Ext.getCmp('sm-srsettlementapproveinfo-down');
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
        var comment = Ext.getCmp('sm-srsettlementapproveinfo-comment').getValue();
        if (Flat.util.isEmpty(comment)) {
            Ext.Msg.show({
                title:'警告',
                message: '请填写审批意见。',
            });
        } else {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            Ext.Ajax.request({
                url: 'sm_approveSrSettlement.action',
                method: 'post',
                params: {
                    'srSettlement.id': Ext.getCmp('sm-srsettlementapproveinfo-id')
                        .getValue(),
                    'outGoingName': text,
                    'comment': comment,
                },
                success: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-srsettlementapprove').getStore().reload()
                    Ext.getCmp('sm-srsettlementapproveinfo').hide();
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-srsettlementapprove').getStore().reload()
                    Ext.getCmp('sm-srsettlementapproveinfo').hide();
                }
            });
        }

    }
});