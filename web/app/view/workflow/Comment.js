Ext.define('iFlat.view.workflow.Comment', {
    extend: 'Ext.window.Window',
    alias: 'widget.workflow-comment',
    title: '批注',
    layout: 'fit',
    modal: true,

    requires: [
        'Ext.grid.plugin.Exporter'
    ],

    id: 'workflow-comment',
    closeAction: 'hide',
    width: 800,
    store: workflowCommentStore = Ext.create('iFlat.store.workflow.Comment'),
    maxHeight: 500,
    y: 20,

    tbar: ['->', {
        text: '导出',
        handler: function(btn) {
            var grid = Ext.getCmp('workflow-comment-grid');
            grid.saveDocumentAs({
                title: '批注',
                fileName: '批注.xls',
            })
        }
    }],
    items: [{
        xtype: 'grid',
        plugins: [{
            ptype: 'gridexporter'
        }],
        id: 'workflow-comment-grid',
        border: true,
        columnLines: true,
        flex: 1,  //开启竖向滚动条
        columns: [{
            text: '时间',
            width: 150,
            align: 'center',
            dataIndex: 'comment.time',
            renderer: function(value, summaryData) {
            	if (!Ext.isIE) {
                	value = Ext.Date.add(value, Ext.Date.HOUR, -8);
            	}
                return Ext.Date.format(value, "Y-m-d H:i");
                return Ext.Date.format(value, "Y-m-d H:i");
            },
            //formatter: 'date("Y-m-d H:i")'
        }, {
            text: '审批人',
            width: 100,
            align: 'center',
            dataIndex: 'comment.userId',
        }, {
            text: '内容',
            flex: true,
            align: 'left',
            dataIndex: 'comment.message',
        }]
    }],
});