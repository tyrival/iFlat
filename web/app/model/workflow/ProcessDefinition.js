Ext.define('iFlat.model.workflow.ProcessDefinition', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'processDefinition.id', mapping: 'id', type: 'string'},
        {name: 'processDefinition.name', mapping: 'name', type: 'string'},
        {name: 'processDefinition.key', mapping: 'key', type: 'string'},
        {name: 'processDefinition.version', mapping: 'version', type: 'number'},
        {name: 'processDefinition.deploymentId', mapping: 'deploymentId', type: 'string'},
        {name: 'processDefinition.resourceName', mapping: 'resourceName', type: 'string'},
        {name: 'processDefinition.diagramResourceName', mapping: 'diagramResourceName', type: 'string'},
        {name: 'processDefinition.description', mapping: 'description', type: 'string'},
    ]
});