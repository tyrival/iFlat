Ext.define('iFlat.view.pm.Project', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pm-project',
    xtype: 'pm-project',

    controller: 'pm-project',
    store: pmProjectStore = Ext.create('iFlat.store.pm.Project', {
        proxy: {
            extraParams: {
                'pmProject.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),
    id: 'pm-project',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'pm-project-add',
            ui: 'orig-blue',
            handler: 'showProjectEdit',
        }, {
            xtype: 'combo',
            fieldLabel: '类型',
            labelAlign: 'right',
            labelWidth: 50,
            width: 150,
            id: 'pm-project-tbar-type',
            bind: {
                store: '{pmProjectType}'
            }
        }, {
            xtype: 'textfield',
            fieldLabel: '名称',
            labelAlign: 'right',
            labelWidth: 50,
            width: 180,
            id: 'pm-project-tbar-name',
        }, {
            xtype: 'textfield',
            fieldLabel: '备注',
            labelAligh: 'right',
            labelWidth: 50,
            width: 150,
            id: 'pm-project-tbar-comment',
        }, {
            xtype: 'textfield',
            fieldLabel: '状态',
            labelAligh: 'right',
            labelWidth: 50,
            width: 180,
            id: 'pm-project-tbar-status',
        }, {
            text: '查询',
            id: 'pm-project-search',
            handler: 'searchProject',
        }, '->', {
            text: '刷新',
            id: 'pm-project-refresh',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        text: '编辑',
        id: 'pm-project-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showProjectEdit',
        editor: {
            xtype: 'label',
        }
    }, {
        header: '类型',
        dataIndex: 'pmProject.type',
    }, {
        header: '名称',
        dataIndex: 'pmProject.name',
    }, {
        header: '项目经理',
        dataIndex: 'pmProject.mgrName',
    }, {
        header: '项目经理账号',
        dataIndex: 'pmProject.mgrAcc',
        hidden: true
    }, {
        header: '说明',
        dataIndex: 'pmProject.description',
    }, {
        header: '备注',
        dataIndex: 'pmProject.comment',
    }, {
        header: '计划完成',
        dataIndex: 'pmProject.deadline',
        formatter: 'date("Y-m-d")'
    }, {
        header: '实际完成',
        dataIndex: 'pmProject.completeTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '超期',
        dataIndex: 'pmProject.overDue',
    }, {
        text: '附件',
        dataIndex: 'pmProject.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a pmef='" + v + "'>附件</a>";
            }
        },
    }, {
        text: '删除',
        id: 'pm-project-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteProject',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pmProjectStore,
        displayInfo: true,
    }

});