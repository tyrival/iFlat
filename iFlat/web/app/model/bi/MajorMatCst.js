Ext.define('iFlat.model.bi.MajorMatCst', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'majorMatCst.id', mapping: 'id', type: 'string'},
        {name: 'majorMatCst.projNo', mapping: 'projNo', type: 'string'},
        {name: 'majorMatCst.type', mapping: 'type', type: 'string'},
        {name: 'majorMatCst.summary', mapping: 'summary', type: 'number'},
        {name: 'majorMatCst.steel', mapping: 'steel', type: 'number'},
        {name: 'majorMatCst.pipes', mapping: 'pipes', type: 'number'},
        {name: 'majorMatCst.weldingMat', mapping: 'weldingMat', type: 'number'},
        {name: 'majorMatCst.paint', mapping: 'paint', type: 'number'},
        {name: 'majorMatCst.cable', mapping: 'cable', type: 'number'},
        {name: 'majorMatCst.oil', mapping: 'oil', type: 'number'},
        {name: 'majorMatCst.month', mapping: 'month', type: 'date'},
        {name: 'majorMatCst.version', mapping: 'version', type: 'number'},
    ]
});