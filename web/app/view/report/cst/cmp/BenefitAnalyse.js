Ext.define('iFlat.view.report.cst.cmp.BenefitAnalyse', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.rpt-cst-cmp-Benefitanalyse',
    xtype: 'rpt-cst-cmp-Benefitanalyse',

    requires: [
        'iFlat.view.report.cst.cmp.BenefitAnalyseController',
        'Ext.grid.plugin.Exporter'
    ],

    plugins: [{
        ptype: 'gridexporter'
    }],
    features: [{
        ftype: 'groupingsummary',
        hideGroupedHeader: true
    }],

    controller: 'rpt-cst-cmp-benefitanalyse',
    store: rptCstCmpBenefitAnalyseStore = Ext.create('iFlat.store.xr.Benefit', {
        autoLoad: false,
        groupField: 'benefit.dept',
    }),
    columnLines: true,
    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            xtype: 'datefield',
            id: 'rpt-cst-cmp-benefitanalyse-from',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '起始时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            xtype: 'datefield',
            id: 'rpt-cst-cmp-benefitanalyse-to',
            allowBlank: true,
            editable: false,
            forceSelection : true,
            width: 200,
            fieldLabel: '截止时间',
            labelAlign: 'right',
            labelWidth: 60,
            format: 'Y-m-d'
        }, {
            text: '查询',
            ui: 'orig-blue',
            handler: 'search'
        }, '->', {
            text: '导出',
            handler: 'exportToExcel'
        }, {
            text: '刷新',
            handler: 'refresh'
        }],
    }],

    columns: [{
        header: '月份',
        dataIndex: 'benefit.month',
        formatter: 'date("Y-m")',
        width: 120,
        hidden: true,
    }, {
        header: '部门',
        dataIndex: 'benefit.dept',
        width: 120,
        locked: true,
    }, {
        header: '工程队id',
        dataIndex: 'benefit.teamCode',
        width: 120,
        locked: true,
        hidden: true,
    }, {
        header: '工程队',
        dataIndex: 'benefit.team',
        width: 120,
        locked: true,
    }, {
        header: '总人工',
        dataIndex: 'benefit.workday',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
        align: 'right',
    }, {
        header: '总工时',
        dataIndex: 'benefit.manhour',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
        align: 'right',
    }, {
        header: '注册人数',
        dataIndex: 'benefit.personNum',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
        align: 'right',
    }, {
        header: '到岗人次',
        dataIndex: 'benefit.workPersonTime',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '等工人次',
        dataIndex: 'benefit.waitPersonTime',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '临时借进人次',
        dataIndex: 'benefit.casualInPersonTime',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '临时借出人次',
        dataIndex: 'benefit.casualOutPersonTime',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '应发工资发放人数',
        dataIndex: 'benefit.salaryPersonNum',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '在厂平均人数',
        dataIndex: 'benefit.averagePersonNum',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '工费',
        dataIndex: 'benefit.laborExpense',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '季度单船绩效奖',
        dataIndex: 'benefit.quarterProjectBonus',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '等工补贴',
        dataIndex: 'benefit.waitSubsidy',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '春节加班补贴',
        dataIndex: 'benefit.springFestivalSubsidy',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '春节稳定金',
        dataIndex: 'benefit.springFestivalStable',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '餐费补贴',
        dataIndex: 'benefit.dinnerSubsidy',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '高温补贴',
        dataIndex: 'benefit.temperatureSubsidy',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '小计',
        dataIndex: 'benefit.incomeSum',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '劳务工应发工资',
        align: 'right',
        dataIndex: 'benefit.payableSalary',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '房水电',
        dataIndex: 'benefit.rent',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '餐费自付',
        dataIndex: 'benefit.dinnerSelf',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '保险费',
        dataIndex: 'benefit.insurance',
        align: 'right',
        width: 120,
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '仓库领用材料费',
        dataIndex: 'benefit.material',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '税金',
        dataIndex: 'benefit.taxes',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '小计',
        dataIndex: 'benefit.expenseSum',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '利润',
        dataIndex: 'benefit.profits',
        width: 120,
        align: 'right',
        summaryType: 'sum',
        renderer: 'renderer',
        summaryRenderer: 'renderer',
    }, {
        header: '劳务工应发工资占工费比例',
        dataIndex: 'benefit.salaryPercent',
        align: 'right',
        width: 120,
        renderer: function(v) {
            return Flat.util.financeFormat(v, 2) + '%';
        },
        summaryRenderer: function(value, summaryData, dataIndex,object) {
            var r = object.record;
            var payableSalary = r.get('benefit.payableSalary');
            var laborExpense = r.get('benefit.laborExpense');
            var quarterProjectBonus = r.get('benefit.quarterProjectBonus');
            var salaryPercent = 0;
            if ((laborExpense + quarterProjectBonus) != 0) {
                salaryPercent = payableSalary * 100 / (laborExpense + quarterProjectBonus);
            }
            return Flat.util.financeFormat(salaryPercent, 2) + '%';
        }
    }, {
        header: '人均产值（工费）',
        dataIndex: 'benefit.productionPer',
        align: 'right',
        width: 120,
        renderer: 'renderer',
        summaryRenderer: function(value, summaryData, dataIndex,object) {
            var r = object.record;
            var quarterProjectBonus = r.get('benefit.quarterProjectBonus');
            var laborExpense = r.get('benefit.laborExpense');
            var workPersonTime = r.get('benefit.workPersonTime');
            var v = 0;
            if (workPersonTime != 0) {
                v = (laborExpense + quarterProjectBonus) / workPersonTime;
            }
            return Flat.util.financeFormat(v, 2);
        }
    }, {
        header: '人均工资（满负荷）',
        dataIndex: 'benefit.salaryPerFull',
        align: 'right',
        width: 120,
        renderer: 'renderer',
        summaryRenderer: function(value, summaryData, dataIndex,object) {
            var r = object.record;
            var payableSalary = r.get('benefit.payableSalary');
            var workPersonTime = r.get('benefit.workPersonTime');
            var salaryPerFull = 0;
            if (workPersonTime != 0) {
                salaryPerFull = payableSalary / workPersonTime;
            }
            return Flat.util.financeFormat(salaryPerFull, 2);
        }
    }, {
        header: '人均工资（在厂人员）',
        dataIndex: 'benefit.salaryPerAct',
        align: 'right',
        width: 120,
        renderer: 'renderer',
        summaryRenderer: function(value, summaryData, dataIndex,object) {
            var r = object.record;
            var payableSalary = r.get('benefit.payableSalary');
            var averagePersonNum = r.get('benefit.averagePersonNum');
            var salaryPerAct = 0;
            if (averagePersonNum != 0) {
                salaryPerAct = payableSalary / averagePersonNum;
            }
            return Flat.util.financeFormat(salaryPerAct, 2);
        }
    }, {
        header: '备注',
        dataIndex: 'benefit.comment',
        width: 120,
    },]
});