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
        var nodeId = 'tab_' + arr[1].replace(/\./g, '_');

        var tabPanel = Ext.getCmp('main-view-tabpanel');
        var itemList = tabPanel.items.keys;
        var hasExisted = false;
        for(var i = 0; i < itemList.length; i++) {
            if(nodeId == itemList[i]) {
                hasExisted = true;
            }
        };
        if(!hasExisted) {
            var item = Ext.create(viewName, {
                title: text,
                itemId: nodeId,
                closable: true,
            });
            tabPanel.add(item);
        };
        tabPanel.getLayout().setActiveItem(nodeId);
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