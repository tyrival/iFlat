Ext.define('iFlat.view.workflow.ProcessImageController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.workflow-processimage',

    beforeshow: function () {
        Ext.Ajax.request({
            url: 'workflow_viewImage.action?taskId=' + Ext.getCmp('workflow-processimage-taskid').getValue(),
            method: 'POST',
            success: function(response, opts) {
                var o = Ext.JSON.decode(response.responseText);
                var img = Ext.getCmp('workflow-processimage-image');
                img.setSrc(o['map']['path']);
                img.setHeight(o['map']['imageHeight']);
                img.setWidth(o['map']['imageWidth']);
                Ext.getCmp('workflow-processimage-taskid').setValue(o['map']['path']);
                var node = Ext.getCmp('workflow-processimage-node');
                node.setX(o['map']['x']);
                node.setY(o['map']['y']);
                node.setWidth(o['map']['width']);
                node.setHeight(o['map']['height']);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        })
    },

    beforeclose: function() {
        Ext.Ajax.request({
            url: 'workflow_deleteImage.action?imagePath=' + Ext.getCmp('workflow-processimage-taskid').getValue(),
            method: 'POST',
            success: function(response, opts) {
            },
            failure: function(response, opts) {
            }
        })
    }

})