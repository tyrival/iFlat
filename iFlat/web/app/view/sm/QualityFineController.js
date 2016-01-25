Ext.define('iFlat.view.sm.QualityFineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sm-qualityfine',

    deleteQualityFine: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['qualityFine.id'];
        if(id == undefined || id == '') {
            smQualityFineStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'sm_deleteQualityFine.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                smQualityFineStore.remove(record);
                            }
                            tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('sm-qualityfine-tbar-projname').setValue('');
        Ext.getCmp('sm-qualityfine-tbar-team').setValue('');
        Ext.getCmp('sm-qualityfine-tbar-personname').setValue('');
        Ext.getCmp('sm-qualityfine-tbar-description').setValue('');
        smQualityFineStore.getProxy().extraParams['qualityFineVo.projName'] = null;
        smQualityFineStore.getProxy().extraParams['qualityFineVo.team'] = null;
        smQualityFineStore.getProxy().extraParams['qualityFineVo.personName'] = null;
        smQualityFineStore.getProxy().extraParams['qualityFineVo.description'] = null;
        smQualityFineStore.reload();
    },

    showQualityFineEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('sm-qualityfineedit');
        if(!win) {
            win = Ext.create('iFlat.view.sm.QualityFineEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.sm.QualityFine');
        }
        win.down('form').loadRecord(record);
        var dept = record.get('dept');
        var team = record.get('team');
        var group = record.get('group');
        smQualityFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
        smQualityFineTeamStore.reload({
            callback: function() {
                Ext.getCmp('sm-qualityfineedit-team').setValue(team);
            }
        });
        smQualityFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
        smQualityFineGroupStore.getProxy().extraParams['group.teamName'] = team;
        smQualityFineGroupStore.reload({
            callback: function() {
                Ext.getCmp('sm-qualityfineedit-group').setValue(group);
            }
        });
        smQualityFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
        smQualityFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
        smQualityFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
        smQualityFineWorkerStore.reload({
            callback: function() {
                Ext.getCmp('sm-qualityfineedit-person').setValue(record.get('personName'));
            }
        });
        win.show();
    },

    submitQualityFineEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'sm_saveQualityFine.action',
            success: function(form, action) {
                win.hide();
                smQualityFineStore.reload();
                tip(action.response.responseText);
            },
            failure: function(form, action) {
                tip(action.response.responseText);
            }
        });

    },

    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('sm-qualityfineedit-dept');
        var cbTeam = Ext.getCmp('sm-qualityfineedit-team');
        var cbGroup = Ext.getCmp('sm-qualityfineedit-group');
        var cbPerson = Ext.getCmp('sm-qualityfineedit-person');
        var txPerson = Ext.getCmp('sm-qualityfineedit-personacc');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'sm-qualityfineedit-dept':
                smQualityFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
                smQualityFineTeamStore.reload();
                smQualityFineGroupStore.removeAll();
                smQualityFineWorkerStore.removeAll();
                cbGroup.reset();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'sm-qualityfineedit-team':
                smQualityFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
                smQualityFineGroupStore.getProxy().extraParams['group.teamName'] = team;
                smQualityFineGroupStore.reload();
                smQualityFineWorkerStore.removeAll();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'sm-qualityfineedit-group':
                smQualityFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                smQualityFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                smQualityFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                smQualityFineWorkerStore.reload();
                txPerson.setValue('');
                break;

        }
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('sm-qualityfineedit-personacc').setValue(model.get('account'));
        }
    },

    searchQualityFine: function(btn) {
        var projName = Ext.getCmp('sm-qualityfine-tbar-projname').getValue();
        var team = Ext.getCmp('sm-qualityfine-tbar-team').getValue();
        var personName = Ext.getCmp('sm-qualityfine-tbar-personname').getValue();
        var description = Ext.getCmp('sm-qualityfine-tbar-description').getValue();
        smQualityFineStore.getProxy().extraParams['qualityFineVo.projName'] = projName;
        smQualityFineStore.getProxy().extraParams['qualityFineVo.team'] = team;
        smQualityFineStore.getProxy().extraParams['qualityFineVo.personName'] = personName;
        smQualityFineStore.getProxy().extraParams['qualityFineVo.description'] = description;
        smQualityFineStore.reload();
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('sm-qualityfineedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'sm_uploadQualityFine.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('sm-qualityfineedit-attachment').setValue(path);
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
                    url: 'sm_deleteFile.action?filePath=' + Ext.getCmp('sm-qualityfineedit-attachment').getValue(),
                    success: function (response, opts) {
                        tip(response.responseText);
                    },
                })
                Ext.getCmp('sm-qualityfineedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('sm-qualityfineedit-att').show();
            Ext.getCmp('sm-qualityfineedit-link').setHref(newValue);
        } else {
            Ext.getCmp('sm-qualityfineedit-att').hide();
            Ext.getCmp('sm-qualityfineedit-link').setHref('');
        }
    }
})