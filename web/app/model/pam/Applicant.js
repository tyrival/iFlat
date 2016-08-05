Ext.define('iFlat.model.pam.Applicant', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'applicant.id', mapping: 'id', type: 'string'},
        {name: 'applicant.pbName', mapping: 'pbName', type: 'string'},
        {name: 'applicant.name', mapping: 'name', type: 'string'},
        {name: 'applicant.sex', mapping: 'sex', type: 'string'},
        {name: 'applicant.dept', mapping: 'dept', type: 'string'},
        {name: 'applicant.birth', mapping: 'birth', type: 'date'},
        {name: 'applicant.applyTime', mapping: 'applyTime', type: 'date'},
        {name: 'applicant.isComsomol', mapping: 'isComsomol', type: 'string'},
        {name: 'applicant.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'applicant.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'applicant.createrTime', mapping: 'createrTime', type: 'date'},
    ]
});