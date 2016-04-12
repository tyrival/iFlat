Ext.define('iFlat.view.sm.SrSys', {
    extend: 'iFlat.view.sm.SrSettlement',
    alias: 'widget.sm-srsys',

    store: smSrSysStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.type': 'Sys',
            }
        },
    }),

});
