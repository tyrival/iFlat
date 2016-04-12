Ext.define('iFlat.view.sm.SbWorkshopApprove', {
    extend: 'iFlat.view.sm.SbSettlementApprove',
    alias: 'widget.sm-sbworkshopapprove',

    store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
        proxy: {
            extraParams: {
                'sbSettlement.deptName': Ext.getCmp('global-panel')
                    .getViewModel().get('user')['porgName'],
                'sbSettlement.status': '车间审批',
            }
        },
    }),

});
