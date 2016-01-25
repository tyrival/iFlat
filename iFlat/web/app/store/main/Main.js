Ext.define('iFlat.store.main.Main', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
    },
    rootVisible: false,
    proxy: {
        type: 'ajax',
        url: 'system_getNavigationTree.action',
        reader: {
            type: 'json',
        }
    },

});