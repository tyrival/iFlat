Ext.define('iFlat.model.pam.MemberDist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'memberDist.pbName', mapping: 'pbName', type: 'string'},
        {name: 'memberDist.memberFull', memberFull: 'memberFull', type: 'number'},
        {name: 'memberDist.memberProb', memberFull: 'memberProb', type: 'number'},
        {name: 'memberDist.applicant', memberFull: 'applicant', type: 'number'},
        {name: 'memberDist.activist', memberFull: 'activist', type: 'number'},
    ]
});