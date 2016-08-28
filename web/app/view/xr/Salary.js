Ext.define('iFlat.view.xr.Salary', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-salary',
    xtype: 'xr-salary',

    requires: [
        'iFlat.view.xr.SalaryController',
    ],

    controller: 'xr-salary',
    store: salaryStore = Ext.create('iFlat.store.xr.Salary'),
    id: 'xr-salary',

    plugins: [
        salaryRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'xr-salary-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateSalaryRecord',
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
            id: 'xr-salary-add',
            ui: 'orig-blue',
            handler: 'addSalaryRecord',
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
            id: 'xr-salary-refresh',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '月份',
        dataIndex: 'salary.month',
        formatter: 'date("Y-m")',
        width: 120,
        editor: {
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: '工程队id',
        dataIndex: 'salary.teamCode',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '工程队',
        dataIndex: 'salary.team',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '工号',
        dataIndex: 'salary.idCardNo',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '姓名',
        dataIndex: 'salary.name',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '银行',
        dataIndex: 'salary.bank',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '银行账号',
        dataIndex: 'salary.account',
        width: 120,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '出勤天数',
        dataIndex: 'salary.workday',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '计工工时',
        dataIndex: 'salary.workHour',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '等工工时',
        dataIndex: 'salary.waitHour',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '加班工时',
        dataIndex: 'salary.overtimeHour',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '工价-小时',
        dataIndex: 'salary.hourPrice',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '工价-天',
        dataIndex: 'salary.dayPrice',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '日标准工时',
        dataIndex: 'salary.hourOfDay',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '等工补助',
        dataIndex: 'salary.waitSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '包月工资',
        dataIndex: 'salary.monthPrice',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '预付工资',
        dataIndex: 'salary.prepay',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '考勤扣款',
        dataIndex: 'salary.deductionOfCheck',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '加班工资',
        dataIndex: 'salary.overtimeAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '其他补贴',
        dataIndex: 'salary.otherSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '春节补贴',
        dataIndex: 'salary.springFestivalSubsidy',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '奖金',
        dataIndex: 'salary.bonusAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '应付工资',
        dataIndex: 'salary.payableAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '缓发工资',
        dataIndex: 'salary.retentionAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '补发工资',
        dataIndex: 'salary.supplementaryAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '扣伙食费',
        dataIndex: 'salary.dinnerAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '扣借款',
        dataIndex: 'salary.loanAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '罚款',
        dataIndex: 'salary.fineAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '其他扣款',
        dataIndex: 'salary.otherDeductAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '其他费用',
        dataIndex: 'salary.otherFee',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '实发工资',
        dataIndex: 'salary.actualAmount',
        width: 120,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '备注',
        dataIndex: 'salary.comment',
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
        handler: 'deleteSalary',
        editor: {
            xtype: 'label',
        }
    }],
});