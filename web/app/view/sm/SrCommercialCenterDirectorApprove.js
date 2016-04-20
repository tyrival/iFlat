Ext.define('iFlat.view.sm.SrCommercialCenterDirectorApprove', {
    extend: 'iFlat.view.sm.temp.SrSettlementApprove',
    alias: 'widget.sm-srcommercialcenterdirectorapprove',

    store: smSrCommercialCenterDirectorApproveStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.status': '修船经营部领导审批',
            }
        },
    }),

});
