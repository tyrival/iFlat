Ext.define('iFlat.view.qm.QualityFineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.qm-qualityfine',

    deleteQualityFine: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['qualityFine.id'];
        if(id == undefined || id == '') {
            qmQualityFineStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'qm_deleteQualityFine.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                qmQualityFineStore.remove(record);
                            }
                            tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('qm-qualityfine-tbar-projname').setValue('');
        Ext.getCmp('qm-qualityfine-tbar-team').setValue('');
        Ext.getCmp('qm-qualityfine-tbar-personname').setValue('');
        Ext.getCmp('qm-qualityfine-tbar-description').setValue('');
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.projName'] = null;
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.team'] = null;
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.personName'] = null;
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.description'] = null;
        qmQualityFineStore.reload();
    },

    showQualityFineEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('qm-qualityfineedit');
        if(!win) {
            win = Ext.create('iFlat.view.qm.QualityFineEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.qm.QualityFine');
        }
        win.down('form').loadRecord(record);
        var dept = record.get('dept');
        var team = record.get('team');
        var group = record.get('group');
        qmQualityFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
        qmQualityFineTeamStore.reload({
            callback: function() {
                Ext.getCmp('qm-qualityfineedit-team').setValue(team);
            }
        });
        qmQualityFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
        qmQualityFineGroupStore.getProxy().extraParams['group.teamName'] = team;
        qmQualityFineGroupStore.reload({
            callback: function() {
                Ext.getCmp('qm-qualityfineedit-group').setValue(group);
            }
        });
        qmQualityFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
        qmQualityFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
        qmQualityFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
        qmQualityFineWorkerStore.reload({
            callback: function() {
                Ext.getCmp('qm-qualityfineedit-person').setValue(record.get('personName'));
            }
        });
        win.show();
    },

    submitQualityFineEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'qm_saveQualityFine.action',
            success: function(form, action) {
                win.hide();
                qmQualityFineStore.reload();
                tip(action.response.responseText);
            },
            failure: function(form, action) {
                tip(action.response.responseText);
            }
        });

    },

    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('qm-qualityfineedit-dept');
        var cbTeam = Ext.getCmp('qm-qualityfineedit-team');
        var cbGroup = Ext.getCmp('qm-qualityfineedit-group');
        var cbPerson = Ext.getCmp('qm-qualityfineedit-person');
        var txPerson = Ext.getCmp('qm-qualityfineedit-personacc');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'qm-qualityfineedit-dept':
                qmQualityFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
                qmQualityFineTeamStore.reload();
                qmQualityFineGroupStore.removeAll();
                qmQualityFineWorkerStore.removeAll();
                cbGroup.reset();
                cbPerson.reset();
                txPerson.setValue('');
                break;
            case 'qm-qualityfineedit-team':
                qmQualityFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
                qmQualityFineGroupStore.getProxy().extraParams['group.teamName'] = team;
                qmQualityFineGroupStore.reload();
                qmQualityFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                qmQualityFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                qmQualityFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                qmQualityFineWorkerStore.reload();
                break;
            case 'qm-qualityfineedit-group':
                qmQualityFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                qmQualityFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                qmQualityFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                qmQualityFineWorkerStore.reload();
                txPerson.setValue('');
                break;

        }
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('qm-qualityfineedit-group').setValue(model.get('groupName'));
            Ext.getCmp('qm-qualityfineedit-personacc').setValue(model.get('account'));
        }
    },

    searchQualityFine: function(btn) {
        var projName = Ext.getCmp('qm-qualityfine-tbar-projname').getValue();
        var team = Ext.getCmp('qm-qualityfine-tbar-team').getValue();
        var personName = Ext.getCmp('qm-qualityfine-tbar-personname').getValue();
        var description = Ext.getCmp('qm-qualityfine-tbar-description').getValue();
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.projName'] = projName;
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.team'] = team;
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.personName'] = personName;
        qmQualityFineStore.getProxy().extraParams['qualityFineVo.description'] = description;
        qmQualityFineStore.reload();
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('qm-qualityfineedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'qm_uploadQualityFine.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('qm-qualityfineedit-attachment').setValue(path);
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
                    url: 'qm_deleteFile.action?filePath=' + Ext.getCmp('qm-qualityfineedit-attachment').getValue(),
                    success: function (response, opts) {
                        tip(response.responseText);
                    },
                })
                Ext.getCmp('qm-qualityfineedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('qm-qualityfineedit-att').show();
            Ext.getCmp('qm-qualityfineedit-link').setHref(newValue);
        } else {
            Ext.getCmp('qm-qualityfineedit-att').hide();
            Ext.getCmp('qm-qualityfineedit-link').setHref('');
        }
    }
})