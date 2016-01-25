Ext.define('iFlat.model.bi.DeptCstCtrl', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'deptCstCtrl.id', mapping: 'id', type: 'string'},
        {name: 'deptCstCtrl.dept', mapping: 'dept', type: 'string'},
        {name: 'deptCstCtrl.type', mapping: 'type', type: 'string'},
        {name: 'deptCstCtrl.budget', mapping: 'budget', type: 'number' },
        {name: 'deptCstCtrl.actual', mapping: 'actual', type: 'number' },
        {name: 'deptCstCtrl.difference', mapping: 'difference', type: 'number' },
        {name: 'deptCstCtrl.diffPct',
            mapping: function (data) {
                return data.diffPct.toFixed(2);
            },
            type: 'number' },
        {name: 'deptCstCtrl.comment', mapping: 'comment', type: 'string'},
        {name: 'deptCstCtrl.month', mapping: 'month', type: 'date' },
        {name: 'deptCstCtrl.version', mapping: 'version', type: 'number' },
    ]
});
