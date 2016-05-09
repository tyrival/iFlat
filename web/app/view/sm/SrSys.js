Ext.define('iFlat.view.sm.SrSys', {
    extend: 'iFlat.view.sm.temp.SrSettlement',
    alias: 'widget.sm-srsys',

    store: smSrSysStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.type': 'Sys',
                'srSettlement.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        },
    }),

});
