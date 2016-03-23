Ext.define('iFlat.view.ss.SafetyFineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-safetyfine',

    deleteSafetyFine: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['safetyFine.id'];
        if(id == undefined || id == '') {
            ssSafetyFineStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteSafetyFine.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssSafetyFineStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('ss-safetyfine-tbar-projname').setValue('');
        Ext.getCmp('ss-safetyfine-tbar-team').setValue('');
        Ext.getCmp('ss-safetyfine-tbar-personname').setValue('');
        Ext.getCmp('ss-safetyfine-tbar-description').setValue('');
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.projName'] = null;
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.team'] = null;
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.personName'] = null;
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.description'] = null;
        ssSafetyFineStore.reload();
    },

    showSafetyFineEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-safetyfineedit');
        if(!win) {
            win = Ext.create('iFlat.view.ss.SafetyFineEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.ss.SafetyFine');
        }
        win.down('form').loadRecord(record);
        var dept = record.get('dept');
        var team = record.get('team');
        var group = record.get('group');
        ssSafetyFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
        ssSafetyFineTeamStore.reload({
            callback: function() {
                Ext.getCmp('ss-safetyfineedit-team').setValue(team);
            }
        });
        ssSafetyFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
        ssSafetyFineGroupStore.getProxy().extraParams['group.teamName'] = team;
        ssSafetyFineGroupStore.reload({
            callback: function() {
                Ext.getCmp('ss-safetyfineedit-group').setValue(group);
            }
        });
        ssSafetyFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
        ssSafetyFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
        ssSafetyFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
        ssSafetyFineWorkerStore.reload({
            callback: function() {
                Ext.getCmp('ss-safetyfineedit-person').setValue(record.get('personName'));
            }
        });
        win.show();
    },

    submitSafetyFineEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'ss_saveSafetyFine.action',
            success: function(form, action) {
                win.hide();
                ssSafetyFineStore.reload();
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });

    },

    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('ss-safetyfineedit-dept');
        var cbTeam = Ext.getCmp('ss-safetyfineedit-team');
        var cbGroup = Ext.getCmp('ss-safetyfineedit-group');
        var cbPerson = Ext.getCmp('ss-safetyfineedit-person');
        var txPerson = Ext.getCmp('ss-safetyfineedit-personacc');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'ss-safetyfineedit-dept':
                ssSafetyFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
                ssSafetyFineTeamStore.reload();
                ssSafetyFineGroupStore.removeAll();
                ssSafetyFineWorkerStore.removeAll();
                cbGroup.reset();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'ss-safetyfineedit-team':
                ssSafetyFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
                ssSafetyFineGroupStore.getProxy().extraParams['group.teamName'] = team;
                ssSafetyFineGroupStore.reload();
                ssSafetyFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                ssSafetyFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                ssSafetyFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                ssSafetyFineWorkerStore.reload();
                break;
            case 'ss-safetyfineedit-group':
                ssSafetyFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                ssSafetyFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                ssSafetyFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                ssSafetyFineWorkerStore.reload();
                txPerson.setValue('');
                break;

        }
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('ss-safetyfineedit-group').setValue(model.get('groupName'));
            Ext.getCmp('ss-safetyfineedit-personacc').setValue(model.get('account'));
        }
    },

    searchSafetyFine: function(btn) {
        var projName = Ext.getCmp('ss-safetyfine-tbar-projname').getValue();
        var team = Ext.getCmp('ss-safetyfine-tbar-team').getValue();
        var personName = Ext.getCmp('ss-safetyfine-tbar-personname').getValue();
        var description = Ext.getCmp('ss-safetyfine-tbar-description').getValue();
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.projName'] = projName;
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.team'] = team;
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.personName'] = personName;
        ssSafetyFineStore.getProxy().extraParams['safetyFineVo.description'] = description;
        ssSafetyFineStore.reload();
    },


    uploadAttachment: function(btn) {
        var form = Ext.getCmp('ss-safetyfineedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadSafetyFine.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-safetyfineedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-safetyfineedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-safetyfineedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-safetyfineedit-att').show();
            Ext.getCmp('ss-safetyfineedit-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-safetyfineedit-att').hide();
            Ext.getCmp('ss-safetyfineedit-link').setHref('');
        }
    }
})