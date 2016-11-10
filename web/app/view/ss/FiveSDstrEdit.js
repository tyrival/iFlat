Ext.define('iFlat.view.ss.FiveSDstrEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-fivesdstredit',
    title: '5S责任分解',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.ss.FiveSDstrController'
    ],

    id: 'ss-fivesdstredit',
    controller: 'ss-fivesdstr',
    closeAction: 'hide',
    height: '95%',
    width: '95%',

    items: [{
        xtype: 'container',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        scrollable: true,
        items: [{
            xtype: 'form',
            id: 'ss-fivesdstredit-form',
            margin: 5,
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 60,
            },
            items: [{
                xtype: 'fieldset',
                title: '结算单',
                defaults: {
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '0 0 10 0'
                },
                items: [{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.id',
                        fieldLabel: 'id',
                        hidden: true,
                        /*listeners: {
                            change: function(tf, newV, oldV) {
                                tf.up('window').down('form[id=ss-fivesdstredit-form2]').down('textfield[name=fiveS.id]').setValue(newV);
                            }
                        }*/
                    }]
                },{
                    items: [{
                        xtype: 'datefield',
                        name: 'fiveS.date',
                        editable: false,
                        hidden: true,
                        format: 'Y-m-d',
                        listeners: {
                            change: function(tf, newV, oldV) {
                                tf.nextSibling('textfield').setValue(Ext.Date.format(tf.getValue(), 'Y-m-d'));
                            }
                        }
                    },{
                        xtype: 'textfield',
                        width: '33%',
                        editable: false,
                        fieldLabel: '日期',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.time',
                        width: '33%',
                        editable: false,
                        fieldLabel: '时间',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.funcDept',
                        width: '33%',
                        editable: false,
                        fieldLabel: '职能部门',
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.areaType',
                        width: '33%',
                        editable: false,
                        fieldLabel: '区域类型',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.area',
                        width: '33%',
                        editable: false,
                        fieldLabel: '区域',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.code',
                        width: '33%',
                        editable: false,
                        fieldLabel: '区域代码',
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.belongDept',
                        width: '33%',
                        editable: false,
                        fieldLabel: '所属部门',
                        listeners: {
                            change: function(cb, newV, oldV, opts) {
                                ssFiveSDstrRegionPersonNameStore.getProxy().extraParams['employee.deptName'] = newV;
                                ssFiveSDstrRegionPersonNameStore.reload();
                            }
                        }
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.otherArea',
                        width: '66%',
                        editable: false,
                        fieldLabel: '其他区域',
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.projNo',
                        width: '20%',
                        editable: false,
                        fieldLabel: '工程名',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.projName',
                        width: '48%',
                        editable: false,
                        fieldLabel: '船名',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.region',
                        width: '30%',
                        editable: false,
                        fieldLabel: '违规部位',
                    }]
                },/*{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.regionPersonName',
                        width: '33%',
                        editable: false,
                        fieldLabel: '区域负责人',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.regionPersonAcc',
                        width: '33%',
                        editable: false,
                        fieldLabel: '账号',
                    }]
                },*/{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.fsType',
                        width: '33%',
                        editable: false,
                        fieldLabel: '违规项目',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.fsDescription',
                        width: '66%',
                        editable: false,
                        fieldLabel: '违规内容',
                    }]
                },{
                    items: [{
                        xtype: 'textarea',
                        name: 'fiveS.description',
                        fieldLabel: '描述',
                        width: '99%',
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.comment',
                        fieldLabel: '备注',
                        width: '99%',
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.score',
                        width: '33%',
                        editable: false,
                        fieldLabel: '扣分',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.amount',
                        width: '33%',
                        editable: false,
                        fieldLabel: '罚款',
                    }]
                },{
                    items: [{
                        xtype: 'textfield',
                        name: 'fiveS.creatorName',
                        width: '33%',
                        editable: false,
                        fieldLabel: '登记人',
                    },{
                        xtype: 'textfield',
                        name: 'fiveS.creatorDept',
                        width: '33%',
                        editable: false,
                        fieldLabel: '登记部门',
                    }]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    id: 'ss-fivesdstredit-att',
                    margin: '20 0 0 65',
                    hidden: true,
                    items: [{
                        xtype: 'button',
                        id: 'ss-fivesdstredit-link',
                        text: '下载违规照片',
                        margin: '0 5 0 0',
                        width: 100,
                    }]
                },{
                    xtype: 'textfield',
                    id: 'ss-fivesdstredit-attachment',
                    name: 'fiveS.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange'
                    }]
                },]
            },]
        }, {
            xtype: 'form',
            id: 'ss-fivesdstredit-form2',
            margin: 5,
            border: false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            //scrollable: true,
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 60,
            },
            defaults: {
                border: false,
                xtype: 'panel',
                layout: 'hbox',
                margin: '5 0 15 0'
            },
            items: [{
                items: [{
                    xtype: 'combo',
                    name: 'fiveS.regionPersonName',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: true,
                    forceSelection : true,
                    typeAhead: true,
                    anyMatch: true,
                    minChars: 0,
                    displayField: 'fullName',
                    valueField: 'name',
                    width: '33%',
                    fieldLabel: '区域负责人',
                    store: ssFiveSDstrRegionPersonNameStore = Ext.create('iFlat.store.code.Employee'),
                    listeners: {
                        select: function (cb, record, opt) {
                            var v = record.get('employee.account');
                            cb.up('form').down('textfield[name=fiveS.regionPersonAcc]').setValue(v);
                        },
                    }
                },{
                    xtype: 'textfield',
                    name: 'fiveS.regionPersonAcc',
                    fieldLabel: '账号',
                    width: '33%',
                    editable: false,
                    hidden: true,
                }]
            },{
                items: [{
                    xtype: 'combo',
                    name: 'fiveS.dept',
                    bind: {
                        store: '{ssFiveSFuncDept}'
                    },
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : false,
                    width: '33%',
                    fieldLabel: '责任部门',
                    listeners: {
                        change: function(cb, newV, oldV, opts) {
                            ssFiveSDstrEmployeeStore.getProxy().extraParams['employee.deptName'] = newV;
                            ssFiveSDstrEmployeeStore.reload();
                        }
                    }
                },{
                    xtype: 'combo',
                    name: 'fiveS.personName',
                    queryMode: 'local',
                    allowBlank: true,
                    editable: true,
                    forceSelection : true,
                    typeAhead: true,
                    anyMatch: true,
                    minChars: 0,
                    displayField: 'fullName',
                    valueField: 'name',
                    width: '66%',
                    fieldLabel: '责任人',
                    store: ssFiveSDstrEmployeeStore = Ext.create('iFlat.store.code.Employee', {
                        autoLoad: true
                    }),
                    listeners: {
                        select: function (cb, record, opt) {
                            var team = record.get('employee.teamName');
                            cb.up('window').down('textfield[name=fiveS.team]').setValue(team);
                            var groupName = record.get('employee.groupName');
                            cb.up('window').down('textfield[name=fiveS.groupName]').setValue(groupName);
                            var account = record.get('employee.account');
                            cb.up('window').down('textfield[name=fiveS.personAcc]').setValue(account);
                            // 年龄，工龄，性别

                        },
                    }
                },{
                    xtype: 'textfield',
                    name: 'fiveS.personAcc',
                    fieldLabel: '工号',
                    width: '33%',
                    hidden: true,
                    editable: false
                },]
            }, {
                items: [{
                    xtype: 'textfield',
                    name: 'fiveS.team',
                    fieldLabel: '施工队',
                    width: '66%',
                    editable: false
                },{
                    xtype: 'textfield',
                    name: 'fiveS.groupName',
                    fieldLabel: '班组',
                    width: '33%',
                    editable: false
                }]
            }, {
                items: [{
                    xtype: 'combo',
                    name: 'fiveS.feedback',
                    queryMode: 'local',
                    editable: false,
                    forceSelection : false,
                    width: '25%',
                    fieldLabel: '整改情况',
                    bind: {
                        store: '{ssPhFeedback}',
                    },
                },{
                    xtype: 'datefield',
                    name: 'fiveS.rectifyTime',
                    width: '33%',
                    fieldLabel: '整改日期',
                    format: 'Y-m-d'
                },{
                    xtype: 'textfield',
                    name: 'fiveS.id',
                    fieldLabel: 'id',
                    editable: false,
                    hidden: true
                }]
            }, {
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    id: 'ss-fivesdstredit-att2',
                    margin: '10 0 0 65',
                    hidden: true,
                    items: [{
                        xtype: 'button',
                        id: 'ss-fivesdstredit-link2',
                        text: '下载整改照片',
                        margin: '0 5 0 0',
                        width: 100,
                    }, {
                        xtype: 'button',
                        ui: 'gray',
                        text: '删除',
                        handler: 'deleteAttachment2'
                    }]
                },{
                    xtype: 'textfield',
                    id: 'ss-fivesdstredit-attachment2',
                    name: 'fiveS.rectifyAtt',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        change: 'onAttachmentChange2'
                    }]
                }]
            }, {
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    margin: '10 0 10 0',
                    items: [{
                        xtype: 'form',
                        id: 'ss-fivesdstredit-upload2',
                        items: [{
                            xtype: 'fileuploadfield',
                            fieldLabel: '整改照片',
                            name: 'upload',
                            buttonText: '选择...',
                            width: 300,
                            margin: '0 10 0 0',
                        }]
                    }, {
                        xtype: 'button',
                        text: '上传',
                        ui: 'orig-blue',
                        handler: 'uploadAttachment2'
                    }]
                }]
            }]
        }]
    }],
    buttons: [
        '->', {
            text: '保存',
            handler: 'saveFiveSEdit',
        },

    ],
});