Ext.define('iFlat.view.workflow.TaskController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workflow-task',

    refresh: function(btn) {
        btn.up('grid').getStore().reload()
    },

    deal: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var formKey = record.get('formKey');
        var viewName = 'iFlat.view.' + formKey;
        //debugger
        var id = 'win-' + formKey.replace(/\./g, '-').toLowerCase();
        var win = Ext.getCmp(id);
        if(!win) {
            win = Ext.create('Ext.window.Window', {
                title: '审批',
                closeAction: 'hide',
                id: id,
                layout: 'fit',
                modal: true,
                //height: '95%',
                width: '95%',
                y: 20,
                items: [Ext.create(viewName)],
                listeners: {
                    hide: function () {
                        workflowTaskStore.reload();
                    }
                }
            });
        };
        var form = win.down('form');
        if (form) {
            form.loadRecord(record);
        }
        win.show();
    },
    
    showImage: function() {
        var win = Ext.getCmp('workflow-processimage');
        if(!win) {
            win = Ext.create('iFlat.view.workflow.ProcessImage');
        }
        Ext.getCmp('workflow-processimage-taskid').setValue("");
        win.show();
    }
})