Ext.define('iFlat.view.ss.ViolateRegulation', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-violateregulation',
    xtype: 'ss-violateregulation',
    
    controller: 'ss-violateregulation',
    store: ssViolateRegulationStore = Ext.create('iFlat.store.ss.ViolateRegulation', {
        proxy: {
            extraParams: {
                'violateRegulation.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
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
            handler: 'showViolateRegulationEdit',
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
        handler: 'showViolateRegulationEdit',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'violateRegulation.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'violateRegulation.time',
    }, {
        header: '部门',
        dataIndex: 'violateRegulation.dept',
    }, {
        header: '施工队',
        dataIndex: 'violateRegulation.team',
    }, {
        header: '班组',
        dataIndex: 'violateRegulation.groupName',
    }, {
        header: '责任人一卡通',
        dataIndex: 'violateRegulation.personAcc',
    }, {
        header: '责任人',
        dataIndex: 'violateRegulation.personName',
    }, {
        header: '岗位',
        dataIndex: 'violateRegulation.title',
    }, {
        header: '年龄',
        dataIndex: 'violateRegulation.age',
    }, {
        header: '工龄',
        dataIndex: 'violateRegulation.seniority',
    }, {
        header: '性别',
        dataIndex: 'violateRegulation.sex',
    }, {
        header: '工号',
        dataIndex: 'violateRegulation.projNo',
    }, {
        header: '工程名',
        dataIndex: 'violateRegulation.projName',
    }, {
        header: '区域',
        dataIndex: 'violateRegulation.area',
    }, {
        header: '位置',
        dataIndex: 'violateRegulation.position',
    }, {
        header: '负面发现',
        dataIndex: 'violateRegulation.description',
    }, {
        header: '整改措施',
        dataIndex: 'violateRegulation.measure',
    }, {
        header: '整改情况',
        dataIndex: 'violateRegulation.feedback',
    }, {
        header: '扣款',
        dataIndex: 'violateRegulation.amount',
    }, {
        header: '扣分',
        dataIndex: 'violateRegulation.score',
    }, {
        header: '事业部',
        dataIndex: 'violateRegulation.busiDivision',
    }, {
        header: '总管',
        dataIndex: 'violateRegulation.projMgr',
    }, {
        header: '主管',
        dataIndex: 'violateRegulation.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'violateRegulation.workMgr',
    }, {
        header: '班组长',
        dataIndex: 'violateRegulation.teamLeader',
    }, {
        header: '档长',
        dataIndex: 'violateRegulation.posiMgr',
    }, {
        header: '培训',
        dataIndex: 'violateRegulation.training',
    }, {
        header: '培训效果',
        dataIndex: 'violateRegulation.trainingEff',
    }, {
        text: '附件',
        dataIndex: 'violateRegulation.attachment',
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
        dataIndex: 'violateRegulation.comment',
    }, {
        header: '创建人',
        dataIndex: 'violateRegulation.creatorName',
        hidden: true
    }, {
        header: '创建部门',
        dataIndex: 'violateRegulation.creatorDept',
        hidden: true
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteViolateRegulation',
        editor: {
            xtype: 'label',
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: ssViolateRegulationStore,
        displayInfo: true,
    }

});