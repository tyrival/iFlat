Ext.define('iFlat.view.pam.MemberFull', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-memberfull',
    xtype: 'pam-memberfull',

    requires: [
        'iFlat.view.pam.MemberFullController'
    ],

    controller: 'pam-memberfull',
    store: pamMemberFullStore = Ext.create('iFlat.store.pam.Member', {
        proxy: {
            extraParams: {
                'pamMember.type': '正式',
            }
        },
    }),

    listeners: {
        render: function (grid, op) {
            Ext.Ajax.request({
                url: 'pam_listRecorderByUser.action',
                success: function (response, opts) {
                    var data = Ext.JSON.decode(response.responseText);
                    var info = data['list'];
                    var pbName;
                    if (!Flat.util.isEmpty(info) && info.length > 0) {
                        pbName = info[0]['pbName'];
                        pamMemberFullStore.getProxy().extraParams['pamMember.pbName'] = pbName;
                        pamMemberFullStore.reload();
                    } else {
                        Ext.getCmp('pam-memberfull-add').hide();
                        Ext.Msg.show({
                            title:'提示',
                            message: '您没有维护任何党支部信息的权限，请联系党群。',
                        });
                    }
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                }
            })
        }
    },

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            id: 'pam-memberfull-add',
            handler: 'showMemberEdit',
        }, '->', {
            text: '刷新',
            id: 'pam-memberfull-refresh',
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
        handler: 'showMemberEdit',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('pamMember.source') == '0';
        },
    }, {
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
        dataIndex: 'pamMember.becomeFullMemberFull',
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
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteMember',
        editor: {
            xtype: 'label',
        },
        isDisabled: function(view, rowIdx, colIdx, item, record) {
            return record.get('pamMember.source') == '0';
        },
    }],
    bbar: {
        xtype: 'pagingtoolbar',
        pageIndex: 5,
        store: pamMemberFullStore,
        displayInfo: true,
    }

});