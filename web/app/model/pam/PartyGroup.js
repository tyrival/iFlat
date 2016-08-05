Ext.define('iFlat.model.pam.PartyGroup', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'partyGroup.id', mapping: 'id', type: 'string'},
        {name: 'partyGroup.pbName', mapping: 'pbName', type: 'string'},
        {name: 'partyGroup.name', mapping: 'name', type: 'string'},
        {name: 'partyGroup.leader', mapping: 'leader', type: 'string'},
        {name: 'partyGroup.memberNum', mapping: 'memberNum', type: 'number'},
        {name: 'partyGroup.group', mapping: 'group', type: 'string'},
    ]
});