Ext.define('iFlat.view.sm.SrProjectManager', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-srprojectmanager',
    xtype: 'sm-srprojectmanager',

    controller: 'sm-srprojectmanager',
    store: smSrProjectManagerStore = Ext.create('iFlat.store.sm.SrProjectManager'),
    id: 'sm-srprojectmanager',
    tbar: [{
        text: '新增',
        id: 'sm-srprojectmanager-add',
        ui: 'orig-blue',
        handler: 'addSrProjectManagerRecord',
    },  '->', {
        text: '刷新',
        id: 'sm-srprojectmanager-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        smSrProjectManagerRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'sm-srprojectmanager-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateSrProjectManagerRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: '工号',
        dataIndex: 'srProjectManager.projNo',
        width: 220,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: smSrProjectManagerProjectStore = Ext.create('iFlat.store.report.bi.Project', {
                proxy: {
                    extraParams: {
                        'rptProject.type': '修船',
                        'rptProject.status': 0
                    }
                }
            }),
            id: 'sm-srprojectmanager-combo',
            queryMode: 'local',
            editable: true,
            forceSelection : true,
            typeAhead: true,
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
        dataIndex: 'srProjectManager.projName',
        flex: true,
        editor: {
            xtype: 'textfield',
            disabled: true,
            id: 'sm-srprojectmanager-projname'
        }
    }, {
        header: '账号',
        width: 250,
        dataIndex: 'srProjectManager.account',
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: smSrProjectManagerUserStore = Ext.create('iFlat.store.system.UserRoleVo', {
                proxy: {
                    extraParams: {
                        'userRoleVo.roleName': '修船总管',
                    }
                }
            }),
            queryMode: 'local',
            editable: true,
            forceSelection : true,
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
        dataIndex: 'srProjectManager.name',
        editor: {
            xtype: 'textfield',
            disabled: true,
            id: 'sm-srprojectmanager-name'
        }
    }, {
        text: '删除',
        id: 'sm-srprojectmanager-delete',
        width: 100,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSrProjectManager',
        editor: {
            xtype: 'label',
        }
    }],

});