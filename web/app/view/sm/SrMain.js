Ext.define('iFlat.view.sm.SrMain', {
    extend: 'iFlat.view.sm.temp.SrSettlement',
    alias: 'widget.sm-srmain',

    store: smSrMainStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.type': 'Main',
                'srSettlement.creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']
            }
        },
    }),

});