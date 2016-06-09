Ext.define('iFlat.view.qm.QualityFine', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.qm-qualityfine',
    xtype: 'qm-qualityfine',

    controller: 'qm-qualityfine',
    store: qmQualityFineStore = Ext.create('iFlat.store.qm.QualityFine', {
        proxy: {
            extraParams: {
                'qualityFine.creator': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),
    id: 'qm-qualityfine',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'qm-qualityfine-add',
            ui: 'orig-blue',
            handler: 'showQualityFineEdit',
        }, {
            xtype: 'tbspacer',
            width: 50,
        }, {
            xtype: 'textfield',
            fieldLabel: '船名',
            labelAligh: 'right',
            labelWidth: 30,
            width: 150,
            id: 'qm-qualityfine-tbar-projname',
        }, {
            xtype: 'textfield',
            fieldLabel: '施工队',
            labelAligh: 'right',
            labelWidth: 50,
            width: 160,
            id: 'qm-qualityfine-tbar-team',
        }, {
            xtype: 'textfield',
            fieldLabel: '人员',
            labelAligh: 'right',
            labelWidth: 30,
            width: 150,
            id: 'qm-qualityfine-tbar-personname',
        }, {
            xtype: 'textfield',
            fieldLabel: '描述',
            labelAligh: 'right',
            labelWidth: 30,
            width: 180,
            id: 'qm-qualityfine-tbar-description',
        }, {
            text: '查询',
            id: 'qm-qualityfine-search',
            handler: 'searchQualityFine',
        }, '->', {
            text: '刷新',
            id: 'qm-qualityfine-refresh',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        text: '编辑',
        id: 'qm-qualityfine-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showQualityFineEdit',
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工号',
        dataIndex: 'qualityFine.projNo',
    }, {
        header: '船名',
        dataIndex: 'qualityFine.projName',
    }, {
        header: '日期',
        dataIndex: 'qualityFine.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '专业',
        dataIndex: 'qualityFine.profession',
    }, {
        header: '部门',
        dataIndex: 'qualityFine.dept',
    }, {
        header: '施工队',
        dataIndex: 'qualityFine.team',
    }, {
        header: '班组',
        dataIndex: 'qualityFine.group',
    }, {
        header: '人员卡号',
        dataIndex: 'qualityFine.personAcc',
        hidden: true
    }, {
        header: '人员',
        dataIndex: 'qualityFine.personName',
    }, {
        header: '描述',
        dataIndex: 'qualityFine.description',
    }, {
        text: '附件',
        dataIndex: 'qualityFine.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a href='" + v + "'>附件</a>";
            }
        },
    }, {
        header: '考核性质',
        dataIndex: 'qualityFine.category',
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'qualityFine.amount',
    }, {
        header: '考核人',
        dataIndex: 'qualityFine.qc',
    }, {
        header: '备注',
        dataIndex: 'qualityFine.comment',
    }, {
        header: '登记人',
        dataIndex: 'qualityFine.creator',
        hidden: true
    }, {
        header: '登记日期',
        dataIndex: 'qualityFine.createTime',
        hidden: true
    }, {
        text: '删除',
        id: 'qm-qualityfine-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteQualityFine',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: qmQualityFineStore,
        displayInfo: true,
    }

});