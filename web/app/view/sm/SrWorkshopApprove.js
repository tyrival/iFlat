Ext.define('iFlat.view.sm.SrWorkshopApprove', {
    extend: 'iFlat.view.sm.temp.SrSettlementApprove',
    alias: 'widget.sm-srworkshopapprove',

    store: smSrWorkshopApproveStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.status': '修船车间领导审批',
            }
        },
    }),

});
