Ext.define('iFlat.model.xr.SrProjectMgr', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srProjectMgr.id', mapping: 'id', type: 'string'},
        {name: 'srProjectMgr.projNo', mapping: 'projNo', type: 'string'},
        {name: 'srProjectMgr.projName', mapping: 'projName', type: 'string'},
        {name: 'srProjectMgr.account', mapping: 'account', type: 'string'},
        {name: 'srProjectMgr.name', mapping: 'name', type: 'string'},
    ]
});