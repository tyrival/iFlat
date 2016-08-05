Ext.define('iFlat.model.pam.General', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pamGeneral.id', mapping: 'id', type: 'string'},
        {name: 'pamGeneral.pbName', mapping: 'pbName', type: 'string'},
        {name: 'pamGeneral.deptMemberNum', mapping: 'deptMemberNum', type: 'number'},
        {name: 'pamGeneral.partyMemberNum', mapping: 'partyMemberNum', type: 'number'},
        {name: 'pamGeneral.partyGroupNum', mapping: 'partyGroupNum', type: 'number'},
        {name: 'pamGeneral.malePartyMember', mapping: 'malePartyMember', type: 'number'},
        {name: 'pamGeneral.femalePartyMember', mapping: 'femalePartyMember', type: 'number'},
        {name: 'pamGeneral.groupWithoutParty', mapping: 'groupWithoutParty', type: 'number'},
        {name: 'pamGeneral.comsomol', mapping: 'comsomol', type: 'number'},
        {name: 'pamGeneral.contact', mapping: 'contact', type: 'string'},
        {name: 'pamGeneral.phoneNum', mapping: 'phoneNum', type: 'string'},
    ]
});