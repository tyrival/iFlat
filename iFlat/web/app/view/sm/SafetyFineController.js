Ext.define('iFlat.view.sm.SafetyFineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-safetyfine',

    deleteSafetyFine: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['safetyFine.id'];
        if(id == undefined || id == '') {
            smSafetyFineStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteSafetyFine.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smSafetyFineStore.remove(record);
                            }
                            tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('sm-safetyfine-tbar-projname').setValue('');
        Ext.getCmp('sm-safetyfine-tbar-team').setValue('');
        Ext.getCmp('sm-safetyfine-tbar-personname').setValue('');
        Ext.getCmp('sm-safetyfine-tbar-description').setValue('');
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.projName'] = null;
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.team'] = null;
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.personName'] = null;
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.description'] = null;
        smSafetyFineStore.reload();
    },

    showSafetyFineEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('sm-safetyfineedit');
        if(!win) {
            win = Ext.create('iFlat.view.sm.SafetyFineEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.sm.SafetyFine');
        }
        win.down('form').loadRecord(record);
        var dept = record.get('dept');
        var team = record.get('team');
        var group = record.get('group');
        smSafetyFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
        smSafetyFineTeamStore.reload({
            callback: function() {
                Ext.getCmp('sm-safetyfineedit-team').setValue(team);
            }
        });
        smSafetyFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
        smSafetyFineGroupStore.getProxy().extraParams['group.teamName'] = team;
        smSafetyFineGroupStore.reload({
            callback: function() {
                Ext.getCmp('sm-safetyfineedit-group').setValue(group);
            }
        });
        smSafetyFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
        smSafetyFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
        smSafetyFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
        smSafetyFineWorkerStore.reload({
            callback: function() {
                Ext.getCmp('sm-safetyfineedit-person').setValue(record.get('personName'));
            }
        });
        win.show();
    },

    submitSafetyFineEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'sm_saveSafetyFine.action',
            success: function(form, action) {
                win.hide();
                smSafetyFineStore.reload();
                tip(action.response.responseText);
            },
            failure: function(form, action) {
                tip(action.response.responseText);
            }
        });

    },

    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('sm-safetyfineedit-dept');
        var cbTeam = Ext.getCmp('sm-safetyfineedit-team');
        var cbGroup = Ext.getCmp('sm-safetyfineedit-group');
        var cbPerson = Ext.getCmp('sm-safetyfineedit-person');
        var txPerson = Ext.getCmp('sm-safetyfineedit-personacc');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'sm-safetyfineedit-dept':
                smSafetyFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
                smSafetyFineTeamStore.reload();
                smSafetyFineGroupStore.removeAll();
                smSafetyFineWorkerStore.removeAll();
                cbGroup.reset();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'sm-safetyfineedit-team':
                smSafetyFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
                smSafetyFineGroupStore.getProxy().extraParams['group.teamName'] = team;
                smSafetyFineGroupStore.reload();
                smSafetyFineWorkerStore.removeAll();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'sm-safetyfineedit-group':
                smSafetyFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                smSafetyFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                smSafetyFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                smSafetyFineWorkerStore.reload();
                txPerson.setValue('');
                break;

        }
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('sm-safetyfineedit-personacc').setValue(model.get('account'));
        }
    },

    searchSafetyFine: function(btn) {
        var projName = Ext.getCmp('sm-safetyfine-tbar-projname').getValue();
        var team = Ext.getCmp('sm-safetyfine-tbar-team').getValue();
        var personName = Ext.getCmp('sm-safetyfine-tbar-personname').getValue();
        var description = Ext.getCmp('sm-safetyfine-tbar-description').getValue();
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.projName'] = projName;
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.team'] = team;
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.personName'] = personName;
        smSafetyFineStore.getProxy().extraParams['safetyFineVo.description'] = description;
        smSafetyFineStore.reload();
    },


    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-safetyfineedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadSafetyFine.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-safetyfineedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除附件吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-safetyfineedit-attachment').getValue(),
                    success: function (response, opts) {
                        tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-safetyfineedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('sm-safetyfineedit-att').show();
            Ext.getCmp('sm-safetyfineedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-safetyfineedit-att').hide();
            Ext.getCmp('sm-safetyfineedit-link').setHref('');
        }
    }
})