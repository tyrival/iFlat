Ext.define('iFlat.view.report.cst.nm.NmProjectCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-cst-nm-nmprojectcost',

    onRowClick: function(tree, record, tr, rowIndex, e, eOpts) {
        var id = record.get('projNo');
        if(id) {
            var store1 = this.lookupReference('rpt-cst-nm-nmprojectcost-barchart').getStore();
            store1.proxy.extraParams['nmProjectCost.projNo'] = id;
            store1.reload();
            var store2 = this.lookupReference('rpt-cst-nm-projectcost-pie1').getStore();
            store2.proxy.extraParams['nmProjectCostCmps.projNo'] = id;
            store2.reload();
        }
    },

    onBarSeriesTooltipRender: function (tooltip, record, item) {
        tooltip.setHtml(record.get('type') + ': ' + record.get('amountShort') + '万元');
    },

    pieRenderer: function(text, sprite, config, rendererData, index) {
        var pct = rendererData.store.getAt(index).get(rendererData.angleField);
        return text.substr(0, 3) + "(" + pct + "%)";

    },

    onSeriesTooltipRender: function (tooltip, record, item) {
        var key = item.field;
        key = key.substr(0, key.length - 3);
        tooltip.setHtml(record.get('name') + ': ' + record.get(key) + '元');
    },

    onPanelRendered: function(comp, eOpts) {
        var store1 = Ext.create('iFlat.store.report.cst.nm.NmProjectCost');
        var bar = this.lookupReference('rpt-cst-nm-nmprojectcost-barchart');
        var grid = Ext.getCmp('rpt-cst-nm-nmprojectcost-grid');
        bar.setStore(store1);
        grid.setStore(store1);
        var store2 = Ext.create('iFlat.store.report.cst.nm.NmProjectCostCmps');
        var pie1 = this.lookupReference('rpt-cst-nm-projectcost-pie1');
        var pie2 = this.lookupReference('rpt-cst-nm-projectcost-pie2');
        pie1.setStore(store2);
        pie2.setStore(store2);
    },
})