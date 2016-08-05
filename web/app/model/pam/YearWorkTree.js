Ext.define('iFlat.model.pam.YearWorkTree', {
    extend: 'Ext.data.TreeModel',
    fields: [
        {name: 'id', mapping: 'id', type: 'string'},
        {name: 'text', mapping: 'text', type: 'string'},
        {name: 'leaf', mapping: 'leaf', type: 'boolean' },
        {name: 'sequence', mapping: 'sequence', type: 'string'},
        {name: 'parentId', mapping: 'parentId', type: 'string'},
        {name: 'yearWork.id', mapping: 'id', type: 'string'},
        {name: 'yearWork.type', mapping: 'type', type: 'string'},
        {name: 'yearWork.year', mapping: 'year', type: 'date'},
        {name: 'yearWork.pbName', mapping: 'pbName', type: 'string'},
        {name: 'yearWork.content', mapping: 'content', type: 'string'},
        {name: 'yearWork.attachment', mapping: 'attachment', type: 'string'},
        {name: 'yearWork.status', mapping: 'status', type: 'string'},
        {name: 'yearWork.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'yearWork.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'yearWork.createrTime', mapping: 'createrTime', type: 'date'},
    ]
});