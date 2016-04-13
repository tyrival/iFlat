Ext.define('iFlat.view.sm.SrBusinessDivisionDirectorApprove', {
    extend: 'iFlat.view.sm.temp.SrSettlementApprove',
    alias: 'widget.sm-srbusinessdivisiondirectorapprove',

    store: smSrBusinessDivisionDirectorApproveStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.status': '修船事业部部长审批',
            }
        },
    }),

});
