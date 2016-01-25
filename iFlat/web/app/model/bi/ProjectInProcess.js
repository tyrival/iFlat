Ext.define('iFlat.model.bi.ProjectInProcess', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projectInProcess.id', mapping: 'id', type: 'string'},
        {name: 'projectInProcess.projNo', mapping: 'projNo', type: 'string'},
        {name: 'projectInProcess.type', mapping: 'type', type: 'string'},
        {name: 'projectInProcess.target', mapping: 'target', type: 'number' },
        {name: 'projectInProcess.actual', mapping: 'actual', type: 'number' },
        {name: 'projectInProcess.difference', mapping: 'difference', type: 'number' },
        {name: 'projectInProcess.diffPct',
            mapping: function (data) {
                return data.diffPct.toFixed(2);
            },
            type: 'number' },
        {name: 'projectInProcess.month', mapping: 'month', type: 'date' },
        {name: 'projectInProcess.version', mapping: 'version', type: 'number' },
    ]
});
