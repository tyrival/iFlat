Ext.define('iFlat.view.system.Question', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.system-question',
    xtype: 'system-question',

    controller: 'system-question',
    //store: sysOrganizationStore = Ext.create('iFlat.store.system.Organization'),
    id: 'system-question',
    tbar: [{
        text: '新增',
        id: 'system-question-add',
        ui: 'orig-blue',
        handler: 'addQuestionEdit',
    }, '->', {
        text: '刷新',
        id: 'system-question-refresh',
        //handler: 'refreshList',
    }],
    /*columns: [{
        header: 'id',
        dataIndex: 'question.orgId',
        hidden: true,
        editor: {
            id: 'system-question-id',
            disabled: true,
        }
    }, {
        header: '代码',
        dataIndex: 'question.orgCode',
        width: 120,
        editor: {
        }
    }, {
        header: '名称',
        dataIndex: 'question.orgName',
        width: 140,
        flex: 1,
        editor: {
            allowBlank: false
        }
    }, {
        header: '父节点id',
        dataIndex: 'question.parentOrgId',
        width: 280,
        hidden: true,
        editor: {
            allowBlank: false,
            id: 'system-question-pid',
            disabled: true,
        }
    }, {
        header: '上级组织',
        dataIndex: 'question.parentOrgName',
        width: 280,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: sysOrganizationEditStore = Ext.create('iFlat.store.system.OrganizationEdit'),
            id: 'system-question-select',
            queryMode: 'local',
            editable: false,
            forceSelection : true,// 必须选择一个选项
            valueField : 'orgId',// 值,可选
            displayField : 'orgName',// 显示文本 ，对应下面store里的'text'，
            listeners : {
                change: 'transmitValueToTextField',
            }

        }
    }, {
        header: '别名',
        dataIndex: 'question.alias',
        width: 160,
        editor: {
        }
    }, {
        xtype: 'checkcolumn',
        id: 'system-question-status',
        header: '启用',
        dataIndex: 'question.status',
        width: 60,
        editor: {
            xtype: 'checkbox',
        },
        listeners: {
            checkchange: 'changeOrganizationStatus',
        }
    }, {
        text: '删除',
        id: 'system-question-delete',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteOrganization',
        editor: {
            xtype: 'label',
        }
    }],
    plugins: [
        sysOrganizationRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            id: 'system-question-edit',
            autoCancel: false,
            clicksToMoveEditor: 10000,
            listeners: {
                beforeedit: 'initParentCombobox',
                edit: 'updateOrgRecord',
                canceledit: 'reloadParentCombobox',
            }
        })
    ]*/
})