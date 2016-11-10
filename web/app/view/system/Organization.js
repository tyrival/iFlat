Ext.define('iFlat.view.system.Organization', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.system-organization',
    xtype: 'system-organization',

    require: [
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.state.*',
        'Ext.form.*'
    ],

    controller: 'system-organization',
    store: sysOrganizationStore = Ext.create('iFlat.store.system.Organization'),
    id: 'system-organization',
    tbar: [{
        text: '新增',
        id: 'system-organization-add',
        ui: 'orig-blue',
        handler: 'addOrgRecord',
    }, '->', {
        text: '刷新',
        id: 'system-organization-refresh',
        handler: 'refreshList',
    }],
    columns: [{
        header: 'id',
        dataIndex: 'organization.orgId',
        hidden: true,
        editor: {
            id: 'system-organization-id',
            disabled: true,
        }
    }, {
        header: '代码',
        dataIndex: 'organization.orgCode',
        width: 120,
        editor: {
        }
    }, {
        header: '名称',
        dataIndex: 'organization.orgName',
        width: 140,
        flex: 1,
        editor: {
            allowBlank: false
        }
    }, {
        header: '父节点id',
        dataIndex: 'organization.parentOrgId',
        width: 280,
        hidden: true,
        editor: {
            allowBlank: false,
            id: 'system-organization-pid',
            //disabled: true,
        }
    }, {
        header: '上级组织',
        dataIndex: 'organization.parentOrgName',
        width: 280,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: sysOrganizationEditStore = Ext.create('iFlat.store.system.OrganizationEdit'),
            id: 'system-organization-select',
            queryMode: 'local',
            editable: true,
            anyMatch: true,
            forceSelection : true,// 必须选择一个选项
            valueField : 'orgId',// 值,可选
            displayField : 'fullName',// 显示文本 ，对应下面store里的'text'，
            listeners : {
                change: 'transmitValueToTextField',
            }

        }
    }, {
        header: '别名',
        dataIndex: 'organization.alias',
        width: 160,
        editor: {
        }
    }, {
        xtype: 'checkcolumn',
        id: 'system-organization-status',
        header: '启用',
        dataIndex: 'organization.status',
        width: 60,
        editor: {
            xtype: 'checkbox',
        },
        listeners: {
            checkchange: 'changeOrganizationStatus',
        }
    }, {
        text: '删除',
        id: 'system-organization-delete',
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
            id: 'system-organization-edit',
            autoCancel: false,
            clicksToMoveEditor: 10000,
            listeners: {
                beforeedit: 'initParentCombobox',
                edit: 'updateOrgRecord',
                canceledit: 'reloadParentCombobox',
            }
        })
    ]
})