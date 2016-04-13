Ext.define('iFlat.view.sm.SrProfessionalManagerAudit', {
    extend: 'iFlat.view.sm.temp.SrSettlementApprove',
    alias: 'widget.sm-srprofessionalmanageraudit',
    
    requires: [
        'iFlat.view.sm.SrProfessionalManagerAuditController'
    ],

    controller: 'sm-srprofessionalmanageraudit',

    store: smSrProfessionalManagerAuditStore = Ext.create('iFlat.store.sm.SrSettlement', {
        proxy: {
            extraParams: {
                'srSettlement.professionalMgrAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account'],
                'srSettlement.status': '修船主修审核',
            }
        },
    }),
});
