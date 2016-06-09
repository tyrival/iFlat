Ext.define('iFlat.view.sm.temp.ScSettlementApproveController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-scsettlementapprove',

    comment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listScSettlementComment.action',
                extraParams: {
                    'scSettlement.id': Ext.getCmp('sm-scsettlementapproveinfo-id').getValue()
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
        var win = Ext.getCmp('sm-scsettlementapproveinfo');
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.ScSettlementApproveInfo');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    /**
     * 自动更新明细行数据
     */
    loadDetail: function (field, newValue, oldValue, eOpts) {
        smScSettlementApproveInfoDetailStore.getProxy()
            .extraParams['scSettlementDetail.pid'] = newValue;
        smScSettlementApproveInfoDetailStore.reload();
    },
    
    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('sm-scsettlementapproveinfo-down');
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
        var comment = Ext.getCmp('sm-scsettlementapproveinfo-comment').getValue();
        var text = btn.getText();
        text = text === '通过' ? 'pass' : 'reject';
        if (Flat.util.isEmpty(comment)) {
            comment = text === 'pass' ? '同意' : '不同意';
        }
        Flat.util.mask();
        Ext.Ajax.request({
            url: 'sm_approveScSettlement.action',
            method: 'post',
            params: {
                'scSettlement.id': Ext.getCmp('sm-scsettlementapproveinfo-id')
                    .getValue(),
                'outGoingName': text,
                'comment': comment,
            },
            success: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                Ext.getCmp('sm-scsettlementapprove').getStore().reload()
                Ext.getCmp('sm-scsettlementapproveinfo').hide();
                Ext.getCmp('sm-scsettlementapproveinfo-comment').setValue('同意');
            },
            failure: function(response, opts) {
                Flat.util.unmask();
                Flat.util.tip(response.responseText);
                Ext.getCmp('sm-scsettlementapprove').getStore().reload()
                Ext.getCmp('sm-scsettlementapproveinfo').hide();
                Ext.getCmp('sm-scsettlementapproveinfo-comment').setValue('同意');
            }
        });
    }
});