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

    changeGridWithType: function (window, eOpts) {

        var type = window.down('textfield[name=srSettlement.type]').getValue();
        type = Ext.util.Format.lowercase(type);
        var xtype = 'sm-detail-srapprove' + type;

        // 遍历所有明细表组建，显示与当前单据类型匹配的表格
        var items = window.down('panel[name=detail]').items.items;
        for (var i = 0; i < items.length; i++) {
            var cmp = items[i];
            cmp.setHidden(!cmp.isXType(xtype));
        }

        // 刷新明细store
        var store = window.down('sm-detail-srapprove' + type).getStore();
        var id = window.down('textfield[name=srSettlement.id]').getValue();
        store.getProxy().extraParams['srSettlementDetlFirst.pid'] = id;
        store.reload();

        /* 根据单据类型，显示或隐藏部分组件 */
        // 如果不是机电修理类型，则不显示工程队选择菜单
        var team = window.down('textfield[name=srSettlement.team]');
        team.setHidden(type != 'sys');
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
        var commentCmp = Ext.getCmp('sm-srsettlementapproveinfo-comment');
        var comment = commentCmp.getValue();
        if (Flat.util.isEmpty(comment)) {
            Ext.Msg.show({
                title:'警告',
                message: '请填写审批意见。',
            });
        } else {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            Flat.util.mask();
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
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    commentCmp.setValue('');
                    Ext.getCmp('sm-srsettlementapproveinfo').hide();
                    var active = Ext.WindowManager.getActive();
                    if (active && active.isXType('window')) {
                        active.down('grid').getStore().reload();
                    }
                },
                failure: function(response, opts) {
                    Flat.util.unmask();
                    Flat.util.tip(response.responseText);
                    commentCmp.setValue('');
                    Ext.getCmp('sm-srsettlementapproveinfo').hide();
                    var active = Ext.WindowManager.getActive();
                    if (active && active.isXType('window')) {
                        active.down('grid').getStore().reload();
                    }
                }
            });
        }

    }
});