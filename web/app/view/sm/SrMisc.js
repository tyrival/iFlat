Ext.define('iFlat.view.sm.SrMisc', {
    extend: 'iFlat.view.sm.temp.SrSettlement',
    alias: 'widget.sm-srmisc',

    store: smSrMiscStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.type': 'Misc',
                'srSettlement.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        },
    }),

});
