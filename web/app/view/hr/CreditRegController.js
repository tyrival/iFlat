Ext.define('iFlat.view.hr.CreditRegController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.hr-creditreg',

    refreshList: function() {
        Ext.getCmp('hr-creditreg-tbar-projname').setValue('');
        Ext.getCmp('hr-creditreg-tbar-team').setValue('');
        Ext.getCmp('hr-creditreg-tbar-personname').setValue('');
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
    
})