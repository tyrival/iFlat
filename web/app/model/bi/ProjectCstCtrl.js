Ext.define('iFlat.model.bi.ProjectCstCtrl', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'projectCstCtrl.id', mapping: 'id', type: 'string'},
        {name: 'projectCstCtrl.projNo', mapping: 'projNo', type: 'string'},
        {name: 'projectCstCtrl.type', mapping: 'type', type: 'string'},
        {name: 'projectCstCtrl.dept', mapping: 'dept', type: 'string'},
        {name: 'projectCstCtrl.target', mapping: 'target', type: 'number' },
        {name: 'projectCstCtrl.actual', mapping: 'actual', type: 'number' },
        {name: 'projectCstCtrl.difference', mapping: 'difference', type: 'number' },
        {name: 'projectCstCtrl.diffPct',
            mapping: function (data) {
                return data.diffPct.toFixed(2);
            },
            type: 'number' },
        {name: 'projectCstCtrl.comment', mapping: 'comment', type: 'string' },
        {name: 'projectCstCtrl.month', mapping: 'month', type: 'date' },
        {name: 'projectCstCtrl.version', mapping: 'version', type: 'number' },
    ]
});
