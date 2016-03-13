Ext.define('iFlat.view.workflow.ProcessDefinition', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.workflow-processdefinition',

    require: [
        'iFlat.view.workflow.ProcessDefinitionController'
    ],

    controller: 'workflow-processdefinition',
    
    store: workflowProcessDefinitionStore = Ext.create('iFlat.store.workflow.ProcessDefinition'),
    
    tbar: [{
        xtype: 'form',
        id: 'workflow-processdefinition-upload',
        items: [{
            xtype: 'fileuploadfield',
            fieldLabel: '附件',
            name: 'upload',
            buttonText: '选择...',
            width: 300,
            margin: '0 10 0 0',
        }]
    }, {
        xtype: 'button',
        text: '上传',
        ui: 'orig-blue',
        handler: 'upload'
    }, '->', {
        text: '刷新',
        id: 'workflow-processdefinition-refresh',
        handler: 'refresh',
    }],

    columns: [{
        header: 'ID',
        dataIndex: 'processDefinition.id',
        width: 180,
    }, {
        header: '名称',
        dataIndex: 'processDefinition.name',
        editor: {
            id: 'workflow-processdefinition-name',
        }
    }, {
        header: '键',
        dataIndex: 'processDefinition.key',
        editor: {
            id: 'workflow-processdefinition-key',
        }
    }, {
        header: '版本',
        dataIndex: 'processDefinition.version',
        editor: {
            id: 'workflow-processdefinition-version',
        }
    }, {
        header: '部署ID',
        dataIndex: 'processDefinition.deploymentId',
        editor: {
            id: 'workflow-processdefinition-deploymentId',
        }
    }, {
        header: '资源',
        dataIndex: 'processDefinition.resourceName',
        editor: {
            id: 'workflow-processdefinition-resourceName',
        }
    }, {
        header: '设计图',
        dataIndex: 'processDefinition.diagramResourceName',
        width: 180,
        editor: {
            id: 'workflow-processdefinition-diagramResourceName',
        }
    }, {
        header: '描述',
        dataIndex: 'processDefinition.description',
        flex: 1,
        editor: {
            id: 'workflow-processdefinition-description',
        }
    }, {
        text: '删除',
        id: 'workflow-processdefinition-delete',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'delete',
        editor: {
            xtype: 'label',
        }
    }],
})