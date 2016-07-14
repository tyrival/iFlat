Ext.define('iFlat.model.pm.Project', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'pmProject.id', mapping: 'id', type: 'string'},
        {name: 'pmProject.type', mapping: 'type', type: 'string'},
        {name: 'pmProject.name', mapping: 'name', type: 'string'},
        {name: 'pmProject.description', mapping: 'description', type: 'string'},
        {name: 'pmProject.comment', mapping: 'comment', type: 'string'},
        {name: 'pmProject.status', mapping: 'status', type: 'string'},
        {name: 'pmProject.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'pmProject.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'pmProject.createTime', mapping: 'createTime', type: 'date'},
        {name: 'pmProject.completeTime', mapping: 'completeTime', type: 'date'},
        {name: 'pmProject.deadline', mapping: 'deadline', type: 'date'},
        {name: 'pmProject.mgrAcc', mapping: 'mgrAcc', type: 'string'},
        {name: 'pmProject.mgrName', mapping: 'mgrName', type: 'string'},
        {name: 'pmProject.level', mapping: 'level', type: 'number'},
        {name: 'pmProject.attachment', mapping: 'attachment', type: 'string'},
        {name: 'pmProject.overDue', mapping: 'overDue', type: 'number'},
        {name: 'pmProject.fromDate', mapping: 'fromDate', type: 'date'},
        {name: 'pmProject.toDate', mapping: 'toDate', type: 'date'},
    ]
});