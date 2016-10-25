Ext.define('iFlat.view.report.ss.FiveSInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.rpt-ss-fivesinfo',
    title: '5S信息',
    layout: 'fit',
    modal: true,

    controller: 'rpt-ss-fives',
    id: 'ss-fivesinfo',
    closeAction: 'hide',
    height: '95%',
    width: '95%',
    //scrollable: true,

    items: {
        xtype: 'form',
        id: 'ss-fivesinfo-form',
        margin: 5,
        border: false,
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        scrollable: true,
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
                width: '33%',
                fieldLabel: '日期',
                format: 'Y-m-d'
            },{
                xtype: 'textfield',
                name: 'fiveS.time',
                fieldLabel: '时间',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'fiveS.funcDept',
                fieldLabel: '职能部门',
                width: '33%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.areaType',
                fieldLabel: '区域类型',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'fiveS.belongDept',
                fieldLabel: '所属部门',
                width: '33%',
            },{
                xtype: 'textfield',
                name: 'fiveS.area',
                fieldLabel: '区域',
                width: '33%',
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.code',
                fieldLabel: '区域代码',
                width: '33%',
                editable: false
            }, {
                xtype: 'textfield',
                name: 'fiveS.otherArea',
                fieldLabel: '其他区域',
                width: '66%',
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.projName',
                fieldLabel: '船名',
                width: '66%',
            },{
                xtype: 'textfield',
                name: 'fiveS.region',
                fieldLabel: '违规部位',
                width: '33%',
            },]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.fsType',
                width: '33%',
                fieldLabel: '违规项目',
            },{
                xtype: 'textfield',
                name: 'fiveS.fsDescription',
                width: '66%',
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
                name: 'fiveS.score',
                width: '33%',
                fieldLabel: '扣分',
            },{
                xtype: 'textfield',
                name: 'fiveS.amount',
                width: '33%',
                fieldLabel: '罚款',
            },{
                xtype: 'textfield',
                name: 'fiveS.issuer',
                width: '33%',
                fieldLabel: '查处人',
                id: 'rpt-ss-fivesinfo-issuer',
                hidden: true,
            }]
        },{
            items: [{
                xtype: 'textfield',
                name: 'fiveS.regionPersonName',
                fieldLabel: '区域负责人',
                width: '33%',
                editable: false
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
                xtype: 'textfield',
                name: 'fiveS.dept',
                fieldLabel: '责任部门',
                width: '33%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'fiveS.personName',
                fieldLabel: '责任人',
                width: '33%',
                editable: false
            },{
                xtype: 'textfield',
                name: 'fiveS.personAcc',
                fieldLabel: '工号',
                width: '33%',
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
                xtype: 'textfield',
                name: 'fiveS.feedback',
                fieldLabel: '整改情况',
                width: '33%',
                editable: false
            },{
                xtype: 'datefield',
                name: 'fiveS.rectifyTime',
                width: '33%',
                fieldLabel: '整改日期',
                format: 'Y-m-d'
            }]
        },{
            items: [{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-fivesinfo-att',
                margin: '10 0 0 65',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-fivesinfo-link',
                    text: '下载违规照片',
                    margin: '0 5 0 0',
                    width: 100,
                }, {
                    xtype: 'button',
                    ui: 'gray',
                    text: '删除',
                    handler: 'deleteAttachment'
                }]
            },{
                xtype: 'container',
                layout: 'hbox',
                id: 'ss-fivesinfo-att2',
                margin: '10 0 0 65',
                width: '50%',
                hidden: true,
                items: [{
                    xtype: 'button',
                    id: 'ss-fivesinfo-link2',
                    text: '下载整改照片',
                    margin: '0 5 0 0',
                    width: 100,
                }]
            },{
                xtype: 'textfield',
                id: 'ss-fivesinfo-attachment2',
                name: 'fiveS.rectifyAtt',
                fieldLabel: 'attachment',
                hidden: true,
                listeners: [{
                    change: 'onAttachmentChange2'
                }]
            }]
        }]
    },
});