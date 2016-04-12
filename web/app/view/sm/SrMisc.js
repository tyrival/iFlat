Ext.define('iFlat.view.sm.SrMisc', {
    extend: 'iFlat.view.sm.SrSettlement',
    alias: 'widget.sm-srmisc',

    store: smSrMiscStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.type': 'Misc',
            }
        },
    }),

});
