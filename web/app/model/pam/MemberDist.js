Ext.define('iFlat.model.pam.MemberDist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'memberDist.pbName', mapping: 'pbName', type: 'string'},
        {name: 'memberDist.memberFull', mapping: 'memberFull', type: 'number'},
        {name: 'memberDist.memberProb', mapping: 'memberProb', type: 'number'},
        {name: 'memberDist.applicant', mapping: 'applicant', type: 'number'},
        {name: 'memberDist.activist', mapping: 'activist', type: 'number'},
    ]
});