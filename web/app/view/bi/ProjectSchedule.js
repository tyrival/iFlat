Ext.define('iFlat.view.bi.ProjectSchedule', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bi-projectschedule',
    xtype: 'bi-projectschedule',

    controller: 'bi-projectschedule',
    store: biProjectScheduleStore = Ext.create('iFlat.store.bi.ProjectSchedule'),
    id: 'bi-projectschedule',
    tbar: [{
        text: '新增',
        id: 'bi-projectschedule-add',
        ui: 'orig-blue',
        handler: 'addProjectScheduleRecord',
    }, '->', {
        text: '刷新',
        id: 'bi-projectschedule-refresh',
        handler: 'refreshList',
    }],
    plugins: [
        biProjectScheduleRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'bi-projectschedule-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateProjectScheduleRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    columns: [{
        header: '工号',
        dataIndex: 'projectSchedule.projNo',
        width: 150,
        editor: {
            xtype: 'combo',
            allowBlank: false,
            store: biProjectScheduleProjectStore = Ext.create('iFlat.store.bi.Project'),
            id: 'bi-projectschedule-projno-combo',
            queryMode: 'local',
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : true,
            anyMatch: true,
            valueField : 'projNo',
            displayField : 'shortName',
        }
    }, {
        header: '计划开工',
        width: 100,
        dataIndex: 'projectSchedule.commencePln',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '实际开工',
        width: 100,
        dataIndex: 'projectSchedule.commenceAct',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '计划上船台',
        width: 100,
        dataIndex: 'projectSchedule.shipwayPln',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '实际上船台',
        width: 100,
        dataIndex: 'projectSchedule.shipwayAct',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '计划下水',
        width: 100,
        dataIndex: 'projectSchedule.launchPln',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '实际下水',
        width: 100,
        dataIndex: 'projectSchedule.launchAct',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '计划试航',
        width: 100,
        dataIndex: 'projectSchedule.seaTrialPln',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '实际试航',
        width: 100,
        dataIndex: 'projectSchedule.seaTrialAct',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '计划交船',
        width: 100,
        dataIndex: 'projectSchedule.deliveryPln',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        header: '实际交船',
        width: 100,
        dataIndex: 'projectSchedule.deliveryAct',
        renderer: 'renderer',
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d',
        }
    }, {
        text: '删除',
        id: 'bi-projectschedule-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProjectSchedule',
        editor: {
            xtype: 'label',
        }
    }],

});