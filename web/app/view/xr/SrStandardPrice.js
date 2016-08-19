Ext.define('iFlat.view.xr.SrStandardPrice', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.xr-srstandardprice',
    xtype: 'xr-srstandardprice',

    requires: [
        'iFlat.view.xr.SrStandardPriceController',
    ],

    controller: 'xr-srstandardprice',
    store: xrSrStandardPriceStore = Ext.create('iFlat.store.xr.SrStandardPrice'),
    id: 'xr-srstandardprice',

    plugins: [
        xrSrStandardPriceRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            pluginId: 'xr-srstandardprice-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateSrStandardPriceRecord',
                cancelEdit: 'deleteEmptyRecord',
            }
        })
    ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        overflowHandler: 'scroller',
        items: [{
            text: '新增',
            ui: 'orig-blue',
            handler: 'addSrStandardPriceRecord',
        }, '->', {
            text: '刷新',
            handler: 'refreshList',
        }],
    }],

    columns: [{
        header: '代码',
        dataIndex: 'srStandardPrice.code',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '分类',
        dataIndex: 'srStandardPrice.category',
        flex: 1,
        editor: {
        }
    }, {
        header: '施工内容',
        dataIndex: 'srStandardPrice.content',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '规格',
        dataIndex: 'srStandardPrice.specs',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '单位',
        dataIndex: 'srStandardPrice.unit',
        flex: 1,
        editor: {
            allowBlank: false,
        }
    }, {
        header: '默认难度系数',
        dataIndex: 'srStandardPrice.degree',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    },  {
        xtype: 'checkcolumn',
        header: '需定额',
        dataIndex: 'srStandardPrice.isQuota',
        flex: 1,
        disabled: true,
        editor: {
            xtype: 'checkbox',
        }
    }, {
        header: '默认定额',
        dataIndex: 'srStandardPrice.quota',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        header: '默认单价',
        dataIndex: 'srStandardPrice.price',
        flex: 1,
        editor: {
            allowBlank: false,
            regex: /^[+]?([0-9]*\.?[0-9]+|[0-9]+\.?[0-9]*)([eE][+-]?[0-9]+)?$/,
        }
    }, {
        text: '删除',
        width: 60,
        menuDisabled: true,
        xtype: 'actioncolumn',
        tooltip: '删除',
        align: 'center',
        iconCls: 'x-fa fa-close',
        handler: 'deleteSrStandardPrice',
        editor: {
            xtype: 'label',
        }
    }],
});