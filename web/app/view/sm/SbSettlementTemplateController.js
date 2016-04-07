Ext.define('iFlat.view.sm.SbSettlementTemplateController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sbsettlementtemplate',

    comment: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('workflow-comment');
        if (!win) {
            win = Ext.create('iFlat.view.workflow.Comment');
        }
        win.down('grid').setStore(Ext.create('iFlat.store.workflow.Comment', {
            proxy: {
                url: 'sm_listSbSettlementComment.action',
                extraParams: {
                    'sbSettlement.id': Ext.getCmp('sm-sbsettlementinfotemplate-id').getValue()
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
        var win = Ext.getCmp('sm-sbsettlementinfotemplate');
        if (!win) {
            win = Ext.create('iFlat.view.sm.SbSettlementInfoTemplate');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    /**
     * 自动更新明细行数据
     */
    loadDetail: function (field, newValue, oldValue, eOpts) {
        smSbSettlementInfoTemplateDetailStore.getProxy()
            .extraParams['sbSettlementDetail.pid'] = newValue;
        smSbSettlementInfoTemplateDetailStore.reload();
    },
    
    /**
     * 上传附件时触发显示附件下载和删除按钮
     */
    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        var btnDown = Ext.getCmp('sm-sbsettlementinfotemplate-down');
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
        var comment = Ext.getCmp('sm-sbsettlementinfotemplate-comment').getValue();
        if (Flat.util.isEmpty(comment)) {
            Ext.Msg.show({
                title:'警告',
                message: '请填写审批意见。',
            });
        } else {
            var text = btn.getText();
            text = text === '通过' ? 'pass' : 'reject';
            Ext.Ajax.request({
                url: 'sm_approveSbSettlement.action',
                method: 'post',
                params: {
                    'sbSettlement.id': Ext.getCmp('sm-sbsettlementinfotemplate-id')
                        .getValue(),
                    'outGoingName': text,
                    'comment': comment,
                },
                success: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-sbsettlementtemplate').getStore().reload()
                    Ext.getCmp('sm-sbsettlementinfotemplate').hide();
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                    Ext.getCmp('sm-sbsettlementtemplate').getStore().reload()
                    Ext.getCmp('sm-sbsettlementinfotemplate').hide();
                }
            });
        }

    }
});