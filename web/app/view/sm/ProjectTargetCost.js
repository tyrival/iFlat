Ext.define('iFlat.view.sm.ProjectTargetCost', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-projecttargetcost',
    xtype: 'sm-projecttargetcost',

    requires: [
        'iFlat.view.sm.ProjectTargetCostController',
    ],
    
    controller: 'sm-projecttargetcost',
    store: smProjectTargetCostStore = Ext.create('iFlat.store.sm.ProjectTargetCost'),
    id: 'sm-projecttargetcost',

    
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'sm-projecttargetcost-add',
            ui: 'orig-blue',
            handler: 'edit',
        }, {
            xtype: 'combo',
            id: 'sm-projecttargetcost-combo',
            store: smSbTargetCostComboStore = Ext.create('iFlat.store.report.bi.Project', {
                proxy: {
                    extraParams: {
                        'rptProject.status': 0,
                    }
                }
            }),
            queryMode: 'local',
            allowBlank: false,
            editable: true,
            typeAhead: true,
            minChars: 0,
            forceSelection : true,
            anyMatch: true,
            displayField: 'name',
            valueField: 'projNo',
            width: 250,
            fieldLabel: '船名',
            labelAlign: 'right',
            labelWidth: 40
        }, {
            text: '查询',
            handler: 'search'
        }, {
            xtype: 'form',
            id: 'sm-projecttargetcost-import',
            items: [{
                xtype: 'fileuploadfield',
                name: 'upload',
                buttonText: '选择...',
                width: 150,
                margin: '0 0 0 20',
            }, ]
        }, {
            xtype: 'button',
            text: '导入',
            ui: 'orig-blue',
            handler: 'uploadFile'
        }, '->', {
            text: '下载模板',
            id: 'bi-projectcost-template',
            handler: 'downloadTemplate'
        }, {
            text: '刷新',
            id: 'sm-projectTargetCost-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        text: '编辑',
        width: 50,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'edit',
    }, {
        header: '工号',
        width: 120,
        dataIndex: 'projectTargetCost.projNo',
    }, {
        header: '船名',
        width: 350,
        dataIndex: 'projectTargetCost.projName',
    }, {
        header: '金额',
        dataIndex: 'projectTargetCost.amount',
        width: 120,
    }, {
        header: '附件',
        dataIndex: 'projectTargetCost.attachment',
        renderer: function (v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a href='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '备注',
        dataIndex: 'projectTargetCost.comment',
        flex: true,
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProjectTargetCost',
        editor: {
            xtype: 'label',
        }
    }],
});