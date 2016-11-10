Ext.define('iFlat.view.ss.PotentialHazard', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.ss-potentialhazard',
    xtype: 'ss-potentialhazard',
    
    controller: 'ss-potentialhazard',
    store: ssPotentialHazardStore = Ext.create('iFlat.store.ss.PotentialHazard', {
        proxy: {
            extraParams: {
                'potentialHazard.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
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
            handler: 'showPotentialHazardEdit',
        }, {
            xtype: 'form',
            items: [{
                xtype: 'fileuploadfield',
                name: 'upload',
                buttonText: '选择...',
                width: 140,
                margin: '0 0 0 0',
            }, ]
        }, {
            xtype: 'button',
            text: '导入',
            ui: 'orig-blue',
            handler: 'uploadFile'
        }, '->', {
            text: '下载模板',
            handler: 'downloadTemplate'
        }, {
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
        handler: 'showPotentialHazardEdit',
        editor: {
            xtype: 'label',
        },
    }, {
        header: '日期',
        dataIndex: 'potentialHazard.date',
        formatter: 'date("Y-m-d")'
    }, {
        header: '时间',
        dataIndex: 'potentialHazard.time',
    }, {
        header: '部门',
        dataIndex: 'potentialHazard.dept',
    }, {
        header: '施工队',
        dataIndex: 'potentialHazard.team',
    }, {
        header: '班组',
        dataIndex: 'potentialHazard.groupName',
    }, {
        header: '责任人一卡通',
        dataIndex: 'potentialHazard.personAcc',
    }, {
        header: '责任人',
        dataIndex: 'potentialHazard.personName',
    }, {
        header: '岗位',
        dataIndex: 'potentialHazard.title',
    }, {
        header: '年龄',
        dataIndex: 'potentialHazard.age',
    }, {
        header: '工龄',
        dataIndex: 'potentialHazard.seniority',
    }, {
        header: '性别',
        dataIndex: 'potentialHazard.sex',
    }, {
        header: '工号',
        dataIndex: 'potentialHazard.projNo',
    }, {
        header: '工程名',
        dataIndex: 'potentialHazard.projName',
    }, {
        header: '区域',
        dataIndex: 'potentialHazard.area',
    }, {
        header: '位置',
        dataIndex: 'potentialHazard.position',
    }, {
        header: '负面发现',
        dataIndex: 'potentialHazard.description',
    }, {
        header: '隐患类型',
        dataIndex: 'potentialHazard.phType',
    }, {
        header: '隐患代码',
        dataIndex: 'potentialHazard.phCode',
    }, {
        header: '隐患内容',
        dataIndex: 'potentialHazard.content',
    }, {
        header: '隐患明细',
        dataIndex: 'potentialHazard.detail',
    }, {
        header: '风险等级',
        dataIndex: 'potentialHazard.riskLvl',
    }, {
        header: '伤害类型',
        dataIndex: 'potentialHazard.dmgType',
    }, {
        header: '整改措施',
        dataIndex: 'potentialHazard.measure',
    }, {
        header: '整改期限',
        dataIndex: 'potentialHazard.deadline',
    }, {
        header: '整改情况',
        dataIndex: 'potentialHazard.feedback',
    }, {
        header: '扣款',
        dataIndex: 'potentialHazard.amount',
    }, {
        header: '扣分',
        dataIndex: 'potentialHazard.score',
    }, {
        header: '事业部',
        dataIndex: 'potentialHazard.busiDivision',
    }, {
        header: '总管',
        dataIndex: 'potentialHazard.projMgr',
    }, {
        header: '主管',
        dataIndex: 'potentialHazard.profMgr',
    }, {
        header: '作业长',
        dataIndex: 'potentialHazard.workMgr',
    }, {
        header: '班组长',
        dataIndex: 'potentialHazard.teamLeader',
    }, {
        header: '档长',
        dataIndex: 'potentialHazard.posiMgr',
    }, {
        text: '违规照片',
        dataIndex: 'potentialHazard.attachment',
        width: 60,
        renderer: function(v) {
            if(!v || v == '') {
                return '';
            } else {
                return "<a target='_blank' href='" + v + "'>下载</a>";
            }
        },
    }, {
        text: '整改后照片',
        dataIndex: 'potentialHazard.rectifyAtt',
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
        dataIndex: 'potentialHazard.comment',
    }, {
        header: '查处人',
        dataIndex: 'potentialHazard.issuer',
    }, {
        header: '创建人',
        dataIndex: 'potentialHazard.creatorName',
        hidden: true
    }, {
        header: '创建部门',
        dataIndex: 'potentialHazard.creatorDept',
        hidden: true
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deletePotentialHazard',
        editor: {
            xtype: 'label',
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: ssPotentialHazardStore,
        displayInfo: true,
    }

});