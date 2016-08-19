Ext.define('iFlat.model.xr.SrBalanceAppl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srBalanceAppl.id', mapping: 'id', type: 'string'},
        {name: 'srBalanceAppl.projNo', mapping: 'projNo', type: 'string'},
        {name: 'srBalanceAppl.projName', mapping: 'projName', type: 'string'},
        {name: 'srBalanceAppl.dept', mapping: 'dept', type: 'string'},
        {name: 'srBalanceAppl.description', mapping: 'description', type: 'string'},
        {name: 'srBalanceAppl.attachment', mapping: 'attachment', type: 'string'},
        {name: 'srBalanceAppl.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'srBalanceAppl.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'srBalanceAppl.createTime', mapping: 'createTime', type: 'date'},
    ]
});