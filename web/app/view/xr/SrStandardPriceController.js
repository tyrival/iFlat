Ext.define('iFlat.view.xr.SrStandardPriceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.xr-srstandardprice',

    deleteSrStandardPrice: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('srStandardPrice.id');
        if(id == undefined || id == '') {
            xrSrStandardPriceStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'xr_deleteSrStandardPrice.action',
                        params: record.data,
                        succexr: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.succexr) {
                                xrSrStandardPriceStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        xrSrStandardPriceStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["srStandardPrice.id"];
        if(id == "") {
            xrSrStandardPriceStore.remove(context.record);
        }
    },

    updateSrStandardPriceRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'xr_saveSrStandardPrice.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                xrSrStandardPriceStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                xrSrStandardPriceStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addSrStandardPriceRecord: function() {
        xrSrStandardPriceRowEditing.cancelEdit();
        var srstandardprice = Ext.create('iFlat.model.xr.SrStandardPrice');
        xrSrStandardPriceStore.insert(0, srstandardprice);
        xrSrStandardPriceRowEditing.startEdit(0, 0);
    },
})