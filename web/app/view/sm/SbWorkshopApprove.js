Ext.define('iFlat.view.sm.SbWorkshopApprove', {
    extend: 'Ext.container.Container',
    alias: 'widget.sm-sbworkshopapprove',

    requires: [
        'iFlat.view.sm.SbSettlementTemplate',
        'iFlat.view.sm.SbWorkshopApproveController'
    ],

    layout: 'fit',
    controller: 'sm-sbworkshopapprove',

    items: [{
        xtype: 'sm-sbsettlementtemplate',
        store: smSbWorkshopApproveStore = Ext.create('iFlat.store.sm.SbSettlement', {
            proxy: {
                extraParams: {
                    'sbSettlement.deptName': Ext.getCmp('global-panel')
                        .getViewModel()
                        .get('user')['porgName'],
                    'sbSettlement.status': '车间审批',
                }
            },
        }),
        tbar: ['->', {
            text: '刷新',
            handler: 'refresh',
        }],
    }]

});
