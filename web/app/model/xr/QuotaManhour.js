Ext.define('iFlat.model.xr.QuotaManhour', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'quotaManhour.projNo', mapping: 'projNo', type: 'string'},
        {name: 'quotaManhour.projName', mapping: 'projName', type: 'string'},
        {name: 'quotaManhour.deptCode', mapping: 'deptCode', type: 'string'},
        {name: 'quotaManhour.dept', mapping: 'dept', type: 'string'},
        {name: 'quotaManhour.teamCode', mapping: 'teamCode', type: 'string'},
        {name: 'quotaManhour.team', mapping: 'team', type: 'string'},
        {name: 'quotaManhour.quota', mapping: 'quota', type: 'number'},
        {name: 'quotaManhour.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'quotaManhour.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'quotaManhour.createTime', mapping: 'createTime', type: 'date'},
        {name: 'quotaManhour.settlementTime', mapping: 'settlementTime', type: 'date'},
        {name: 'quotaManhour.fromDate', mapping: 'fromDate', type: 'date'},
        {name: 'quotaManhour.toDate', mapping: 'toDate', type: 'date'},
    ]
});