Ext.define('iFlat.model.pam.PartyBranchTree', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'text', mapping: 'text', type: 'string'},
        {name: 'leaf', mapping: 'leaf', type: 'boolean' },
        {name: 'sequence', mapping: 'sequence', type: 'string'},
        {name: 'parentId', mapping: 'parentId', type: 'string'},
    ]
});