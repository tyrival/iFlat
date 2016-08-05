Ext.define('iFlat.view.pam.ActivistList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-activistlist',
    xtype: 'pam-activistlist',

    store: Ext.create('iFlat.store.pam.Activist', {
        autoLoad: true
    }),

    columns: [{
        header: '姓名',
        dataIndex: 'activist.name',
        flex: 1,
    }, {
        header: '性别',
        dataIndex: 'activist.sex',
        flex: 1,
    }, {
        header: '工作部门',
        dataIndex: 'activist.dept',
        flex: 1,
    }, {
        header: '出生年月',
        dataIndex: 'activist.birth',
        formatter: 'date("Y-m")',
        flex: 1,
    }, {
        header: '申请时间',
        dataIndex: 'activist.applyTime',
        formatter: 'date("Y-m-d")',
        flex: 1,
    }, {
        header: '列为积极分子时间',
        dataIndex: 'activist.becomeActivist',
        formatter: 'date("Y-m-d")',
        flex: 1,
    }],
});