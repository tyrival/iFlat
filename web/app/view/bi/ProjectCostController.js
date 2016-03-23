Ext.define('iFlat.view.bi.ProjectCostController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.bi-projectcost',

    deleteProjectCost: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['projectCost.id'];
        if(id == undefined || id == '') {
            biProjectCostStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'bi_deleteProjectCost.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                biProjectCostStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        biProjectCostStore.reload();
        if(Ext.getCmp('bi-projectcostedit')) {
            biProjectCostEditComboStore.reload();
        }
    },

    submitEditWindow: function(button) {
        var win = button.up('window');
        var text = win.title;
        var bean;
        debugger;
        switch(text)
        {
            case '主要设备费':
                bean = 'MajorDevCst';
                break;
            case '主材费':
                bean = 'MajorMatCst';
                break;
            case '主材用量':
                bean = 'MajorMatQty';
                break;
            default:
                bean = 'ProjectCost';
        }
        var form = win.down('#bi-' + bean.toLowerCase() + 'edit-form');
        form.submit({
            url :'bi_save' + bean + '.action',
            success: function(form, action) {
                win.hide();
                if(bean == 'ProjectCost') {
                    biProjectCostStore.reload();
                }
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });

    },

    showEditWindow: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var type,projNo,month,text,bean,name,prop;
        if(record) {
            type = record.get('type');
            projNo = record.get('projNo');
            month = record.get('month');
        }
        if(actionItem) {
            text = actionItem.text;
        } else {
            text = '总成本';
        }
        if(text == '总成本') {
            bean = 'ProjectCost';
            name = bean.toLowerCase();
            showWindow(name, bean, record, projNo, type, month);
        } else {
            if(text == '主要设备费') {
                bean = 'MajorDevCst';
            }
            if(text == '主材费') {
                bean = 'MajorMatCst';
            }
            if(text == '主材用量') {
                bean = 'MajorMatQty';
                if (type == '报价') {
                    type = '设计';
                }
                if (type == '目标') {
                    type = '订货';
                }
            }
            name = bean.toLowerCase();
            prop = bean.replace(/(\w)/,function(v){return v.toLowerCase()});
            var store = Ext.create('iFlat.store.bi.' + bean);
            store.proxy.extraParams[prop + '.projNo'] = projNo;
            store.proxy.extraParams[prop + '.type'] = type;
            store.reload({
                callback: function(records, option, success) {
                    showWindow(name, bean, records[0], projNo, type, month)
                }
            });
        }

        function showWindow(name, bean, record, projNo, type, month) {
            debugger
            var win = Ext.getCmp('bi-' + name + 'edit');
            if(!win) {
                win = Ext.create('iFlat.view.bi.' + bean + 'Edit');
            }
            if(!record) {
                record = Ext.create('iFlat.model.bi.' + bean);
                record.set(prop + '.month', month);
                record.set(prop + '.projNo', projNo);
                record.set(prop + '.type', type);
                record.set(prop + '.version', 1);
            }
            win.down('#bi-' + name + 'edit-form').loadRecord(record);
            win.show();
        }
    },

    uploadFile: function(btn) {
        var win = btn.up('window');
        if(win) {
            var id = win.getId();
            id = id + "-import";
            var form = Ext.getCmp(id);
            if (form.isValid()) {
                var m;
                switch (id) {
                    case 'bi-projectcostedit-import':
                        m = 'ProjectCost';
                        break;
                    case 'bi-majordevcstedit-import':
                        m = 'MajorDevCst';
                        break;
                    case 'bi-majormatcstedit-import':
                        m = 'MajorMatCst';
                        break;
                    case 'bi-majormatqtyedit-import':
                        m = 'MajorMatQty';
                        break;
                    default:
                        break;
                }
                if(m) {
                    form.submit({
                        url: 'bi_import' + m + '.action',
                        method: 'POST',
                        waitMsg: '正在导入......',
                        success: function (fp, o) {
                            biProjectCostStore.reload();
                            Flat.util.tip(o.response.responseText);
                        },
                        failure: function (fp, o) {
                            Flat.util.tip(o.response.responseText);
                        }
                    })
                }
            }
        }
    },

    downloadTemplate: function(btn) {
        debugger
        var win = btn.up('window');
        if(win) {
            var m;
            switch (win.title) {
                case '单船总成本':
                    m = 'ProjectCost';
                    break;
                case '主要设备费':
                    m = 'MajorDevCst';
                    break;
                case '主材费':
                    m = 'MajorMatCst';
                    break;
                case '主材用量':
                    m = 'MajorMatQty';
                    break;
            }
            Ext.Ajax.request({
                url: 'bi_template' + m + '.action',
                method: 'post',
                success: function(response, opts) {
                    window.location.href = Ext.JSON.decode(response.responseText)['object'];
                },
            });
        }
    },

    renderer: function(value, metaData) {
        value = Flat.financeFormat(value,2);
        return value;
    },
})