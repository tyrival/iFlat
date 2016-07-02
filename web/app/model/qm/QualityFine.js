Ext.define('iFlat.model.qm.QualityFine', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'qualityFine.id', mapping: 'id', type: 'string'},
        {name: 'qualityFine.projNo', mapping: 'projNo', type: 'string'},
        {name: 'qualityFine.projName', mapping: 'projName', type: 'string'},
        {name: 'qualityFine.dept', mapping: 'dept', type: 'string'},
        {name: 'qualityFine.team', mapping: 'team', type: 'string'},
        {name: 'qualityFine.group', mapping: 'group', type: 'string'},
        {name: 'qualityFine.personAcc', mapping: 'personAcc', type: 'string'},
        {name: 'qualityFine.personName', mapping: 'personName', type: 'string'},
        {name: 'qualityFine.date', mapping: 'date', type: 'date'},
        {name: 'qualityFine.profession', mapping: 'profession', type: 'string'},
        {name: 'qualityFine.description', mapping: 'description', type: 'string'},
        {name: 'qualityFine.category', mapping: 'category', type: 'string'},
        {name: 'qualityFine.amount', mapping: 'amount', type: 'number'},
        {name: 'qualityFine.comment', mapping: 'comment', type: 'string'},
        {name: 'qualityFine.qc', mapping: 'qc', type: 'string'},
        {name: 'qualityFine.attachment', mapping: 'attachment', type: 'string'},
        {name: 'qualityFine.creator', mapping: 'creator', type: 'string'},
        {name: 'qualityFine.createTime', mapping: 'createTime', type: 'date'},
        {name: 'qualityFine.score', mapping: 'score', type: 'number'},
    ]
});