Ext.define('iFlat.view.sm.ScBusinessDivisionDirectorApprove', {
    extend: 'iFlat.view.sm.temp.ScSettlementApprove',
    alias: 'widget.sm-scbusinessdivisiondirectorapprove',

    store: smScWorkshopApproveStore = Ext.create('iFlat.store.sm.ScSettlement', {
        proxy: {
            extraParams: {
                'scSettlement.status': '钢结构事业部部长审批',
            }
        },
    }),

});