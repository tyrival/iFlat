Ext.define('iFlat.view.workflow.TaskController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workflow-task',

    refresh: function() {
        workflowTaskStore.reload();
    },

    deal: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var formKey = record.get('formKey');
        var arr = formKey.split(':');
        var viewName = 'iFlat.view.' + arr[1];
        var text = arr[0];
        var id = 'win-' + text;
        var win = Ext.getCmp(id);
        if(!win) {
            win = Ext.create('Ext.window.Window', {
                title: '审批',
                closeAction: 'hide',
                id: id,
                layout: 'fit',
                modal: true,
                height: '95%',
                width: '95%',
                items: [Ext.create(viewName)],
                listeners: {
                    close: function () {
                        workflowTaskStore.reload();
                    }
                }
            });
        };
        win.show();
    },
    
    showImage: function() {
        var win = Ext.getCmp('workflow-processimage');
        if(!win) {
            win = Ext.create('iFlat.view.workflow.ProcessImage');
        }
        Ext.getCmp('workflow-processimage-taskid').setValue("111");
        win.show();
    }
})