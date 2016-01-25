Ext.define('iFlat.model.bi.MajorMatQty', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'majorMatQty.id', mapping: 'id', type: 'string'},
        {name: 'majorMatQty.projNo', mapping: 'projNo', type: 'string'},
        {name: 'majorMatQty.type', mapping: 'type', type: 'string'},
        {name: 'majorMatQty.steel', mapping: 'steel', type: 'number'},
        {name: 'majorMatQty.steelPlate', mapping: 'steelPlate', type: 'number'},
        {name: 'majorMatQty.shapeSteel', mapping: 'shapeSteel', type: 'number'},
        {name: 'majorMatQty.otherSteel', mapping: 'otherSteel', type: 'number'},
        {name: 'majorMatQty.pipes', mapping: 'pipes', type: 'number'},
        {name: 'majorMatQty.steelPipe', mapping: 'steelPipe', type: 'number'},
        {name: 'majorMatQty.weldingMat', mapping: 'weldingMat', type: 'number'},
        {name: 'majorMatQty.weldingWire', mapping: 'weldingWire', type: 'number'},
        {name: 'majorMatQty.paint', mapping: 'paint', type: 'number'},
        {name: 'majorMatQty.importPaint', mapping: 'importPaint', type: 'number'},
        {name: 'majorMatQty.importThinner', mapping: 'importThinner', type: 'number'},
        {name: 'majorMatQty.cable', mapping: 'cable', type: 'number'},
        {name: 'majorMatQty.marineCable', mapping: 'marineCable', type: 'number'},
        {name: 'majorMatQty.month', mapping: 'month', type: 'date'},
        {name: 'majorMatQty.version', mapping: 'version', type: 'number'},
    ]
});