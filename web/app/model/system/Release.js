Ext.define('iFlat.model.system.Release', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'release.id', mapping: 'id', type: 'string'},
        {name: 'release.title', mapping: 'title', type: 'string'},
        {name: 'release.description', mapping: 'description', type: 'string'},
        {name: 'release.createTime', mapping: 'createTime', type: 'date'},
    ]
});