Ext.define('iFlat.view.report.hr.FineController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-hr-fine',

    refresh: function() {

        Ext.getCmp('rpt-hr-fine-from').setValue('');
        Ext.getCmp('rpt-hr-fine-to').setValue('');
        Ext.getCmp('rpt-hr-fine-dept').setValue('');
        Ext.getCmp('rpt-hr-fine-team').setValue('');
        Ext.getCmp('rpt-hr-fine-group').setValue('');
        Ext.getCmp('rpt-hr-fine-type').setValue('');
        Ext.getCmp('rpt-hr-fine-personname').setValue('');
        rptHrFineStore.removeAll();
    },

    search: function(btn) {
        var from = Ext.getCmp('rpt-hr-fine-from').getValue();
        var to = Ext.getCmp('rpt-hr-fine-to').getValue();
        var dept = Ext.getCmp('rpt-hr-fine-dept').getValue();
        var team = Ext.getCmp('rpt-hr-fine-team').getValue();
        var group = Ext.getCmp('rpt-hr-fine-group').getValue();
        var type = Ext.getCmp('rpt-hr-fine-type').getValue();
        var personName = Ext.getCmp('rpt-hr-fine-personname').getValue();

        rptHrFineStore.getProxy().extraParams['fine.type'] = type;
        rptHrFineStore.getProxy().extraParams['fine.dept'] = dept;
        rptHrFineStore.getProxy().extraParams['fine.team'] = team;
        rptHrFineStore.getProxy().extraParams['fine.group'] = group;
        rptHrFineStore.getProxy().extraParams['fine.personName'] = personName;
        rptHrFineStore.getProxy().extraParams['fine.fromDate'] = from;
        rptHrFineStore.getProxy().extraParams['fine.toDate'] = to;
        rptHrFineStore.reload();
    },
    
    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('rpt-hr-fine-dept');
        var cbTeam = Ext.getCmp('rpt-hr-fine-team');
        var cbGroup = Ext.getCmp('rpt-hr-fine-group');
        var cbPerson = Ext.getCmp('rpt-hr-fine-personname');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'rpt-hr-fine-dept':
                rptHrFineTeamStore.getProxy().extraParams['team.deptName'] = dept;
                rptHrFineTeamStore.reload();
                rptHrFineGroupStore.removeAll();
                rptHrFineWorkerStore.removeAll();
                rptHrFineWorkerStore.reload();
                cbGroup.reset();
                cbPerson.reset();
                break;
            case 'rpt-hr-fine-team':
                rptHrFineGroupStore.getProxy().extraParams['group.deptName'] = dept;
                rptHrFineGroupStore.getProxy().extraParams['group.teamName'] = team;
                rptHrFineGroupStore.reload();
                cbPerson.reset();
                break;
            case 'rpt-hr-fine-group':
                rptHrFineWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                rptHrFineWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                rptHrFineWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                rptHrFineWorkerStore.reload();
                break;
        }
    },

    exportToExcel: function(btn) {
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '考核信息',
            fileName: '考核信息.xls',
        })
    }
})