Ext.define('iFlat.view.sm.Fine', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-fine',
    xtype: 'sm-fine',

    controller: 'sm-fine',
    store: smFineStore = Ext.create('iFlat.store.sm.Fine', {
        proxy: {
            extraParams: {
                'fine.creator': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),
    id: 'sm-fine',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'sm-fine-add',
            ui: 'orig-blue',
            handler: 'showFineEdit',
        }, {
            xtype: 'textfield',
            fieldLabel: '船名',
            labelAligh: 'right',
            labelWidth: 30,
            width: 150,
            id: 'sm-fine-tbar-projname',
        }, {
            xtype: 'textfield',
            fieldLabel: '施工队',
            labelAligh: 'right',
            labelWidth: 50,
            width: 160,
            id: 'sm-fine-tbar-team',
        }, {
            xtype: 'textfield',
            fieldLabel: '人员',
            labelAligh: 'right',
            labelWidth: 30,
            width: 150,
            id: 'sm-fine-tbar-personname',
        }, {
            xtype: 'textfield',
            fieldLabel: '描述',
            labelAligh: 'right',
            labelWidth: 30,
            width: 180,
            id: 'sm-fine-tbar-description',
        }, {
            text: '查询',
            id: 'sm-fine-search',
            handler: 'searchFine',
        }, '->', {
            text: '刷新',
            id: 'sm-fine-refresh',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        text: '编辑',
        id: 'sm-fine-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showFineEdit',
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
            Print.fine(record.getData());
        },
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工号',
        dataIndex: 'fine.projNo',
    }, {
        header: '船名',
        dataIndex: 'fine.projName',
    }, {
        header: '日期',
        dataIndex: 'fine.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '考核类',
        dataIndex: 'fine.type',
    }, {
        header: '类别',
        dataIndex: 'fine.category',
    }, {
        header: '部门',
        dataIndex: 'fine.dept',
    }, {
        header: '施工队',
        dataIndex: 'fine.team',
    }, {
        header: '班组',
        dataIndex: 'fine.group',
    }, {
        header: '人员卡号',
        dataIndex: 'fine.personAcc',
        hidden: true
    }, {
        header: '人员',
        dataIndex: 'fine.personName',
    }, {
        header: '描述',
        dataIndex: 'fine.description',
    }, {
        text: '附件',
        dataIndex: 'fine.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a href='" + v + "'>附件</a>";
            }
        },
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'fine.amount',
    }, {
        header: '扣分',
        dataIndex: 'fine.score',
    }, {
        header: '签发人',
        dataIndex: 'fine.issuer',
    }, {
        text: '删除',
        id: 'sm-fine-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteFine',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: smFineStore,
        displayInfo: true,
    }

});