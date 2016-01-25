Ext.define('iFlat.model.report.cst.sr.SrProjectCostCmps', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'projNo', mapping: 'projNo', type: 'string'},
        {name: 'name', mapping: 'name', type: 'string'},
        {name: 'target',
            mapping: function (data) {
                return data.target.toFixed(2);
            },
            type: 'number' },
        {name: 'actual',
            mapping: function (data) {
                return data.actual.toFixed(2);
            },
            type: 'number' },
        {name: 'targetPct',
            mapping: function (data) {
                return data.targetPct.toFixed(2);
            },
            type: 'number' },
        {name: 'actualPct',
            mapping: function (data) {
                return data.actualPct.toFixed(2);
            },
            type: 'number' },
        {name: 'difference',
            mapping: function (data) {
                return data.difference.toFixed(2);
            },
            type: 'number' },
        {name: 'diffPct',
            mapping: function (data) {
                return data.diffPct.toFixed(2) + '%';
            },
            type: 'string' },
    ]
});