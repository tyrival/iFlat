Ext.define('iFlat.model.pam.YearWork', {
    extend: 'Ext.data.Model',
    fields: [
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