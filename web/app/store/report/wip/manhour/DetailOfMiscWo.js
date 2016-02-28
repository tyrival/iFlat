Ext.define('iFlat.store.report.wip.manhour.DetailOfMiscWo', {
    extend: 'Ext.data.Store',

    model: 'iFlat.model.report.wip.manhour.DetailOfMiscWo',
    autoLoad: true,

    proxy: {
        type: 'ajax',
        url: 'report_detailOfMiscWo.action',
        reader: {
            type: 'json',
            rootProperty: 'list'
        }
    }
})