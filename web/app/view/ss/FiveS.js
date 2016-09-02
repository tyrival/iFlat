Ext.define('iFlat.view.ss.FiveS', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-fives',
    xtype: 'ss-fives',
    
    controller: 'ss-fives',
    store: ssFiveSStore = Ext.create('iFlat.store.ss.FiveS', {
        proxy: {
            extraParams: {
                'fiveS.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        }
    }),
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'showFiveSEdit',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        text: '编辑',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '编辑',
        align: 'center',
        iconCls: 'x-fa fa-edit',
        handler: 'showFiveSEdit',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'fiveS.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'fiveS.time',
    }, {
        header: '职能部门',
        dataIndex: 'fiveS.funcDept',
    }, {
        header: '区域类型',
        dataIndex: 'fiveS.areaType',
    }, {
        header: '区域代码',
        dataIndex: 'fiveS.code',
    }, {
        header: '区域',
        dataIndex: 'fiveS.area',
    }, {
        header: '其他区域',
        dataIndex: 'fiveS.otherArea',
    }, {
        header: '项目名称',
        dataIndex: 'fiveS.projName',
    }, {
        header: '违规部位',
        dataIndex: 'fiveS.region',
    }, {
        header: '所属部门',
        dataIndex: 'fiveS.belongDept',
    }, {
        header: '区域/项目负责人',
        dataIndex: 'fiveS.regionPersonName',
    }, {
        header: '区域/项目负责人一卡通',
        dataIndex: 'fiveS.regionPersonAcc',
    }, {
        header: '违规项目',
        dataIndex: 'fiveS.fsType',
    }, {
        header: '违规内容',
        dataIndex: 'fiveS.fsDescription',
    }, {
        header: '描述',
        dataIndex: 'fiveS.description',
    }, {
        text: '违规照片',
        dataIndex: 'fiveS.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '扣分',
        dataIndex: 'fiveS.score',
    }, {
        header: '罚款',
        dataIndex: 'fiveS.amount',
    }, {
        header: '责任部门',
        dataIndex: 'fiveS.dept',
    }, {
        header: '施工队/班组',
        dataIndex: 'fiveS.team',
    }, {
        header: '责任人',
        dataIndex: 'fiveS.personName',
    }, {
        header: '责任人一卡通',
        dataIndex: 'fiveS.personAcc',
    }, {
        header: '整改情况',
        dataIndex: 'fiveS.feedback',
    }, {
        header: '整改时间',
        dataIndex: 'fiveS.rectifyTime',
        formatter: 'date("Y-m-d")'
    }, {
        header: '整改照片',
        dataIndex: 'fiveS.rectifyAtt',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        header: '备注',
        dataIndex: 'fiveS.comment',
    }, {
        header: '查处人',
        dataIndex: 'fiveS.issuer',
    }, {
        header: '创建人',
        dataIndex: 'fiveS.creatorName',
        hidden: true
    }, {
        header: '创建部门',
        dataIndex: 'fiveS.creatorDept',
        hidden: true
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteFiveS',
        editor: {
            xtype: 'label',
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: ssFiveSStore,
        displayInfo: true,
    }

});