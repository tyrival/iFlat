Ext.define('iFlat.view.pam.Applicant', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.pam-applicant',
    xtype: 'pam-applicant',

    requires: [
        'iFlat.view.pam.ApplicantController',
    ],

    controller: 'pam-applicant',
    store: pamApplicantStore = Ext.create('iFlat.store.pam.Applicant'),
    id: 'pam-applicant',

    plugins: [
        pamApplicantRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'pam-applicant-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateApplicantRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],
    
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
                        pamApplicantStore.getProxy().extraParams['applicant.pbName'] = pbName;
                        pamApplicantStore.reload();
                    } else {
                        Ext.getCmp('pam-applicant-add').hide();
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
            id: 'pam-activist-add',
            handler: 'addApplicantRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '姓名',
        dataIndex: 'applicant.name',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '性别',
        dataIndex: 'applicant.sex',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '工作部门',
        dataIndex: 'applicant.dept',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '出生年月',
        dataIndex: 'applicant.birth',
        formatter: 'date("Y-m")',
        flex: 1,
        editor: {
            allowBlank: false,
            xtype: 'datefield',
            format: 'Y-m'
        }
    }, {
        header: '申请时间',
        dataIndex: 'applicant.applyTime',
        formatter: 'date("Y-m-d")',
        flex: 1,
        editor: {
            allowBlank: false,
            xtype: 'datefield',
            format: 'Y-m-d'
        }
    }, {
        header: '是否团员',
        dataIndex: 'applicant.isComsomol',
        flex: 1,
        editor: {
            xtype: 'combo',
            queryMode: 'local',
            allowBlank: false,
            editable: false,
            forceSelection : true,
            bind: {
                store: '{yesNo}',
            },
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteApplicant',
        editor: {
            xtype: 'label',
        }
    }],
});