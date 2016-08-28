Ext.define('iFlat.view.ss.FiveSEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.ss-fivesedit',
    title: '5S管理',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.ss.FiveSController'
    ],

    id: 'ss-fivesedit',
    controller: 'ss-fives',
    closeAction: 'hide',
    width: 800,
    //scrollable: true,

    items: {
        xtype: 'form',
        id: 'ss-fivesedit-form',
        margin: 5,
        border: false,
        layout: 'vbox',
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
                xtype: 'textfield',
                name: 'fiveS.id',
                fieldLabel: 'id',
                hidden: true
            }]
        },{
            items: [{
                xtype: 'datefield',
                name: 'fiveS.date',
                allowBlank: false,
                width: 200,
                fieldLabel: '日期',
                format: 'Y-m-d'
            },{
                xtype: 'timefield',
                name: 'fiveS.time',
                allowBlank: true,
                increment: 30,
                fieldLabel: '时间',
                format: 'H:i',
                width: 300,
            },{
                xtype: 'combo',
                name: 'fiveS.funcDept',
                queryMode: 'local',
                allowBlank: false,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : false,
                anyMatch: true,
                width: 200,
                fieldLabel: '职能部门',
                bind: {
                    store: '{ssFiveSFuncDept}',
                },
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'fiveS.areaType',
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                width: 200,
                fieldLabel: '区域类型',
                bind: {
                    store: '{fsAreaType}',
                },
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        ssFiveSFsAreaStore.getProxy().extraParams['fsArea.type'] = newV;
                        ssFiveSFsAreaStore.reload();
                    }
                }
            },{
                xtype: 'combo',
                name: 'fiveS.belongDept',
                store: ssFiveSFsAreaDeptStore = Ext.create('iFlat.store.ss.FsAreaDept'),
                queryMode: 'local',
                allowBlank: false,
                editable: false,
                forceSelection : false,
                displayField: 'dept',
                valueField: 'dept',
                width: 200,
                fieldLabel: '所属部门',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        cb.nextSibling('combo').reset();
                        cb.up('form').down('textfield[name=fiveS.code]').setValue('')
                        ssFiveSFsAreaStore.getProxy().extraParams['fsArea.dept'] = newV;
                        ssFiveSFsAreaStore.reload();
                    }
                }
            },{
                xtype: 'combo',
                name: 'fiveS.area',
                store: ssFiveSFsAreaStore = Ext.create('iFlat.store.ss.FsArea', {
                    autoLoad: false,
                }),
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : false,
                anyMatch: true,
                displayField: 'area',
                valueField: 'area',
                width: 300,
                fieldLabel: '区域',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        if (!Flat.util.isEmpty(newV)) {
                            var r = cb.getStore().findRecord('area', newV)
                            if (r) {
                                var v1 = r.get('dept');
                                cb.up('form').down('combo[name=fiveS.belongDept]').setValue(v1);
                                var v2 = r.get('code');
                                cb.up('form').down('textfield[name=fiveS.code]').setValue(v2);
                            }
                        }
                    }
                }
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.code',
                fieldLabel: '区域代码',
                width: 200,
                editable: false
            }, {
                xtype: 'textfield',
                name: 'fiveS.otherArea',
                fieldLabel: '其他区域',
                width: 500,
            }]
        },{
            items: [{
                xtype: 'combo',
                name: 'fiveS.projNo',
                store: Ext.create('iFlat.store.report.bi.Project', {
                    proxy: {
                        extraParams: {
                            'rptProject.status': 0
                        }
                    }
                }),
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                typeAhead: true,
                minChars: 0,
                forceSelection : true,
                anyMatch: true,
                displayField: 'name',
                valueField: 'projNo',
                width: 400,
                fieldLabel: '工程名',
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        if (!Flat.util.isEmpty(newV)) {
                            var v = cb.getStore().findRecord('rptProject.projNo', newV).get('name');
                            if (v) {
                                cb.up('form').down('textfield[name=fiveS.projName]').setValue(v);
                            }
                        }
                    }
                }
            },{
                xtype: 'textfield',
                name: 'fiveS.projName',
                fieldLabel: '船名',
                hidden: true
            },{
                xtype: 'textfield',
                name: 'fiveS.region',
                fieldLabel: '违规部位',
                width: 300,
            },]
        },/*{
            items: [{
                xtype: 'combo',
                name: 'fiveS.regionPersonName',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                minChars: 0,
                displayField: 'name',
                valueField: 'name',
                width: 400,
                fieldLabel: '区域负责人',
                store: ssFiveSEmployeeStore = Ext.create('iFlat.store.code.Employee'),
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        var v = cb.getStore().findRecord('employee.name', newV).get('employee.account');
                        cb.up('form').down('textfield[name=fiveS.regionPersonAcc]').setValue(v);
                    },
                }
            },{
                xtype: 'textfield',
                name: 'fiveS.regionPersonAcc',
                fieldLabel: '账号',
                width: 300,
                editable: false
            }]
        },*/{
            items: [{
                xtype: 'combo',
                name: 'fiveS.fsType',
                queryMode: 'local',
                allowBlank: true,
                editable: false,
                forceSelection : true,
                width: 200,
                fieldLabel: '违规项目',
                bind: {
                    store: '{ssFsCodeType}'
                },
                listeners: {
                    change: function (cb, newV, oldV, opt) {
                        ssFiveSFsCodeStore.getProxy().extraParams['fsCode.type'] = newV;
                        ssFiveSFsCodeStore.reload();
                    },
                }
            },{
                xtype: 'combo',
                name: 'fiveS.fsDescription',
                queryMode: 'local',
                allowBlank: true,
                editable: true,
                forceSelection : true,
                typeAhead: true,
                minChars: 0,
                displayField: 'description',
                valueField: 'description',
                width: 500,
                fieldLabel: '违规内容',
                store: ssFiveSFsCodeStore = Ext.create('iFlat.store.ss.FsCode', {
                    autoLoad: false
                }),
                listeners: {
                    select: function (combo, record) {
                        var score = record.get('fsCode.score');
                        var amount = record.get('fsCode.amount');
                        var form = combo.up('form');
                        form.down('textfield[name=fiveS.score]').setValue(score);
                        form.down('textfield[name=fiveS.amount]').setValue(amount);
                    }
                }
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.score',
                width: 200,
                fieldLabel: '扣分',
            },{
                xtype: 'textfield',
                name: 'fiveS.amount',
                width: 200,
                fieldLabel: '罚款',
            },{
                xtype: 'textfield',
                name: 'fiveS.issuer',
                width: 200,
                fieldLabel: '查处人',
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            id: 'ss-fivesedit-att',
            margin: '20 0 0 65',
            hidden: true,
            items: [{
                xtype: 'button',
                id: 'ss-fivesedit-link',
                text: '下载附件',
                margin: '0 5 0 0',
                width: 100,
            }, {
                xtype: 'button',
                ui: 'gray',
                text: '删除',
                handler: 'deleteAttachment'
            }]
        },{
            xtype: 'textfield',
            id: 'ss-fivesedit-attachment',
            name: 'fiveS.attachment',
            fieldLabel: 'attachment',
            hidden: true,
            listeners: [{
                change: 'onAttachmentChange'
            }]
        },{
            xtype: 'container',
            layout: 'hbox',
            margin: '20 0 10 0',
            items: [{
                xtype: 'form',
                id: 'ss-fivesedit-upload',
                items: [{
                    xtype: 'fileuploadfield',
                    fieldLabel: '违规照片',
                    name: 'upload',
                    buttonText: '选择...',
                    width: 300,
                    margin: '0 10 0 0',
                }]
            }, {
                xtype: 'button',
                text: '上传',
                ui: 'orig-blue',
                handler: 'uploadAttachment'
            }]
        }]
    },
    buttons: [
        '->', {
            text: '保存',
            handler: 'saveFiveSEdit',
        },
        
    ],
});