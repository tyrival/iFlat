Ext.define('iFlat.view.sm.SbRequestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-sbrequest',

    //刷新
    refresh: function() {
        smSbRequestStore.reload();
    },

    /*delete: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('deploymentId');
        Ext.Msg.confirm("提示!","确定要删除该流程定义吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'sm_deleteSbRequest.action?deploymentId=' + id,
                    method: 'POST',
                    success: function(response, opts) {
                        tip(response.responseText);
                        smSbRequestStore.reload();
                    },
                    failure: function(response, opts) {
                        tip(response.responseText);
                        smSbRequestStore.reload();
                    }
                })
            };
        })
    },*/

    start: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","确定要启动流程吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'sbrequest_startProcess.action',
                    params: record.getData(),
                    method: 'POST',
                    success: function(response, opts) {
                        tip(response.responseText);
                        smSbRequestStore.reload();
                    },
                    failure: function(response, opts) {
                        tip(response.responseText);
                        smSbRequestStore.reload();
                    }
                })
            };
        })
    },
})