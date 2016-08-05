Ext.define('iFlat.view.pam.MemberDist', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-memberdist',
    xtype: 'pam-memberdist',

    requires: [
        'iFlat.view.pam.MemberDistController'
    ],

    controller: 'pam-memberdist',
    store: pamMemberDistStore = Ext.create('iFlat.store.pam.MemberDist'),

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: ['->', {
            text: '刷新',
            id: 'pam-memberdist-refresh',
            handler: 'refreshList',
        }],
    }],
    columns: [{
        header: '党支部',
        dataIndex: 'memberDist.pbName',
        flex: 1
    }, {
        header: '正式党员',
        dataIndex: 'memberDist.memberFull',
        flex: 1
    }, {
        header: '预备党员',
        dataIndex: 'memberDist.memberProb',
        flex: 1
    }, {
        header: '申请入党人员',
        dataIndex: 'memberDist.applicant',
        flex: 1
    }, {
        header: '入党积极分子',
        dataIndex: 'memberDist.activist',
        flex: 1
    }],

    listeners: {
        cellclick: 'cellclick'
    }
});