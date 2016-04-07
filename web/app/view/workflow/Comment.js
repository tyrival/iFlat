Ext.define('iFlat.view.workflow.Comment', {
    extend: 'Ext.window.Window',
    alias: 'widget.workflow-comment',
    title: '批注',
    layout: 'fit',
    modal: true,

    id: 'workflow-comment',
    closeAction: 'hide',
    width: 800,
    store: workflowCommentStore = Ext.create('iFlat.store.workflow.Comment'),
    items: [{
        xtype: 'grid',
        id: 'workflow-comment-grid',
        border: true,
        columnLines: true,
        flex: 1,  //开启竖向滚动条
        columns: [{
            text: '时间',
            width: 150,
            align: 'center',
            dataIndex: 'comment.time',
            formatter: 'date("Y-m-d H:i")'
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