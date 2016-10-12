Ext.define('iFlat.view.pam.General', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.pam-general',
    modal: true,

    requires: [
        'iFlat.view.pam.GeneralController'
    ],

    controller: 'pam-general',

    listeners: {
        render: function(panel, op) {
            Ext.Ajax.request({
                url: 'pam_loadGeneralByUser.action',
                success: function (response, opts) {
                    var data = Ext.JSON.decode(response.responseText);
                    var pb = data['object'];
                    var info = data['list'];
                    var form = Ext.getCmp('pam-general-form');
                    if (!Flat.util.isEmpty(pb)) {
                        form.down('textfield[name=pamGeneral.pbName]').setValue(pb['pbName']);
                    } else {
                        Ext.Msg.show({
                            title:'提示',
                            message: '您没有维护任何党支部信息的权限，请联系党群。',
                        });
                    }
                    if (!Flat.util.isEmpty(info[0])) {
                        form.down('textfield[name=pamGeneral.deptMemberNum]').setValue(info[0]['deptMemberNum']);
                        form.down('textfield[name=pamGeneral.partyMemberNum]').setValue(info[0]['partyMemberNum']);
                        form.down('textfield[name=pamGeneral.partyGroupNum]').setValue(info[0]['partyGroupNum']);
                        form.down('textfield[name=pamGeneral.malePartyMember]').setValue(info[0]['malePartyMember']);
                        form.down('textfield[name=pamGeneral.femalePartyMember]').setValue(info[0]['femalePartyMember']);
                        form.down('textfield[name=pamGeneral.groupWithoutParty]').setValue(info[0]['groupWithoutParty']);
                        form.down('textfield[name=pamGeneral.comsomol]').setValue(info[0]['comsomol']);
                        form.down('textfield[name=pamGeneral.contact]').setValue(info[0]['contact']);
                        form.down('textfield[name=pamGeneral.phoneNum]').setValue(info[0]['phoneNum']);
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
            text: '保存',
            ui: 'orig-blue',
            handler: 'save'
        }],
    }],

    items: {
        xtype: 'form',
        id: 'pam-general-form',
        margin: 5,
        border: false,
        layout: 'vbox',
        scrollable: 'y',
        fieldDefaults: {
            labelAlign: 'right',
            labelWidth: 80,
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
                name: 'pamGeneral.pbName',
                fieldLabel: '党支部',
                editable: false,
                width: 600
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'pamGeneral.deptMemberNum',
                allowBlank: false,
                fieldLabel: '部门人数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 300
            }, {
                xtype: 'textfield',
                name: 'pamGeneral.partyMemberNum',
                allowBlank: true,
                fieldLabel: '党员人数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 300
            }, ]
        },{
            items: [{
                xtype: 'textfield',
                name: 'pamGeneral.partyGroupNum',
                allowBlank: false,
                fieldLabel: '党小组数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 300
            }, {
                xtype: 'textfield',
                name: 'pamGeneral.malePartyMember',
                allowBlank: false,
                fieldLabel: '男党员数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 150
            }, {
                xtype: 'textfield',
                name: 'pamGeneral.femalePartyMember',
                allowBlank: false,
                fieldLabel: '女党员数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 150
            }, ]
        },{
            items: [{
                xtype: 'textfield',
                name: 'pamGeneral.groupWithoutParty',
                allowBlank: false,
                fieldLabel: '无党员班组（科室）数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 300
            }, {
                xtype: 'textfield',
                name: 'pamGeneral.comsomol',
                allowBlank: false,
                fieldLabel: '团员数',
                regex: /^[+-]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
                width: 300
            }, ]
        },{
            items: [{
                xtype: 'textfield',
                name: 'pamGeneral.contact',
                allowBlank: false,
                fieldLabel: '联络人',
                width: 300
            }, {
                xtype: 'textfield',
                name: 'pamGeneral.phoneNum',
                allowBlank: false,
                fieldLabel: '联系方式',
                width: 300
            }, ]
        },]
    },
});