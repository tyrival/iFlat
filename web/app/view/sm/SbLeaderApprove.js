Ext.define('iFlat.view.sm.SbLeaderApprove', {
    extend: 'iFlat.view.sm.SbSettlementApprove',
    alias: 'widget.sm-sbleaderapprove',

    store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.status': '公司领导审批',
            }
        },
    }),

});
