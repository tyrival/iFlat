Ext.define('iFlat.view.workflow.Task', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.workflow-task',

    require: [
        'iFlat.view.workflow.TaskController',
    ],

    controller: 'workflow-task',

    store: workflowTaskStore = Ext.create('iFlat.store.workflow.Task'),

    tbar: ['->', {
        text: '刷新',
        id: 'workflow-task-refresh',
        handler: 'refresh',
    }],

    columns: [{
        text: '办理',
        id: 'workflow-task-deal',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        align: 'center',
        iconCls: 'x-fa fa-paw',
        handler: 'deal',
        editor: {
            xtype: 'label',
        }
    }, {
        header: 'ID',
        dataIndex: 'task.id',
        hidden: true
    }, {
        header: '任务名',
        dataIndex: 'task.name',
        width: 150
    }, {
        header: '创建时间',
        dataIndex: 'task.createTime',
        formatter: 'date("Y-m-d H:i")',
        width: 150
    }, {
        header: '任务描述',
        flex: true,
        dataIndex: 'task.description',
    }, {
        header: '办理者',
        dataIndex: 'task.assignee',
    }, {
        header: 'FormKey',
        dataIndex: 'task.formKey',
        hidden: true,
    }, {
        header: '流程定义ID',
        dataIndex: 'task.processDefinitionId',
        hidden: true
    }],
})