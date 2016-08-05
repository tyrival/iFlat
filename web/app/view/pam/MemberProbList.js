Ext.define('iFlat.view.pam.MemberProbList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-memberproblist',
    xtype: 'pam-memberproblist',

    store: Ext.create('iFlat.store.pam.MemberList', {
        proxy: {
            extraParams: {
                'pamMember.type': '预备',
            }
        },
    }),

    columns: [{
        header: '姓名',
        dataIndex: 'pamMember.name',
        width: 120
    }, {
        header: '一卡通',
        dataIndex: 'pamMember.account',
        width: 120
    }, {
        header: '部门',
        dataIndex: 'pamMember.dept',
        width: 120
    }, {
        header: '性别',
        dataIndex: 'pamMember.sex',
        width: 120
    }, {
        header: '出生年月',
        dataIndex: 'pamMember.birth',
        formatter: 'date("Y-m")',
        width: 120
    }, {
        header: '民族',
        dataIndex: 'pamMember.nation',
        width: 120
    }, {
        header: '籍贯',
        dataIndex: 'pamMember.birthplace',
        width: 120
    }, {
        header: '入党时间',
        dataIndex: 'pamMember.joinParty',
        formatter: 'date("Y-m-d")',
        width: 120
    }, {
        header: '转正时间',
        dataIndex: 'pamMember.becomeProbMember',
        formatter: 'date("Y-m-d")',
        width: 120
    }, {
        header: '工作时间',
        dataIndex: 'pamMember.startWorking',
        formatter: 'date("Y-m-d")',
        width: 120
    }, {
        header: '身份证号',
        dataIndex: 'pamMember.idCardNo',
        width: 120
    }, {
        header: '学历',
        dataIndex: 'pamMember.diploma',
        width: 120
    },  {
        header: '学位',
        dataIndex: 'pamMember.degree',
        width: 120
    },  {
        header: '入学时间',
        dataIndex: 'pamMember.enrolment',
        formatter: 'date("Y-m-d")',
        width: 120
    },  {
        header: '毕业时间',
        dataIndex: 'pamMember.graduation',
        formatter: 'date("Y-m-d")',
        width: 120
    },  {
        header: '技术职务',
        dataIndex: 'pamMember.adminTitle',
        width: 120
    }],
});