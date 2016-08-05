Ext.define('iFlat.model.pam.Activist', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'activist.id', mapping: 'id', type: 'string'},
        {name: 'activist.pbName', mapping: 'pbName', type: 'string'},
        {name: 'activist.name', mapping: 'name', type: 'string'},
        {name: 'activist.sex', mapping: 'sex', type: 'string'},
        {name: 'activist.dept', mapping: 'dept', type: 'string'},
        {name: 'activist.birth', mapping: 'birth', type: 'date'},
        {name: 'activist.applyTime', mapping: 'applyTime', type: 'date'},
        {name: 'activist.becomeActivist', mapping: 'becomeActivist', type: 'date'},
        {name: 'activist.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'activist.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'activist.createrTime', mapping: 'createrTime', type: 'date'},
    ]
});