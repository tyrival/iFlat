Ext.define('iFlat.view.sm.SrProfessionalManagerController', {
    extend: 'iFlat.view.sm.temp.SrSettlementApproveController',
    alias: 'controller.sm-srprofessionalmanager',

    // 弹出自定义的编辑窗口
    info: function (grid, rowIndex, colIndex, item, e, record, row) {
        var win = Ext.getCmp('sm-srsettlementapproveinfo');
        if (!win) {
            win = Ext.create('iFlat.view.sm.temp.SrSettlementApproveInfo');
        }
        var form = win.down('form');
        form.loadRecord(record);
        win.show();
    },

    
})