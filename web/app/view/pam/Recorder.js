Ext.define('iFlat.view.pam.Recorder', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-recorder',
    xtype: 'pam-recorder',

    requires: [
        'iFlat.view.pam.RecorderController',
    ],

    controller: 'pam-recorder',
    store: pamRecorderStore = Ext.create('iFlat.store.pam.Recorder'),
    id: 'pam-recorder',

    plugins: [
        pamRecorderRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'pam-recorder-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateRecorderRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'addRecorderRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '党支部',
        dataIndex: 'recorder.pbName',
        flex: 1,
        editor: {
            xtype: 'combo',
            store: pamRecorderPbNameStore = Ext.create('iFlat.store.pam.PartyBranch'),
            queryMode: 'local',
            allowBlank: true,
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : false,
            anyMatch: true,
            displayField: 'name',
            valueField: 'name',
        }
    }, {
        header: '姓名',
        dataIndex: 'recorder.name',
        flex: 1,
        editor: {
            xtype: 'combo',
            queryMode: 'local',
            allowBlank: true,
            editable: true,
            forceSelection : true,
            typeAhead: true,
            anyMatch: true,
            minChars: 0,
            displayField: 'name',
            valueField: 'name',
            store: pamRecordWorkerStore = Ext.create('iFlat.store.code.Employee', {
                autoLoad: true,
            }),
            listeners: {
                select: 'onPersonChange',
            }
        }
    }, {
        header: '账号',
        dataIndex: 'recorder.account',
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'pam-recorder-account',
            allowBlank: false,
            editable: false
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteRecorder',
        editor: {
            xtype: 'label',
        }
    }],
});