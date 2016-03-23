Ext.define('iFlat.view.system.ModuleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-module',

    //实例化ModuleEdit窗口，但不显示
    instantiateModuleEdit: function(grid, layout, eOpts) {
        var win = Ext.create('iFlat.view.system.ModuleEdit');
        var tv = Ext.create('iFlat.view.system.TableViewEdit');
    },
    //销毁ModuleEdit窗口
    destroyModuleEdit: function(panel, eOpts) {
        Ext.getCmp('system-moduleedit').destroy();
    },
    //新增时，弹出窗口
    showModuleAdd: function() {
        var record = Ext.create('iFlat.model.system.Module', {
            'module.status': true,
        });
        var win = Ext.getCmp('system-moduleedit');
        win.down('form').loadRecord(record);
        win.show();
    },

    refreshModuleStore: function() {
        Ext.getCmp('system-module').getStore().reload();
        Ext.getCmp('system-moduleedit-select').getStore().reload();
    },

    //编辑窗口弹出时，加载父节点combobox初始值
    initComboboxValue: function(window, eOpts) {
        var store = Ext.getCmp('system-moduleedit-select').getStore();
        //在选项中去除当前打开的对象，禁止选择自身为父节点
        store.remove(store.findRecord('module.nodeId', Ext.getCmp('system-moduleedit-nodeid').getValue()));
        //将combobox值默认选中当前父节点
        var value = Ext.getCmp('system-moduleedit-pid').getValue();
        if(value == '') {
            value = '00000000-0000-0000-0000-000000000000';
            Ext.getCmp('system-moduleedit-pid').setValue(value);
        };
        Ext.getCmp('system-moduleedit-select').setValue(value);
    },

    //父节点combobox修改时，将父节点id存储字段的值随之更改
    transmitValueToTextField: function(combo, newValue, oldValue, eOpts) {
        Ext.getCmp('system-moduleedit-pid').setValue(newValue);
    },

    //编辑完成后提交数据
    submitModuleEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_saveModule.action',
            success: function(form, action) {
                win.hide();
                sysModuleStore.reload();
                sysModuleEditStore.reload();
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            }
        });

    },
    //重置ModuleEdit下拉菜单选项
    resetEditForm: function(panel, eOpts) {
        Ext.getCmp('system-moduleedit-form').loadRecord(Ext.create('iFlat.model.system.ModuleEdit'));
        var store = Ext.getCmp('system-moduleedit-select').getStore();
        store.reload();
    },
    //启用/禁用模块
    changeModuleStatus: function(column, rowIndex, checked, eOpts) {
        var id = Ext.getCmp('system-module').getStore().getData().items[rowIndex].data.nodeId;
        Ext.Ajax.request({
            url: 'system_active·Module.action?module.nodeId=' + id + '&module.status=' + checked,
            success: function(response, opts) {
                //赋值给main-view-popmessage，弹出提示窗
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        })
    },

    showModuleEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('system-moduleedit');
        win.down('form').loadRecord(record);
        win.show();
    },

    //删除模块
    deleteModule: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","确定要删除该节点吗?",function(btn) {
            if(btn=="yes") {
                var id = grid.getStore().getData().items[rowIndex].data.nodeId;
                Ext.Ajax.request({
                    url: 'system_deleteModule.action?module.nodeId=' + id,
                    method: 'get',
                    success: function(response, opts) {
                        //赋值给main-view-popmessage，弹出提示窗
                        Flat.util.tip(response.responseText);
                        Ext.getCmp('system-module').getStore().reload();
                        Ext.getCmp('system-module-edit').getStore().reload();
                    },
                    failure: function(response, opts) {
                        Flat.util.tip(response.responseText);
                        Ext.getCmp('system-module').getStore().reload();
                        Ext.getCmp('system-module-edit').getStore().reload();
                    }
                })
            };
        })
    },

    showTableViewEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var data = grid.getStore().getData().items[rowIndex].data;
        sysTableViewEditStore.getProxy().extraParams['tableView.nameSpace'] = data['nameSpace'];
        sysTableViewEditStore.getProxy().extraParams['tableView.moduleName'] = data['moduleName'];
        sysTableViewEditStore.reload();
        var win = Ext.getCmp('system-tableviewedit');
        win.down('form').loadRecord(record);
        win.show();
    },

    resetGridValue: function(win, eOpts) {
        sysTableViewEditStore.getProxy().extraParams['tableView.nameSpace'] = '';
        sysTableViewEditStore.getProxy().extraParams['tableView.moduleName'] = '';
        sysTableViewEditStore.removeAll();
    },

    addTableViewRecord: function() {
        sysTableViewRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.system.TableViewEdit', {
            'tableView.nameSpace': Ext.getCmp('system-tableviewedit-namespace').getValue(),
            'tableView.moduleName': Ext.getCmp('system-tableviewedit-modulename').getValue(),
        });
        sysTableViewEditStore.insert(0, r);
        sysTableViewRowEditing.startEdit(0, 0);
    },

    cancelTableViewEdit: function(editor, context, eOpts) {
        var id = context.record.data["tableView.tvId"];
        if(id == "") {
            sysTableViewEditStore.remove(context.record);
        }
    },

    deleteTableView: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['tableView.tvId'];
        if(id == undefined || id == '') {
            sysTableViewEditStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该表/视图吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'system_deleteTableView.action?tableView.tvId=' + id,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                sysTableViewEditStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    updateTableViewRecord: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'system_saveTableView.action',
            method: 'post',
            params: record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    sysTableViewEditStore.remove(record);
                }
                if(result['object']) {
                    record.set('tableView.tvId', result['object']['tvId']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    deleteEmptyOp: function(editor, context, eOpts) {
        var id = context.record.data["operating.opId"];
        if(id == "") {
            sysOperatingEditStore.remove(context.record);
        }
    },

    saveOperating: function(editor, context, eOpts) {
        var record = context.record;
        Ext.Ajax.request({
            url: 'system_saveOperating.action',
            method: 'post',
            params: record.data,
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
                var result = Ext.JSON.decode(response.responseText);
                if(!result['success']) {
                    sysOperatingEditStore.remove(record);
                }
                if(result['object']) {
                    record.set('operating.opId', result['object']['opId']);
                }
            },
            failure: function(response, opts) {
                Flat.util.tip(response.responseText);
            }
        });
    },

    addOpRecord: function() {
        sysOperatingRowEditing.cancelEdit();
        var nameSpace = Ext.getCmp('system-operating-namespace').getValue();
        var moduleName = Ext.getCmp('system-operating-modulename').getValue();
        var r = Ext.create('iFlat.model.system.Operating', {
            'operating.nameSpace': nameSpace,
            'operating.moduleName': moduleName,
        });
        sysOperatingEditStore.insert(0, r);
        sysOperatingRowEditing.startEdit(0, 0);
    },

    refreshList: function() {
        sysOperatingRowEditing.cancelEdit();
        sysOperatingEditStore.reload();
    },

    showOperatingEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('system-operating');
        if(!win) {
            win = Ext.create('iFlat.view.system.OperatingEdit');
        }
        win.down('form').loadRecord(record);
        var data = grid.getStore().getData().items[rowIndex].data;
        sysOperatingEditStore.getProxy().extraParams['operating.nameSpace'] = data['nameSpace'];
        sysOperatingEditStore.getProxy().extraParams['operating.moduleName'] = data['moduleName'];
        sysOperatingEditStore.reload();
        win.show();
    },

    clearOperatingGrid: function() {
        sysOperatingEditStore.getProxy().extraParams['operating.nameSpace'] = '';
        sysOperatingEditStore.getProxy().extraParams['operating.moduleName'] = '';
        sysOperatingEditStore.removeAll();
    },

    deleteOperating: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        Ext.Msg.confirm("提示!","确定要删除该操作吗?",function(btn) {
            if(btn=="yes") {
                var id = record.data['operating.opId'];
                Ext.Ajax.request({
                    url: 'system_deleteOperating.action?operating.opId=' + id,
                    success: function(response, opts) {
                        var data = Ext.JSON.decode(response.responseText);
                        if(data.success) {
                            sysOperatingEditStore.remove(record);
                        }
                        Flat.util.tip(response.responseText);
                    },
                })
            };
        })
    },
});
