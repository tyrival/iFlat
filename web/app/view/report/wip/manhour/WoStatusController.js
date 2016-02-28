Ext.define('iFlat.view.report.wip.manhour.WoStatusController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-wip-manhour-wostatus',

    refresh: function() {
        rptWipManhourWoStatusComboStore.reload();
        rptWipManhourWoStatusGridStore.removeAll();
    },

    search: function(button) {
        var proj = Ext.getCmp('rpt-wip-manhour-wostatus-combo-projno').getValue();
        var type = Ext.getCmp('rpt-wip-manhour-wostatus-combo-type').getValue();
        if(!proj || proj == '' || !type || type == '') {
            Ext.Msg.show({
                title:'提示',
                message: '请先选择船名和派工单类型。',
            });
        } else {
            rptWipManhourWoStatusGridStore.getProxy().extraParams['woStatus.projNo'] = proj;
            rptWipManhourWoStatusGridStore.getProxy().extraParams['woStatus.type'] = type;
            var wono = Ext.getCmp('rpt-wip-manhour-wostatus-combo-wono').getValue();
            rptWipManhourWoStatusGridStore.getProxy().extraParams['woStatus.woNo'] = wono;
            rptWipManhourWoStatusGridStore.reload();
            toggleColumn(type);
        }

        function toggleColumn(type) {
            var complete = Ext.getCmp('rpt-wip-manhour-wostatus-hascomplete');
            var actual = Ext.getCmp('rpt-wip-manhour-wostatus-hasactual');
            var mrg = Ext.getCmp('rpt-wip-manhour-wostatus-mgrconfirm');
            switch (type) {
                case '结构':
                    complete.show();
                    actual.show();
                    mrg.hide();
                    break;
                case '工程':
                    complete.hide();
                    actual.hide();
                    mrg.show();
                    break;
                default:
                    complete.hide();
                    actual.hide();
                    mrg.hide();
                    break;
            }
        }
    },

    columnCreateTimeRenderer: function(value) {
        return Ext.Date.format(value, 'Y-m-d');
    },

    columnRenderer: function(v) {
        return v == 'true' ? '<span><i class="fa fa-check"></i></span>' : '';
    },

    exportToExcel: function(btn) {
        var grid = Ext.getCmp('rpt-wip-manhour-wostatus-grid');
        var t = '派工单状态';
        grid.saveDocumentAs({
            title: t,
            fileName: t + '.xls',
        })
    },

})