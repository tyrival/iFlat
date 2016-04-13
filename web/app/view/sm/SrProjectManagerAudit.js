Ext.define('iFlat.view.sm.SrProjectManagerAudit', {
    extend: 'iFlat.view.sm.temp.SrSettlementApprove',
    alias: 'widget.sm-srprojectmanageraudit',

    store: smSrProjectManagerAuditStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.status': '修船总管审核',
            }
        },
    }),

});
