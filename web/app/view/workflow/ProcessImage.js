Ext.define('iFlat.view.workflow.ProcessImage', {
    extend: 'Ext.window.Window',
    alias: 'widget.workflow-processimage',
    title: '流程图查看',
    layout: 'fit',
    modal: true,

    id: 'workflow-processimage',
    controller: 'workflow-processimage',
    closeAction: 'hide',
    
    requires: [
        'iFlat.view.workflow.ProcessImageController',
    ],
    items: [{
        xtype: 'panel',
        maxHeight: '500',
        scrollable: 'y',
        items: [{
            xtype: 'image',
            id: 'workflow-processimage-image',
            margin: 10,
            border: true,
            src: '',
        },]
    }, {
        xtype: 'container',
        id: 'workflow-processimage-node',
        style: 'position:absolute; border:red solid 1px;',
        
    }, {
        xtype: 'textfield',
        id: 'workflow-processimage-taskid',
        width: 200,
        hidden: true,
    }],

    listeners: {
        beforeshow: 'beforeshow',
        beforeclose: 'beforeclose'
    }
});