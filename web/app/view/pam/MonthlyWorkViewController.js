Ext.define('iFlat.view.pam.MonthlyWorkViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-monthlywork',

    refreshList: function() {
        pamMonthlyWorkViewStore.reload();
    },

    search: function () {
        var m = Ext.getCmp('pam-monthlyworkview-month').getValue();
        if (Flat.util.isEmpty(m)) {
            Ext.Msg.show({
                title:'提示',
                message: '请选择月份。',
            });
        } else {
            pamMonthlyWorkViewStore.getProxy().extraParams['monthlyWorkView.month'] = m;
            pamMonthlyWorkViewStore.reload();
        }
    },
    
    exportBatch: function(btn) {
        
        var grid = btn.up('grid');
        grid.saveDocumentAs({
            title: '月度工作提交情况',
            fileName: '月度工作提交情况.xls',
        })
    }
})