Ext.define('iFlat.view.report.complex.BiController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rpt-complex-bi',

    addSubPanel: function (btn) {
        var text = btn.text;
        var name = btn.value;

        var tabId = 'rpt-complex-bi-tab-' + name.toLowerCase();
        var tabPanel = Ext.getCmp('rpt-complex-bi-tabpanel');
        var tabList = tabPanel.items.keys;
        var hasExisted = false;
        for(var i = 0; i < tabList.length; i++) {
            if(tabId == tabList[i]) {
                hasExisted = true;
            }
        };
        var item;
        if(!hasExisted) {
            var viewName = 'iFlat.view.report.complex.bi.' + name;
            item = Ext.create(viewName, {
                title: text,
                itemId: tabId,
                closable: true,
            });
            tabPanel.add(item);
        };
        tabPanel.getLayout().setActiveItem(tabId);
    },

    activateTab: function (tabPanel, newCard, oldCard, eOpts) {
        newCard.fireEvent('render');
    },

    selectionChange: function (combo, newValue, oldValue, eOpts) {
        var tab = Ext.getCmp('rpt-complex-bi-tabpanel').getActiveTab();
        tab.fireEvent('render');
    },

    openAll: function (btn) {
        var tabPanel = Ext.getCmp('rpt-complex-bi-tabpanel');
        var tabList = tabPanel.items.keys;
        var arr = Ext.getCmp('rpt-complex-bi-btn').getMenu().items.items;
        for(var i = 2; i < arr.length; i++) {
            var name = arr[i].value;
            var text = arr[i].text;
            var tabId = 'rpt-complex-bi-tab-' + name.toLowerCase();
            var hasExisted = false;
            for(var i = 0; i < tabList.length; i++) {
                if(tabId == tabList[i]) {
                    hasExisted = true;
                }
            };
            var item;
            if(!hasExisted) {
                var viewName = 'iFlat.view.report.complex.bi.' + name;
                item = Ext.create(viewName, {
                    title: text,
                    itemId: tabId,
                    closable: true,
                });
                tabPanel.add(item);
            };
            tabPanel.getLayout().setActiveItem(tabId);
        }
    }
})