Ext.define('iFlat.store.report.mm.PaintMRP', {
    extend: 'Ext.data.Store',

    autoLoad: false,
    model: 'iFlat.model.report.mm.PaintMRP',

    pageSize: 0,
    proxy: {
        type: 'ajax',
        url: 'rpt_listPaintMRP.action',
        reader: {
            type: 'json',
            rootProperty: 'list',
        },
    },
});