Ext.define('iFlat.model.workflow.Task', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'task.id', mapping: 'id', type: 'string'},
        {name: 'task.name', mapping: 'name', type: 'string'},
        {name: 'task.createTime', mapping: 'createTime', type: 'date'},
        {name: 'task.assignee', mapping: 'assignee', type: 'string'},
        {name: 'task.description', mapping: 'description', type: 'string'},
        {name: 'task.formKey', mapping: 'formKey', type: 'string'},
        {name: 'task.processDefinitionId', mapping: 'processDefinitionId', type: 'string'},
    ]
});