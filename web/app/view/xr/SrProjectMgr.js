Ext.define('iFlat.view.xr.SrProjectMgr', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-srprojectmgr',
    xtype: 'xr-srprojectmgr',

    controller: 'xr-srprojectmgr',
    store: xrSrProjectMgrStore = Ext.create('iFlat.store.xr.SrProjectMgr'),
    id: 'xr-srprojectmgr',
    tbar: [{
        text: '新增',
        id: 'xr-srprojectmgr-add',
        ui: 'orig-blue',
        handler: 'addSrProjectMgrRecord',
    },  '->', {
        text: '刷新',
        id: 'xr-srprojectmgr-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        xrSrProjectMgrRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'xr-srprojectmgr-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateSrProjectMgrRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: '工号',
        dataIndex: 'srProjectMgr.projNo',
        width: 220,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: xrSrProjectMgrProjectStore = Ext.create('iFlat.store.xr.Project', {
                proxy: {
                    extraParams: {
                        'xrProject.status': 0
                    }
                }
            }),
            id: 'xr-srprojectmgr-combo',
            queryMode: 'local',
            editable: true,
            forceSelection : true,
            typeAhead: true,
            anyMatch: true,
            minChars: 0,
            valueField : 'projNo',
            displayField : 'name',
            listeners: {
                select: function(combo, record, eOpts) {
                    var projName = record.get('name');
                    combo.nextSibling('textfield').setValue(projName);
                }
            }
        }
    }, {
        header: '船名',
        dataIndex: 'srProjectMgr.projName',
        flex: true,
        editor: {
            xtype: 'textfield',
            disabled: true,
            id: 'xr-srprojectmgr-projname'
        }
    }, {
        header: '账号',
        width: 250,
        dataIndex: 'srProjectMgr.account',
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: xrSrProjectMgrUserStore = Ext.create('iFlat.store.system.UserRoleVo', {
                proxy: {
                    extraParams: {
                        'userRoleVo.roleName': '新荣修船总管',
                    }
                }
            }),
            queryMode: 'local',
            editable: true,
            forceSelection : true,
            anyMatch: true,
            typeAhead: true,
            minChars: 0,
            valueField : 'account',
            displayField : 'userName',
            listeners: {
                select: function(combo, record, eOpts) {
                    var userName = record.get('userName');
                    combo.nextSibling('textfield').setValue(userName);
                }
            }
        }
    }, {
        header: '姓名',
        width: 250,
        dataIndex: 'srProjectMgr.name',
        editor: {
            xtype: 'textfield',
            editable: false,
            id: 'xr-srprojectmgr-name'
        }
    }, {
        text: '删除',
        id: 'xr-srprojectmgr-delete',
        width: 100,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSrProjectMgr',
        editor: {
            xtype: 'label',
        }
    }],

});