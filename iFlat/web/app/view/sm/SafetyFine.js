Ext.define('iFlat.view.sm.SafetyFine', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sm-safetyfine',
    xtype: 'sm-safetyfine',

    controller: 'sm-safetyfine',
    store: smSafetyFineStore = Ext.create('iFlat.store.sm.SafetyFine'),
    id: 'sm-safetyfine',
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'sm-safetyfine-add',
            ui: 'orig-blue',
            handler: 'showSafetyFineEdit',
        }, {
            xtype: 'textfield',
            fieldLabel: '船名',
            labelAligh: 'right',
            labelWidth: 30,
            width: 150,
            id: 'sm-safetyfine-tbar-projname',
        }, {
            xtype: 'textfield',
            fieldLabel: '施工队',
            labelAligh: 'right',
            labelWidth: 50,
            width: 160,
            id: 'sm-safetyfine-tbar-team',
        }, {
            xtype: 'textfield',
            fieldLabel: '人员',
            labelAligh: 'right',
            labelWidth: 30,
            width: 150,
            id: 'sm-safetyfine-tbar-personname',
        }, {
            xtype: 'textfield',
            fieldLabel: '描述',
            labelAligh: 'right',
            labelWidth: 30,
            width: 180,
            id: 'sm-safetyfine-tbar-description',
        }, {
            text: '查询',
            id: 'sm-safetyfine-search',
            handler: 'searchSafetyFine',
        }, '->', {
            text: '刷新',
            id: 'sm-safetyfine-refresh',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        text: '编辑',
        id: 'sm-safetyfine-editinfo',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showSafetyFineEdit',
        editor: {
            xtype: 'label',
        }
    }, {
        header: '工号',
        dataIndex: 'safetyFine.projNo',
    }, {
        header: '船名',
        dataIndex: 'safetyFine.projName',
    }, {
        header: '日期',
        dataIndex: 'safetyFine.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '类型',
        dataIndex: 'safetyFine.type',
    }, {
        header: '部门',
        dataIndex: 'safetyFine.dept',
    }, {
        header: '施工队',
        dataIndex: 'safetyFine.team',
    }, {
        header: '班组',
        dataIndex: 'safetyFine.group',
    }, {
        header: '人员卡号',
        dataIndex: 'safetyFine.personAcc',
        hidden: true
    }, {
        header: '人员',
        dataIndex: 'safetyFine.personName',
    }, {
        header: '描述',
        dataIndex: 'safetyFine.description',
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
        header: '位置',
        dataIndex: 'safetyFine.position',
    }, {
        header: '地点',
        dataIndex: 'safetyFine.place',
    }, {
        header: '金额',
        align: 'right',
        dataIndex: 'safetyFine.amount',
    }, {
        header: '整改措施',
        dataIndex: 'safetyFine.measure',
    }, {
        header: '整改期限',
        dataIndex: 'safetyFine.deadline',
    }, {
        header: '整改情况',
        dataIndex: 'safetyFine.feedback',
    }, {
        header: '作业长',
        dataIndex: 'safetyFine.manager',
    }, {
        header: '班组长',
        dataIndex: 'safetyFine.groupLeader',
    }, {
        header: '事业部',
        dataIndex: 'safetyFine.mgrDept',
    }, {
        header: '隐患类型',
        dataIndex: 'safetyFine.dangerType',
    }, {
        header: '伤害类型',
        dataIndex: 'safetyFine.damageType',
    }, {
        header: '风险等级',
        dataIndex: 'safetyFine.riskLevel',
    }, {
        header: '检查类型',
        dataIndex: 'safetyFine.inspectType',
    }, {
        header: '备注',
        dataIndex: 'safetyFine.comment',
    }, {
        header: '签发人',
        dataIndex: 'safetyFine.issuer',
    }, {
        header: '登记人',
        dataIndex: 'safetyFine.creator',
        hidden: true
    }, {
        header: '登记日期',
        dataIndex: 'safetyFine.createTime',
        hidden: true
    }, {
        text: '删除',
        id: 'sm-safetyfine-delete',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSafetyFine',
        editor: {
            xtype: 'label',
        }
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: smSafetyFineStore,
        displayInfo: true,
    }

});