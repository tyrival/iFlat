Ext.define('iFlat.view.sm.SbBusinessDivisionAudit', {
    extend: 'iFlat.view.sm.temp.SbSettlementApprove',
    alias: 'widget.sm-sbbusinessdivisionaudit',

    store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.status': '事业部结算员审核',
            }
        },
    }),

});
