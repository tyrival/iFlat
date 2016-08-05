Ext.define('iFlat.view.pam.CommitteeEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-committeeedit',
    title: '党委会',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'pam-committeeedit',
    controller: 'pam-committee',
    closeAction: 'hide',
    items: [{
        xtype: 'container',
        padding: '15 15 0 15',
        scrollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'pam-committeeedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 80,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    name: 'committee.electionTime',
                    allowBlank: false,
                    fieldLabel: '改选日期',
                    format: 'Y-m-d',
                    id: 'pam-committeeedit-time',
                    width: 240,
                }, {
                    xtype: 'textfield',
                    name: 'committee.id',
                    fieldLabel: 'ID',
                    id: 'pam-committeeedit-id',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'committee.pbName',
                    fieldLabel: '党支部',
                    hidden: true
                }]
            }]
        }, {
            xtype: 'panel',
            minHeight: 300,
            flex: 1,
            border: false,
            margin: '30 0 5 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'gridpanel',
                width: '100%',
                scrollable: true,
                store: pamCommitteeDetailStore = Ext.create('iFlat.store.pam.CommitteeDetail'),
                border: true,
                columnLines: true,
                plugins: [
                    pamCommitteeDetailRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
                        pluginId: 'pam-committeeedit-detail-edit',
                        clicksToMoveEditor: 1,
                        autoCancel: true,
                        listeners: {
                            edit: 'updateDetail',
                            cancelEdit: 'deleteEmptyRecord',
                        }
                    })
                ],
                tbar: [{
                    xtype: 'button',
                    text: '新增',
                    ui: 'orig-blue',
                    id: 'pam-committeeedit-detail-add',
                    handler: 'addDetail'
                },{
                    xtype: 'button',
                    text: '刷新',
                    handler: 'refreshDetail'
                }],

                columns: [{
                    text: '删除',
                    width: 50,
                    menuDisabled: true,
                    xtype: 'actioncolumn',
                    align: 'center',
                    iconCls: 'x-fa fa-close',
                    id: 'pam-committeeedit-detail-delete',
                    handler: 'deleteDetail',
                    editor: {
                        xtype: 'label'
                    }
                }, {
                    header: '职务',
                    width: 120,
                    dataIndex: 'committeeDetail.title',
                    editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: pamCommitteeDetailComboStore = Ext.create('iFlat.store.pam.Title'),
                        queryMode: 'local',
                        editable: true,
                        anyMatch: true,
                        forceSelection : true,
                        valueField : 'name',
                        displayField : 'name',
                    }
                }, {
                    header: '姓名',
                    width: 120,
                    dataIndex: 'committeeDetail.name',
                    editor: {
                        allowBlank: false
                    }
                }, {
                    header: '性别',
                    width: 80,
                    dataIndex: 'committeeDetail.sex',
                    editor: {
                        allowBlank: false
                    }
                }, {
                    header: '文化程度',
                    width: 120,
                    dataIndex: 'committeeDetail.degree',
                    editor: {
                        allowBlank: false
                    }
                }, {
                    header: '出生年月',
                    width: 120,
                    dataIndex: 'committeeDetail.birth',
                    formatter: 'date("Y-m")',
                    editor: {
                        xtype: 'datefield',
                        allowBlank: false,
                        format: 'Y-m',
                    }
                }, {
                    header: '行政职务',
                    width: 120,
                    dataIndex: 'committeeDetail.adminTitle',
                    editor: {
                        allowBlank: false
                    }
                }, {
                    header: '联系电话',
                    flex: 1,
                    dataIndex: 'committeeDetail.tel',
                    editor: {
                        allowBlank: false
                    }
                }, ],
            }]
        }],
    }],

    listeners: {
        close: 'editClose'
    }

});