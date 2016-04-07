Ext.define('iFlat.view.sm.SbHrDirectorApprove', {
    extend: 'iFlat.view.sm.SbSettlementTemplate',
    alias: 'widget.sm-sbhrdirectorapprove',

    store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.status': '人力资源部审批',
            }
        },
    }),

});
