Ext.define('iFlat.model.sm.TemporaryDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'temporaryDetail.id', mapping: 'id', type: 'string'},
        {name: 'temporaryDetail.pid', mapping: 'pid', type: 'string'},
        {name: 'temporaryDetail.team', mapping: 'team', type: 'string'},
        {name: 'temporaryDetail.name', mapping: 'name', type: 'string'},
        {name: 'temporaryDetail.trades', mapping: 'trades', type: 'string'},
        {name: 'temporaryDetail.standard', mapping: 'standard', type: 'number'},
        {name: 'temporaryDetail.days', mapping: 'days', type: 'number'},
        {name: 'temporaryDetail.ratio', mapping: 'ratio', type: 'number'},
        {name: 'temporaryDetail.score', mapping: 'score', type: 'number'},
        {name: 'temporaryDetail.salary', mapping: 'salary', type: 'number'},
        {name: 'temporaryDetail.adjust', mapping: 'adjust', type: 'number'},
        {name: 'temporaryDetail.summary', mapping: 'summary', type: 'number'},
        {name: 'temporaryDetail.comment', mapping: 'comment', type: 'string'},
        {name: 'temporaryDetail.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'temporaryDetail.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'temporaryDetail.createTime', mapping: 'createTime', type: 'date'},
    ]
});