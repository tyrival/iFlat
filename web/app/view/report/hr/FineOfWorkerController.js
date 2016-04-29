Ext.define('iFlat.view.report.hr.FineOfWorkerController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-hr-fineofworker',

    refresh: function() {
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.dept'] = null;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.team'] = null;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.group'] = null;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.personName'] = null;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.fromDate'] = null;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.toDate'] = null;

        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.dept'] = null;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.team'] = null;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.group'] = null;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.personName'] = null;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['qualityFineVo.fromDate'] = null;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['qualityFineVo.toDate'] = null;

        rptHrFineOfWorkerQmStore.removeAll();
        rptHrFineOfWorkerSsStore.removeAll();

        Ext.getCmp('rpt-hr-fineofworker-from').setValue('');
        Ext.getCmp('rpt-hr-fineofworker-to').setValue('');
        Ext.getCmp('rpt-hr-fineofworker-dept').setValue('');
        Ext.getCmp('rpt-hr-fineofworker-team').setValue('');
        Ext.getCmp('rpt-hr-fineofworker-group').setValue('');
        Ext.getCmp('rpt-hr-fineofworker-personname').setValue('');
    },

    onTeamInfoChange: function(combo, record, eOpts) {
        var cbDept = Ext.getCmp('rpt-hr-fineofworker-dept');
        var cbTeam = Ext.getCmp('rpt-hr-fineofworker-team');
        var cbGroup = Ext.getCmp('rpt-hr-fineofworker-group');
        var cbPerson = Ext.getCmp('rpt-hr-fineofworker-personname');
        var dept = cbDept.getValue();
        var team = cbTeam.getValue();
        var group = cbGroup.getValue();
        switch (combo.getId()) {
            case 'rpt-hr-fineofworker-dept':
                rptHrFineOfWorkerTeamStore.getProxy().extraParams['team.deptName'] = dept;
                rptHrFineOfWorkerTeamStore.reload();
                rptHrFineOfWorkerGroupStore.removeAll();
                rptHrFineOfWorkerWorkerStore.removeAll();
                rptHrFineOfWorkerWorkerStore.reload();
                cbGroup.reset();
                cbPerson.reset();
                break;
            case 'rpt-hr-fineofworker-team':
                rptHrFineOfWorkerGroupStore.getProxy().extraParams['group.deptName'] = dept;
                rptHrFineOfWorkerGroupStore.getProxy().extraParams['group.teamName'] = team;
                rptHrFineOfWorkerGroupStore.reload();
                cbPerson.reset();
                break;
            case 'rpt-hr-fineofworker-group':
                rptHrFineOfWorkerWorkerStore.getProxy().extraParams['worker.deptName'] = dept;
                rptHrFineOfWorkerWorkerStore.getProxy().extraParams['worker.teamName'] = team;
                rptHrFineOfWorkerWorkerStore.getProxy().extraParams['worker.groupName'] = group;
                rptHrFineOfWorkerWorkerStore.reload();
                break;
        }
    },

    search: function(btn) {

        var from = Ext.getCmp('rpt-hr-fineofworker-from').getValue();
        var to = Ext.getCmp('rpt-hr-fineofworker-to').getValue();
        var dept = Ext.getCmp('rpt-hr-fineofworker-dept').getValue();
        var team = Ext.getCmp('rpt-hr-fineofworker-team').getValue();
        var group = Ext.getCmp('rpt-hr-fineofworker-group').getValue();
        var personName = Ext.getCmp('rpt-hr-fineofworker-personname').getValue();

        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.dept'] = dept;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.team'] = team;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.group'] = group;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.personName'] = personName;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.fromDate'] = from;
        rptHrFineOfWorkerQmStore.getProxy().extraParams['qualityFineVo.toDate'] = to;
        rptHrFineOfWorkerQmStore.reload();

        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.dept'] = dept;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.team'] = team;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.group'] = group;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['safetyFineVo.personName'] = personName;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['qualityFineVo.fromDate'] = from;
        rptHrFineOfWorkerSsStore.getProxy().extraParams['qualityFineVo.toDate'] = to;
        rptHrFineOfWorkerSsStore.reload();
    },

    exportToExcel: function(btn) {
        var text = btn.getText();
        var id = 'rpt-hr-fineofworker-grid';
        var t = '';
        switch (text) {
            case '导出-质量':
                id += '1';
                t = '质量罚款';
                break;
            case  '导出-安全':
                id += '2';
                t = '安全罚款';
                break;
        }
        var grid = Ext.getCmp(id);
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    }
})