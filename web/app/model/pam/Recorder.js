Ext.define('iFlat.model.pam.Recorder', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'recorder.id', mapping: 'id', type: 'string'},
        {name: 'recorder.pbName', mapping: 'pbName', type: 'string'},
        {name: 'recorder.name', mapping: 'name', type: 'string'},
        {name: 'recorder.account', mapping: 'account', type: 'string'},
    ]
});
