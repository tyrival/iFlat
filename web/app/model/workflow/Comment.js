Ext.define('iFlat.model.workflow.Comment', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'comment.id', mapping: 'id', type: 'string'},
        {name: 'comment.type', mapping: 'type', type: 'string'},
        {name: 'comment.userId', mapping: 'userId', type: 'string'},
        {name: 'comment.time', mapping: 'time', type: 'date'},
        {name: 'comment.taskId', mapping: 'taskId', type: 'string'},
        {name: 'comment.processInstanceId', mapping: 'processInstanceId', type: 'string'},
        {name: 'comment.action', mapping: 'action', type: 'string'},
        {name: 'comment.message', mapping: 'message', type: 'string'},
        {name: 'comment.fullMessage', mapping: 'fullMessage', type: 'string'},
    ]
});