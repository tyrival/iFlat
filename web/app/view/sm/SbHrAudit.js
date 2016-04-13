Ext.define('iFlat.view.sm.SbHrAudit', {
    extend: 'iFlat.view.sm.temp.SbSettlementApprove',
    alias: 'widget.sm-sbhraudit',

    store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.status': '人力资源部结算员审核',
            }
        },
    }),

});
