Ext.define('iFlat.model.sm.SrProjectManager', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'srProjectManager.id', mapping: 'id', type: 'string'},
        {name: 'srProjectManager.projNo', mapping: 'projNo', type: 'string'},
        {name: 'srProjectManager.projName', mapping: 'projName', type: 'string'},
        {name: 'srProjectManager.account', mapping: 'account', type: 'string'},
        {name: 'srProjectManager.name', mapping: 'name', type: 'string'},
    ]
});