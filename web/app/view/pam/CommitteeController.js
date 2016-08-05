Ext.define('iFlat.view.pam.CommitteeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-committee',

    showCommitteeEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-committeeedit');
        if(!win) {
            win = Ext.create('iFlat.view.pam.CommitteeEdit');
        }
        var pbName = pamCommitteeStore.getProxy().extraParams['committee.pbName'];
        if(!record) {
            record = Ext.create('iFlat.model.pam.Committee', {
                'committee.pbName' : pbName
            });
        }
        var form = win.down('form[id=pam-committeeedit-form]');
        form.loadRecord(record);
        if (record.get('id')) {
            pamCommitteeDetailStore.getProxy().extraParams['committeeDetail.pid'] = record.get('id');
            pamCommitteeDetailStore.reload();
        }
        win.show();
    },

    deleteCommittee: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'pam_deleteCommitteeSummary.action',
                    params: record.data,
                    success: function (response, opts) {
                        pamCommitteeStore.reload();
                        Flat.util.tip(response.responseText);
                    },
                })
            };
        })
    },

    addDetail: function() {
        pamCommitteeDetailRowEditing.cancelEdit();
        var committee = Ext.create('iFlat.model.pam.CommitteeDetail', {
            'committeeDetail.pid': Ext.getCmp('pam-committeeedit-id').getValue(),
        });
        pamCommitteeDetailStore.insert(0, committee);
        pamCommitteeDetailRowEditing.startEdit(0, 0);
    },

    deleteDetail: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('committeeDetail.id');
        if(id == undefined || id == '') {
            pamCommitteeDetailStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'pam_deleteCommitteeDetail.action',
                        params: {
                            'committeeDetail.id': record.get('committeeDetail.id')
                        },
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                pamCommitteeDetailStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["committeeDetail.id"];
        if(id == "") {
            pamCommitteeDetailStore.remove(context.record);
        }
    },

    updateDetail: function(editor, context, eOpts) {
        var date = Ext.getCmp('pam-committeeedit-time').getValue();
        if (Flat.util.isEmpty(date)) {
            Ext.Msg.show({
                title:'提示',
                message: '请先选择改选日期。',
            });
        } else {
            var form = Ext.getCmp('pam-committeeedit-form');
            if (form.isValid()) {
                form.submit({
                    url: 'pam_saveCommitteeDetail.action',
                    method: 'POST',
                    params: context.record.getData(),
                    success: function (fp, o) {
                        var pid = (Ext.JSON.decode(o.response.responseText))['object']['pid'];
                        Ext.getCmp('pam-committeeedit-id').setValue(pid);
                        Flat.util.tip(o.response.responseText);
                        pamCommitteeDetailStore.reload();
                    },
                    failure: function (fp, o) {
                        Flat.util.tip(o.response.responseText);
                        pamCommitteeDetailStore.reload();
                    }
                })
            }
        }

    },
    editClose: function () {
        pamCommitteeStore.reload();
    },

    refreshList: function () {
        pamCommitteeStore.reload();
    },

    refreshDetail: function () {
        pamCommitteeDetailStore.reload();
    }
})