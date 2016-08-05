Ext.define('iFlat.view.pam.MemberEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-memberedit',
    title: '党员信息',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.pam.MemberEditController'
    ],

    id: 'pam-memberedit',
    controller: 'pam-memberedit',
    closeAction: 'hide',

    //height: '95%',
    width: '95%',

    items: {
        xtype: 'form',
        id: 'pam-memberedit-form',
        margin: 5,
        border: false,
        layout: 'vbox',
        scrollable: 'y',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 60,
        },
        defaults: {
            border: false,
            xtype: 'panel',
            layout: 'hbox',
            margin: '5 10 5 0'
        },
        items: [{
            items: [{
                xtype: 'textfield',
                name: 'pamMember.source',
                fieldLabel: 'source',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'pamMember.type',
                fieldLabel: 'type',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'pamMember.id',
                fieldLabel: 'ID',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'pamMember.pbName',
                fieldLabel: 'pbName',
                hidden: true,
            }, {
                xtype: 'textfield',
                name: 'pamMember.name',
                fieldLabel: '姓名',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.account',
                fieldLabel: '一卡通',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.sex',
                fieldLabel: '性别',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.dept',
                fieldLabel: '部门',
                flex: 1
            }]
        }, {
            items: [{
                xtype: 'datefield',
                name: 'pamMember.birth',
                fieldLabel: '出生年月',
                format: 'Y-m-d',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.nation',
                fieldLabel: '民族',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.birthplace',
                fieldLabel: '籍贯',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'pamMember.joinParty',
                fieldLabel: '入党时间',
                format: 'Y-m-d',
                flex: 1
            }, ]
        }, {
            items: [{
                xtype: 'datefield',
                name: 'pamMember.becomeFullMember',
                fieldLabel: '转正时间',
                format: 'Y-m-d',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'pamMember.startWorking',
                fieldLabel: '工作时间',
                format: 'Y-m-d',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.idCardNo',
                fieldLabel: '身份证号',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.adminTitle',
                fieldLabel: '技术职务',
                flex: 1
            }]
        }, {
            items: [{
                xtype: 'textfield',
                name: 'pamMember.diploma',
                fieldLabel: '学历',
                flex: 1
            }, {
                xtype: 'textfield',
                name: 'pamMember.degree',
                fieldLabel: '学位',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'pamMember.enrolment',
                fieldLabel: '入学时间',
                format: 'Y-m-d',
                flex: 1
            }, {
                xtype: 'datefield',
                name: 'pamMember.graduation',
                fieldLabel: '毕业时间',
                format: 'Y-m-d',
                flex: 1
            }]
        }]
    },
    buttons: [
        '->', {
            text: '保存',
            handler: 'saveMemberEdit',
        },

    ],
});