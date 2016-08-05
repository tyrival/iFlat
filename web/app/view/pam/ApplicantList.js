Ext.define('iFlat.view.pam.ApplicantList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-applicantlist',
    xtype: 'pam-applicantlist',

    store: Ext.create('iFlat.store.pam.Applicant', {
        autoLoad: true
    }),

    columns: [{
        header: '姓名',
        dataIndex: 'applicant.name',
        flex: 1,
    }, {
        header: '性别',
        dataIndex: 'applicant.sex',
        flex: 1,
    }, {
        header: '工作部门',
        dataIndex: 'applicant.dept',
        flex: 1,
    }, {
        header: '出生年月',
        dataIndex: 'applicant.birth',
        formatter: 'date("Y-m")',
        flex: 1,
    }, {
        header: '申请时间',
        dataIndex: 'applicant.applyTime',
        formatter: 'date("Y-m-d")',
        flex: 1,
    }, {
        header: '是否团员',
        dataIndex: 'applicant.isComsomol',
        formatter: 'date("Y-m-d")',
        flex: 1,
    }],
});