Ext.define('iFlat.model.pam.CommitteeDetail', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'committeeDetail.id', mapping: 'id', type: 'string'},
        {name: 'committeeDetail.pid', mapping: 'pid', type: 'string'},
        {name: 'committeeDetail.title', mapping: 'title', type: 'string'},
        {name: 'committeeDetail.name', mapping: 'name', type: 'string'},
        {name: 'committeeDetail.sex', mapping: 'sex', type: 'string'},
        {name: 'committeeDetail.degree', mapping: 'degree', type: 'string'},
        {name: 'committeeDetail.birth', mapping: 'birth', type: 'date'},
        {name: 'committeeDetail.adminTitle', mapping: 'adminTitle', type: 'string'},
        {name: 'committeeDetail.tel', mapping: 'tel', type: 'string'},
        {name: 'committeeDetail.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'committeeDetail.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'committeeDetail.createrTime', mapping: 'createrTime', type: 'date'},
    ]
});