Ext.define('iFlat.model.code.CardInfo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cardFixNo', mapping: 'cardFixNo', type: 'string'},
        {name: 'empNo', mapping: 'empNo', type: 'string'},
        {name: 'empName', mapping: 'empName', type: 'string'},
    ]
});