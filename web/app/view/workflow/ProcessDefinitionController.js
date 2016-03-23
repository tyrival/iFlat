Ext.define('iFlat.view.workflow.ProcessDefinitionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workflow-processdefinition',

    //刷新
    refresh: function() {
        workflowProcessDefinitionStore.reload();
    },

    delete: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('deploymentId');
        Ext.Msg.confirm("提示!","确定要删除该流程定义吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'workflow_deleteProcessDefinition.action?deploymentId=' + id,
                    method: 'POST',
                    success: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        workflowProcessDefinitionStore.reload();
                    },
                    failure: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        workflowProcessDefinitionStore.reload();
                    }
                })
            };
        })
    },

    upload: function(btn) {
        var form = Ext.getCmp('workflow-processdefinition-upload');
        if (form.isValid()) {
            form.submit({
                url: 'workflow_uploadProcessDefinition.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    workflowProcessDefinitionStore.reload();
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    workflowProcessDefinitionStore.reload();
                }
            })
        }
    },
})