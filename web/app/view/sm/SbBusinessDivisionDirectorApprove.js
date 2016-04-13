Ext.define('iFlat.view.sm.SbBusinessDivisionDirectorApprove', {
    extend: 'iFlat.view.sm.temp.SbSettlementApprove',
    alias: 'widget.sm-sbbusinessdivisiondirectorapprove',

    store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.status': '事业部审批',
            }
        },
    }),

});