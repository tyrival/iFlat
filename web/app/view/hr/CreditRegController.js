Ext.define('iFlat.view.hr.CreditRegController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hr-creditreg',

    refreshList: function() {
        Ext.getCmp('hr-creditreg-tbar-projname').setValue('');
        Ext.getCmp('hr-creditreg-tbar-team').setValue('');
        Ext.getCmp('hr-credit-tbar-personname').setValue('');
        Ext.getCmp('hr-creditreg-tbar-description').setValue('');
        hrCreditRegStore.getProxy().extraParams['credit.projName'] = null;
        hrCreditRegStore.getProxy().extraParams['credit.team'] = null;
        hrCreditRegStore.getProxy().extraParams['credit.personName'] = null;
        hrCreditRegStore.getProxy().extraParams['credit.description'] = null;
        hrCreditRegStore.reload();
    },

    showCreditRegEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
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
                url :'hr_saveCreditReg.action',
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

    searchCreditReg: function(btn) {
        var projName = Ext.getCmp('hr-creditreg-tbar-projname').getValue();
        var team = Ext.getCmp('hr-creditreg-tbar-team').getValue();
        var personName = Ext.getCmp('hr-creditreg-tbar-personname').getValue();
        var description = Ext.getCmp('hr-creditreg-tbar-description').getValue();
        hrCreditRegStore.getProxy().extraParams['credit.projName'] = projName;
        hrCreditRegStore.getProxy().extraParams['credit.team'] = team;
        hrCreditRegStore.getProxy().extraParams['credit.personName'] = personName;
        hrCreditRegStore.getProxy().extraParams['credit.description'] = description;
        hrCreditRegStore.reload();
    },


    uploadAttachment: function(btn) {
        var form = Ext.getCmp('hr-creditedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'hr_uploadCreditReg.action',
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

})