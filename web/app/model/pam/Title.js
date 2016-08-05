Ext.define('iFlat.model.pam.Title', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pamTitle.id', mapping: 'id', type: 'string'},
        {name: 'pamTitle.name', mapping: 'name', type: 'string'},
        {name: 'pamTitle.sequence', mapping: 'sequence', type: 'string'},
    ]
});