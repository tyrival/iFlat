Ext.define('iFlat.model.pam.PartyBranch', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'partyBranch.id', mapping: 'id', type: 'string'},
        {name: 'partyBranch.name', mapping: 'name', type: 'string'},
        {name: 'partyBranch.dept', mapping: 'dept', type: 'string'},
        {name: 'partyBranch.description', mapping: 'description', type: 'string'},
        {name: 'partyBranch.sequence', mapping: 'sequence', type: 'string'},
    ]
});