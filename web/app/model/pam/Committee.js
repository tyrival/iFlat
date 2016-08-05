Ext.define('iFlat.model.pam.Committee', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'committee.id', mapping: 'id', type: 'string'},
        {name: 'committee.pbName', mapping: 'pbName', type: 'string'},
        {name: 'committee.electionTime', mapping: 'electionTime', type: 'date'},
        {name: 'committee.people', mapping: 'people', type: 'number'},
    ]
});