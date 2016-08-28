Ext.define('iFlat.view.xr.Benefit', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-benefit',
    xtype: 'xr-benefit',

    requires: [
        'iFlat.view.xr.BenefitController',
    ],

    controller: 'xr-benefit',
    store: benefitStore = Ext.create('iFlat.store.xr.Benefit'),
    id: 'xr-benefit',

    plugins: [
        benefitRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'xr-benefit-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateBenefitRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            id: 'xr-benefit-add',
            ui: 'orig-blue',
            handler: 'addBenefitRecord',
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
        },  {
            text: '刷新',
            id: 'xr-benefit-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '月份',
        dataIndex: 'benefit.month',
        formatter: 'date("Y-m")',
        width: 120,
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: '部门',
        dataIndex: 'benefit.dept',
        width: 120,
        editor: {
            xtype: 'combo',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            bind: {
                store: '{xrWorkshop}'
            },
        }
    }, {
        header: '工程队id',
        dataIndex: 'benefit.teamCode',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '工程队',
        dataIndex: 'benefit.team',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '总人工',
        dataIndex: 'benefit.workday',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '总工时',
        dataIndex: 'benefit.manhour',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '注册人数',
        dataIndex: 'benefit.personNum',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '到岗人次',
        dataIndex: 'benefit.workPersonTime',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '等工人次',
        dataIndex: 'benefit.waitPersonTime',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '临时借进人次',
        dataIndex: 'benefit.casualInPersonTime',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '临时借出人次',
        dataIndex: 'benefit.casualOutPersonTime',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '应发工资发放人数',
        dataIndex: 'benefit.salaryPersonNum',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '在厂平均人数',
        dataIndex: 'benefit.averagePersonNum',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '季度单船绩效奖',
        dataIndex: 'benefit.quarterProjectBonus',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '等工补贴',
        dataIndex: 'benefit.waitSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '春节加班补贴',
        dataIndex: 'benefit.springFestivalSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '春节稳定金',
        dataIndex: 'benefit.springFestivalStable',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '餐费补贴',
        dataIndex: 'benefit.dinnerSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '高温补贴',
        dataIndex: 'benefit.temperatureSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '房水电',
        dataIndex: 'benefit.rent',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '餐费自付',
        dataIndex: 'benefit.dinnerSelf',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '保险费',
        dataIndex: 'benefit.insurance',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '仓库领用材料费',
        dataIndex: 'benefit.material',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '备注',
        dataIndex: 'benefit.comment',
        width: 120,
        editor: {
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteBenefit',
        editor: {
            xtype: 'label',
        }
    }],
});