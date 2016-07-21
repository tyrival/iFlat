Ext.define('iFlat.view.hr.CreditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hr-credit',

    deleteCredit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['credit.id'];
        if(id == undefined || id == '') {
            hrCreditStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'hr_deleteCredit.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                hrCreditStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        Ext.getCmp('hr-credit-tbar-projname').setValue('');
        Ext.getCmp('hr-credit-tbar-team').setValue('');
        Ext.getCmp('hr-credit-tbar-personname').setValue('');
        Ext.getCmp('hr-credit-tbar-description').setValue('');
        hrCreditStore.getProxy().extraParams['credit.projName'] = null;
        hrCreditStore.getProxy().extraParams['credit.team'] = null;
        hrCreditStore.getProxy().extraParams['credit.personName'] = null;
        hrCreditStore.getProxy().extraParams['credit.description'] = null;
        hrCreditStore.reload();
    },

    showCreditEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('hr-creditedit');
        if(!win) {
            win = Ext.create('iFlat.view.hr.CreditEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.hr.Credit');
        }
        var form = win.down('form');
        form.loadRecord(record);
        var dept = record.get('dept');
        if (!Flat.util.isEmpty(dept)) {
            hrCreditEmployeeStore.getProxy().extraParams['employee.deptName'] = dept;
            hrCreditEmployeeStore.reload({
                callback: function() {
                    Ext.getCmp('hr-creditedit-manager').setValue(record.get('manager'));
                    Ext.getCmp('hr-creditedit-areamgr').setValue(record.get('areaMgr'));
                    Ext.getCmp('hr-creditedit-workmgr').setValue(record.get('workMgr'));
                    Ext.getCmp('hr-creditedit-groupmgr').setValue(record.get('groupMgr'));
                }
            });
        }
        win.show();
    },

    submitCreditEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        if (form.isValid()) {
            form.submit({
                url :'hr_saveCredit.action',
            });
        }
    },

    onDeptChange: function(combo, record, eOpts) {
        var dept = combo.getValue();
        hrCreditEmployeeStore.getProxy().extraParams['employee.deptName'] = dept;
        hrCreditEmployeeStore.reload();
    },

    onPersonChange: function(combo, record, eOpts) {
        var model = combo.getSelection();
        if(model) {
            Ext.getCmp('hr-creditedit-team').setValue(model.get('teamName'));
            Ext.getCmp('hr-creditedit-group').setValue(model.get('groupName'));
            Ext.getCmp('hr-creditedit-personacc').setValue(model.get('account'));
        }
    },

    searchCredit: function(btn) {
        var projName = Ext.getCmp('hr-credit-tbar-projname').getValue();
        var team = Ext.getCmp('hr-credit-tbar-team').getValue();
        var personName = Ext.getCmp('hr-credit-tbar-personname').getValue();
        var description = Ext.getCmp('hr-credit-tbar-description').getValue();
        hrCreditStore.getProxy().extraParams['credit.projName'] = projName;
        hrCreditStore.getProxy().extraParams['credit.team'] = team;
        hrCreditStore.getProxy().extraParams['credit.personName'] = personName;
        hrCreditStore.getProxy().extraParams['credit.description'] = description;
        hrCreditStore.reload();
    },


    uploadAttachment: function(btn) {
        var form = Ext.getCmp('hr-creditedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'hr_uploadCredit.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('hr-creditedit-attachment').setValue(path);
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
                    url: 'hr_deleteFile.action?filePath=' + Ext.getCmp('hr-creditedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('hr-creditedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('hr-creditedit-att').show();
            Ext.getCmp('hr-creditedit-link').setHref(newValue);
        } else {
            Ext.getCmp('hr-creditedit-att').hide();
            Ext.getCmp('hr-creditedit-link').setHref('');
        }
    },

    uploadFile: function(btn) {
        var form = btn.previousSibling('form');
        if (form.isValid()) {
            form.submit({
                url: 'hr_importCredit.action',
                method: 'POST',
                waitMsg: '正在导入......',
                success: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                    Ext.getCmp('hr-creditedit').hide();
                    var store = Ext.getCmp('main-view-tabpanel').getActiveTab().getStore();
                    if (store) {
                        store.reload();
                    }
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    downloadTemplate: function(btn) {
        Ext.Ajax.request({
            url: 'hr_templateCredit.action',
            method: 'post',
            success: function(response, opts) {
                window.open(Ext.JSON.decode(response.responseText)['object']);
            },
        });
    },
})