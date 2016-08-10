Ext.define('iFlat.view.ss.Accident', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-accident',
    xtype: 'ss-accident',
    
    controller: 'ss-accident',
    store: ssAccidentStore = Ext.create('iFlat.store.ss.Accident', {
        proxy: {
            extraParams: {
                'accident.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
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
            handler: 'showAccidentEdit',
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
        handler: 'showAccidentEdit',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'accident.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'accident.time',
    }, {
        header: '工号',
        dataIndex: 'accident.projNo',
    }, {
        header: '项目名',
        dataIndex: 'accident.projName',
    }, {
        header: '区域',
        dataIndex: 'accident.area',
    }, {
        header: '位置',
        dataIndex: 'accident.position',
    }, {
        header: '事故等级',
        dataIndex: 'accident.accLvl',
    }, {
        header: '事故类型',
        dataIndex: 'accident.accType',
    }, {
        header: '直接经济损失',
        dataIndex: 'accident.loss',
    }, {
        header: '事业部',
        dataIndex: 'accident.busiDivision',
    }, {
        header: '总管',
        dataIndex: 'accident.projMgr',
    }, {
        header: '主管',
        dataIndex: 'accident.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'accident.workMgr',
    }, {
        header: '班组长',
        dataIndex: 'accident.teamLeader',
    }, {
        header: '档长',
        dataIndex: 'accident.posiMgr',
    }, {
        text: '事故报告',
        dataIndex: 'accident.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        text: '事故照片',
        dataIndex: 'accident.rectifyAtt',
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
        dataIndex: 'accident.comment',
    }, {
        header: '创建人',
        dataIndex: 'accident.creatorName',
        hidden: true
    }, {
        header: '创建部门',
        dataIndex: 'accident.creatorDept',
        hidden: true
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteAccident',
        editor: {
            xtype: 'label',
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: ssAccidentStore,
        displayInfo: true,
    }

});