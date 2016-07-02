Ext.define('iFlat.view.sm.FineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-fine',

    deleteFine: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['safetyFine.id'];
        if(id == undefined || id == '') {
            smFineStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteFine.action',
                        params: record.data,
                        succesm: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.succesm) {
                                smFineStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('sm-fine-tbar-projname').setValue('');
        Ext.getCmp('sm-fine-tbar-team').setValue('');
        Ext.getCmp('sm-fine-tbar-personname').setValue('');
        Ext.getCmp('sm-fine-tbar-description').setValue('');
        smFineStore.getProxy().extraParams['fine.projName'] = null;
        smFineStore.getProxy().extraParams['fine.team'] = null;
        smFineStore.getProxy().extraParams['fine.personName'] = null;
        smFineStore.getProxy().extraParams['fine.description'] = null;
        smFineStore.reload();
    },

    showFineEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('sm-fineedit');
        if(!win) {
            win = Ext.create('iFlat.view.sm.FineEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.sm.Fine');
        }
        win.down('form').loadRecord(record);
        var dept = record.get('dept');
        var team = record.get('team');
        var group = record.get('group');
        smFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
        smFineTeamStore.reload({
            callback: function() {
                Ext.getCmp('sm-fineedit-team').setValue(team);
            }
        });
        smFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
        smFineGroupStore.getProxy().extraParams['group.teamName'] = team;
        smFineGroupStore.reload({
            callback: function() {
                Ext.getCmp('sm-fineedit-group').setValue(group);
            }
        });
        smFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
        smFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
        smFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
        smFineWorkerStore.reload({
            callback: function() {
                Ext.getCmp('sm-fineedit-person').setValue(record.get('personName'));
            }
        });
        win.show();
    },

    submitFineEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'sm_saveFine.action',
            succesm: function(form, action) {
                win.hide();
                smFineStore.reload();
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });

    },

    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('sm-fineedit-dept');
        var cbTeam = Ext.getCmp('sm-fineedit-team');
        var cbGroup = Ext.getCmp('sm-fineedit-group');
        var cbPerson = Ext.getCmp('sm-fineedit-person');
        var txPerson = Ext.getCmp('sm-fineedit-personacc');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'sm-fineedit-dept':
                smFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
                smFineTeamStore.reload();
                smFineGroupStore.removeAll();
                smFineWorkerStore.removeAll();
                cbGroup.reset();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'sm-fineedit-team':
                smFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
                smFineGroupStore.getProxy().extraParams['group.teamName'] = team;
                smFineGroupStore.reload();
                smFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                smFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                smFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                smFineWorkerStore.reload();
                break;
            case 'sm-fineedit-group':
                smFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                smFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                smFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                smFineWorkerStore.reload();
                txPerson.setValue('');
                break;

        }
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('sm-fineedit-group').setValue(model.get('groupName'));
            Ext.getCmp('sm-fineedit-personacc').setValue(model.get('account'));
        }
    },

    searchFine: function(btn) {
        var projName = Ext.getCmp('sm-fine-tbar-projname').getValue();
        var team = Ext.getCmp('sm-fine-tbar-team').getValue();
        var personName = Ext.getCmp('sm-fine-tbar-personname').getValue();
        var description = Ext.getCmp('sm-fine-tbar-description').getValue();
        smFineStore.getProxy().extraParams['fine.projName'] = projName;
        smFineStore.getProxy().extraParams['fine.team'] = team;
        smFineStore.getProxy().extraParams['fine.personName'] = personName;
        smFineStore.getProxy().extraParams['fine.description'] = description;
        smFineStore.reload();
    },


    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-fineedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadFine.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-fineedit-attachment').setValue(path);
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
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-fineedit-attachment').getValue(),
                    succesm: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-fineedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('sm-fineedit-att').show();
            Ext.getCmp('sm-fineedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-fineedit-att').hide();
            Ext.getCmp('sm-fineedit-link').setHref('');
        }
    },

})