Ext.define('iFlat.view.hr.Credit', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.hr-credit',
    xtype: 'hr-credit',

    controller: 'hr-credit',
    store: hrCreditStore = Ext.create('iFlat.store.hr.Credit', {
        proxy: {
            extraParams: {
                'credit.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),
    id: 'hr-credit',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'hr-credit-add',
            ui: 'orig-blue',
            handler: 'showCreditEdit',
        }, {
            xtype: 'textfield',
            fieldLabel: '船名',
            labelAlign: 'right',
            labelWidth: 30,
            width: 150,
            id: 'hr-credit-tbar-projname',
        }, {
            xtype: 'textfield',
            fieldLabel: '科室/队伍',
            labelAlign: 'right',
            labelWidth: 70,
            width: 180,
            id: 'hr-credit-tbar-team',
        }, {
            xtype: 'textfield',
            fieldLabel: '人员',
            labelAlign: 'right',
            labelWidth: 30,
            width: 150,
            id: 'hr-credit-tbar-personname',
        }, {
            xtype: 'textfield',
            fieldLabel: '描述',
            labelAlign: 'right',
            labelWidth: 30,
            width: 180,
            id: 'hr-credit-tbar-description',
        }, {
            text: '查询',
            id: 'hr-credit-search',
            handler: 'searchCredit',
        }, '->', {
            text: '刷新',
            id: 'hr-credit-refresh',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        text: '编辑',
        id: 'hr-credit-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showCreditEdit',
        editor: {
            xtype: 'label',
        }
    }, {
        text: '打印',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '打印',
        align: 'center',
        iconCls: 'x-fa fa-print',
        handler: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
            Print.credit(record.getData());
        },
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工号',
        dataIndex: 'credit.projNo',
    }, {
        header: '船名',
        dataIndex: 'credit.projName',
    }, {
        header: '日期',
        dataIndex: 'credit.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '类型',
        dataIndex: 'credit.type',
    }, {
        header: '部门',
        dataIndex: 'credit.dept',
    }, {
        header: '科室/队伍',
        dataIndex: 'credit.team',
    }, {
        header: '班组',
        dataIndex: 'credit.group',
    }, {
        header: '人员卡号',
        dataIndex: 'credit.personAcc',
        hidden: true
    }, {
        header: '人员',
        dataIndex: 'credit.personName',
    }, {
        header: '描述',
        dataIndex: 'credit.description',
    }, {
        text: '附件',
        dataIndex: 'credit.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a href='" + v + "'>附件</a>";
            }
        },
    }, {
        header: '区域',
        dataIndex: 'credit.area',
    }, {
        header: '区域长',
        dataIndex: 'credit.areaMgr',
    }, {
        header: '负责人',
        dataIndex: 'credit.manager',
    }, {
        header: '班长',
        dataIndex: 'credit.groupMgr',
    }, {
        header: '总管',
        dataIndex: 'credit.projMgr',
    }, {
        header: '主管',
        dataIndex: 'credit.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'credit.workMgr',
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'credit.amount',
    }, {
        header: '扣分',
        align: 'right',
        dataIndex: 'credit.score',
    }, {
        header: '责任部门',
        dataIndex: 'credit.creatorDept',
    }, {
        header: '登记人',
        dataIndex: 'credit.creatorName',
        hidden: true
    }, {
        text: '删除',
        id: 'hr-credit-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteCredit',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: hrCreditStore,
        displayInfo: true,
    }

});