Ext.define('iFlat.view.system.AuthorityController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-authority',

    changeAdStatus: function(checkbox, newValue, oldValue, eOpts) {
        if(Ext.getCmp('system-authdataedit').isVisible()) {
            var amId = Ext.getCmp('system-authdataedit-form-amid').getValue();
            var record = sysAuthorityModuleStore.findRecord('amId', amId);
            Ext.Ajax.request({
                url: 'system_saveAuthModule.action?',
                params: {
                    'authModule.amId': amId,
                    'authModule.amStatus': record.get('amStatus'),
                    'authModule.aoStatus': record.get('aoStatus'),
                    'authModule.adStatus': newValue,
                },
                success: function(response, opts) {
                    var data = Ext.JSON.decode(response.responseText);
                    if(data.success){
                        record.set('adStatus',newValue);
                    }
                    Flat.util.tip(response.responseText);
                },
            })
        }
    },

    changeAuthModuleStatus: function(column, rowIndex, checked, eOpts) {
        var data = sysAuthorityModuleStore.getData().items[rowIndex];
        var map = sysAuthorityModuleStore.byIdMap;
        var key = data.get('nameSpace') + '@' + data.get('moduleName');
        var model = map[key];
        //子节点就判断是否已选择了用户或角色
        if(model.get('roleId') == "") {
            //未选择用户或角色时，不操作
            model.set('amStatus',false);
            Ext.Msg.show({
                title:'警告',
                message: '请先选择一个角色或用户。',
            });
        } else {
            //修改自身节点
            model.set('amStatus', checked);
            childNodeHandler(data);
            parentNodeHandler(model);
        }
        /**
         * 递归处理子节点
         * 所有子节点与当前节点状态同步
         */
        function childNodeHandler(node) {
            if(node.childNodes.length != 0) {
                for(var i = 0; i < node.childNodes.length; i++) {
                    var childKey = node.childNodes[i].get('nameSpace') + '@' + node.childNodes[i].get('moduleName');
                    map[childKey].set('amStatus', checked);
                    childNodeHandler(node.childNodes[i]);
                }
            }
        }
        /**
         * 递归处理父节点
         * 如果兄弟节点中，所有节点都为非，则父节点置为非；
         * 如果有一个为是，则父节点置为是
         */
        function parentNodeHandler(node) {
            if(node.parentNode != null) {
                var flag = false;
                for(var i = 0; i < node.parentNode.childNodes.length; i++) {
                    flag = node.parentNode.childNodes[i].get('amStatus') || flag;
                }
                var parentKey = node.parentNode.parentNode != null ? node.parentNode.get('nameSpace') + '@' + node.parentNode.get('moduleName') : node.parentNode.id;
                map[parentKey].set('amStatus', flag);

                parentNodeHandler(node.parentNode);
            }
        }
    },

    showUserRoleAuthority: function(tree, node) {
        var roleId = node[0].get('parentId') == "root" ? node[0].get('id') : node[0].get('parentId');
        var account = node[0].get('parentId') == "root" ? "" : node[0].get('id');
        //重置所有节点状态
        for(var key in sysAuthorityModuleStore.byIdMap) {
            sysAuthorityModuleStore.byIdMap[key].set('amId', "")
            sysAuthorityModuleStore.byIdMap[key].set('roleId', roleId)
            sysAuthorityModuleStore.byIdMap[key].set('account', account)
            sysAuthorityModuleStore.byIdMap[key].set('amStatus', false)
            sysAuthorityModuleStore.byIdMap[key].set('aoStatus', false)
            sysAuthorityModuleStore.byIdMap[key].set('adStatus', false)
        }
        //获取权限并修改节点状态
        Ext.Ajax.request({
            url: 'system_listAuthModule.action?authModule.roleId=' + roleId + '&authModule.account=' + account,
            success: function(response, opts) {
                var data = Ext.JSON.decode(response.responseText);
                if(data.success){
                    //遍历list，将所有用户的权限依次赋值给sysAuthorityModuleStore中的状态
                    var list = data.list;
                    for(var i = 0; i < list.length; i++) {
                        var id = list[i].nameSpace + "@" + list[i].moduleName;
                        var amStatus = list[i].amStatus;
                        sysAuthorityModuleStore.byIdMap[id].set('amStatus',list[i].amStatus);
                        sysAuthorityModuleStore.byIdMap[id].set('aoStatus',list[i].aoStatus);
                        sysAuthorityModuleStore.byIdMap[id].set('adStatus',list[i].adStatus);
                        sysAuthorityModuleStore.byIdMap[id].set('amId',list[i].amId);
                    }
                } else {
                    Flat.util.tip(response.responseText);
                }
            },
        })
    },

    refreshPage: function() {
        sysAuthorityURTreeStore.reload();
        sysAuthorityModuleStore.reload();
        if(typeof(sysAuthDuplicateURTreeStore) != "undefined") {
            sysAuthDuplicateURTreeStore.reload();
        }
        if(typeof(sysAuthDuplicateModuleStore) != "undefined") {
            sysAuthDuplicateModuleStore.reload();
        }
        if(typeof(sysAuthClearModuleStore) != "undefined") {
            sysAuthClearModuleStore.reload();
        }
    },

    saveAuthModule: function() {
        sysAuthorityModuleStore.sync({
            callback: function(batch, options) {
                Flat.util.tip(batch.getOperations()[0].getResponse().responseText);
            }
        });
    },

    showAuthEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        //判断是否已选择用户/角色
        if(record.get('roleId') == "") {
            Ext.Msg.show({
                title:'提醒',
                message: '请先选择角色/用户。',
            });
            return false;
        }
        //判断是否存在该角色/用户的模块权限，如不存在，则新增
        if(record.get('amId') == "") {
            Ext.Ajax.request({
                url: 'system_saveAuthModule.action?',
                params: {
                    'authModule.roleId': record.get('roleId'),
                    'authModule.account': record.get('account'),
                    'authModule.nameSpace': record.get('nameSpace'),
                    'authModule.moduleName': record.get('moduleName'),
                    'authModule.amStatus': record.get('amStatus'),
                    'authModule.aoStatus': false,
                    'authModule.adStatus': false,
                },
                success: function(response, opts) {
                    //创建成功则更新store的对应record，并弹出窗口显示数据，不成功则报提示
                    var data = Ext.JSON.decode(response.responseText);
                    if(data.success){
                        record.set('amId', data.object.amId);
                        if(actionItem.text == '操作权限') {
                            showAuthOperatingModal();
                        }
                        if(actionItem.text == '数据权限') {
                            showAuthDataModal();
                        }
                    } else {
                        Flat.util.tip(response.responseText);
                    }
                },
            })
        } else {
            if(actionItem.text == '操作权限') {
                showAuthOperatingModal();
            }
            if(actionItem.text == '数据权限') {
                showAuthDataModal();
            }
        }
        function showAuthOperatingModal() {
            var win = Ext.getCmp('system-authoperatingedit');
            if(!win) {
                win = Ext.create('iFlat.view.system.AuthOperatingEdit');
            }
            win.down('form').loadRecord(record);
            sysAuthorityOperatingStore.getProxy().getExtraParams()['authOperatingVo.nameSpace'] = record.get('nameSpace');
            sysAuthorityOperatingStore.getProxy().getExtraParams()['authOperatingVo.moduleName'] = record.get('moduleName');
            sysAuthorityOperatingStore.getProxy().getExtraParams()['authOperatingVo.roleId'] = record.get('roleId');
            sysAuthorityOperatingStore.getProxy().getExtraParams()['authOperatingVo.account'] = record.get('account');
            //更新选中模块的操作清单
            sysAuthorityOperatingStore.reload();
            win.show();
        }

        function showAuthDataModal() {
            var win = Ext.getCmp('system-authdataedit');
            if(!win) {
                win = Ext.create('iFlat.view.system.AuthDataEdit');
            }
            sysAuthDataTableListStore.getProxy().getExtraParams()['tableView.nameSpace'] = record.get('nameSpace');
            sysAuthDataTableListStore.getProxy().getExtraParams()['tableView.moduleName'] = record.get('moduleName');
            sysAuthDataTableListStore.reload();
            win.down('form').loadRecord(record);
            win.show();
        }
    },

    submitAuthOperating: function (button) {
        sysAuthorityOperatingStore.sync({
            callback: function(batch, options) {
                Flat.util.tip(batch.getOperations()[0].getResponse().responseText);
            }
        });
        var win = button.up('window');
        var amId = Ext.getCmp('system-authoperatingedit-form-amid').getValue();
        var record = sysAuthorityModuleStore.findRecord('amId', amId);
        var aoStatus = Ext.getCmp('system-authoperatingedit-form-aostatus').getValue();
        Ext.Ajax.request({
            url: 'system_saveAuthModule.action?',
            params: {
                'authModule.amId': amId,
                'authModule.aoStatus': aoStatus,
                'authModule.amStatus': record.get('amStatus'),
                'authModule.adStatus': record.get('adStatus'),
            },
            success: function(response, opts) {
                var data = Ext.JSON.decode(response.responseText);
                if(data.success){
                    record.set('aoStatus',aoStatus);
                    win.hide();
                } else {
                    Flat.util.tip(response.responseText);
                }
            },
        })
    },

    loadTableList: function(textfield, newValue, oldValue, eOpts) {
        sysAuthDataTableListStore.removeAll();
        var array = newValue.split(",");
        for(var i = 0; i < array.length; i++) {
            var record = Ext.create('iFlat.model.system.AuthDataTable', {
                'tableName': array[i],
            });
            sysAuthDataTableListStore.add(record);
        }
    },

    loadFieldAndFilter: function(gridpanel, selected, eOpts) {
        sysAuthDataFieldList.getProxy().extraParams['authData.dbInstance'] = selected.length != 0 ? selected[0].get('dbInstance') : "";
        sysAuthDataFieldList.getProxy().extraParams['authData.dbName'] = selected.length != 0 ? selected[0].get('dbName') : "";
        sysAuthDataFieldList.getProxy().extraParams['authData.roleId'] = Ext.getCmp('system-authdataedit-form-roleid').getValue();
        sysAuthDataFieldList.getProxy().extraParams['authData.account'] = Ext.getCmp('system-authdataedit-form-account').getValue();
        sysAuthDataFieldList.getProxy().extraParams['authData.nameSpace'] = Ext.getCmp('system-authdataedit-form-namespace').getValue();
        sysAuthDataFieldList.getProxy().extraParams['authData.moduleName'] = Ext.getCmp('system-authdataedit-form-modulename').getValue();
        sysAuthDataFieldList.getProxy().extraParams['authData.tableName'] = selected.length != 0 ? selected[0].get('name') : "";
        sysAuthDataFieldList.reload({
            callback: function(records, option, success) {
                Ext.getCmp('system-authdataedit-form-filter').setValue(records.length > 0 ? records[0].get('filter') : '');
                Ext.getCmp('system-authdataedit-form-adid').setValue(records.length > 0 ? records[0].get('adId') : '');
            }
        });
    },

    saveFieldRadioToStore: function(button, newValue, oldValue, eOpts) {
        button.getWidgetRecord().set('status', newValue);
    },

    clearWindow: function(window, eOpts) {
        //sysAuthDataTableListStore.removeAll();
        sysAuthDataFieldList.removeAll();
        Ext.getCmp('system-authdataedit-form-filter').setValue('');
    },

    addFieldToFilter: function(grid, record, tr, rowIndex, e, eOpts) {
        var filter = Ext.getCmp('system-authdataedit-form-filter');
        filter.setValue(filter.getValue() + ' ' + record.get('fieldName') + ' ');
        filter.focus();
    },

    selectAllStatus: function(button) {
        var text = button.getText();
        if(text == '全编辑') {
            text = 2;
        } else if(text == '全只读') {
            text = 1;
        } else {
            text = 0;
        }
        for(var i = 0; i < sysAuthDataFieldList.getCount(); i++) {
            sysAuthDataFieldList.getAt(i).set('status', text);
        }
    },

    clearFilter: function (button) {
        Ext.getCmp('system-authdataedit-form-filter').setValue('');
    },

    saveAuthData: function(button) {
        var adId = Ext.getCmp('system-authdataedit-form-adid').getValue();
        var roleId = Ext.getCmp('system-authdataedit-form-roleid').getValue();
        var account = Ext.getCmp('system-authdataedit-form-account').getValue();
        var nameSpace = Ext.getCmp('system-authdataedit-form-namespace').getValue();
        var moduleName = Ext.getCmp('system-authdataedit-form-modulename').getValue();
        var select = Ext.getCmp('system-authdataedit-form-tablegrid').getSelection()[0];
        var dbInstance = select.get('dbInstance');
        var dbName = select.get('dbName');
        var tableName = select.get('name');
        var filter = Ext.getCmp('system-authdataedit-form-filter').getValue();
        var array = [];
        for(var i = 0; i < sysAuthDataFieldList.getCount(); i++) {
            var record = Ext.create('iFlat.model.system.AuthField', {
                'field': sysAuthDataFieldList.getAt(i).get('fieldName'),
                'status': sysAuthDataFieldList.getAt(i).get('status')
            });
            Ext.Array.push(array, record.getData());
        }
        Ext.Ajax.request({
            url: 'system_saveAuthData.action?',
            params: {
                'authData.adId': adId,
                'authData.roleId': roleId,
                'authData.account': account,
                'authData.nameSpace': nameSpace,
                'authData.moduleName': moduleName,
                'authData.dbInstance': dbInstance,
                'authData.dbName': dbName,
                'authData.tableName': tableName,
                'authData.filter': filter,
                'authData.field': Ext.JSON.encode(array),
            },
            success: function(response, opts) {
                Flat.util.tip(response.responseText);
            },
        })
    },

    showAuthWindowEdit: function(button) {
        if(Ext.getCmp('system-authority-userroletree').getSelection() == null) {
            Ext.Msg.show({
                title:'警告',
                message: '请先选择一个角色或用户。',
            });
            return false;
        }
        var id = '';
        var className = '';
        if(button.getText() == '借用权限') {
            id = 'system-authduplicateedit';
            className = 'iFlat.view.system.AuthDuplicateEdit';
        } else if(button.getText() == '清除权限') {
            id = 'system-authclearedit';
            className = 'iFlat.view.system.AuthClearEdit';
        }
        var win = Ext.getCmp(id);
        if(!win) {
            win = Ext.create(className);
        }
        win.show();
    },

    duplicateSubmit: function(button) {
        var from = Ext.getCmp('system-authduplicateedit-userroletree').getSelection();
        if(from.length == 0) {
            Ext.Msg.show({
                title:'警告',
                message: '请先选择一个角色或用户。',
            });
            return false;
        }
        var to = Ext.getCmp('system-authority-userroletree').getSelection()[0];
        var fromRoleId = from[0].get('parentId') == 'root' ? from[0].get('id') : from[0].get('parentId');
        var fromAccount = from[0].get('parentId') == 'root' ? "" : from[0].get('id');
        var toRoleId = to.get('parentId') == 'root' ? to.get('id') : to.get('parentId');
        var toAccount = to.get('parentId') == 'root' ? "" : to.get('id');
        if(fromRoleId == toRoleId && fromAccount == toAccount) {
            Ext.Msg.show({
                title:'警告',
                message: '不能向自己借用权限。',
            });
            return false;
        }
        var text = button.getText();
        var array = [];
        var records = [];
        var msg = "复制权限会删除角色/人员原本的权限，是否继续？";
        if(text == '借用选中模块') {
            records = Ext.getCmp('system-authduplicateedit-moduletree').getChecked();
            if(records.length == 0) {
                Ext.Msg.show({
                    title:'警告',
                    message: '借用模块权限时，需要选择至少一个模块。',
                });
                return false;
            } else {
                msg = "复制权限会删除角色/人员在勾选的模块中已拥有的权限，是否继续？"
                Ext.Array.each(records, function(rec) {
                    array.push(Ext.create('iFlat.model.system.AuthDuplicate', {
                        fromRoleId: fromRoleId,
                        fromAccount: fromAccount,
                        toRoleId: toRoleId,
                        toAccount: toAccount,
                        nameSpace: rec.data.nameSpace,
                        moduleName: rec.data.moduleName,
                    }).data);
                })
            }
        } else {
            array.push(Ext.create('iFlat.model.system.AuthDuplicate', {
                fromRoleId: fromRoleId,
                fromAccount: fromAccount,
                toRoleId: toRoleId,
                toAccount: toAccount,
                dupAll: true,
            }).data);
        }
        Ext.Msg.confirm("提示!",msg,function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'system_duplicateAuthority.action?',
                    params: {
                        'authDuplicateList': Ext.JSON.encode(array),
                    },
                    success: function(response, opts) {
                        Ext.getCmp('system-authduplicateedit').hide();
                        Flat.util.tip(response.responseText);
                    },
                })
            };
        })
    },

    clearSubmit: function(button) {
        var ur = Ext.getCmp('system-authority-userroletree').getSelection();
        var roleId = ur.get('parentId') == 'root' ? ur.get('id') : ur.get('parentId');
        var account = ur.get('parentId') == 'root' ? "" : ur.get('id');
        var text = button.getText();
        var array = [];
        var records = [];
        var msg = "清除权限会删除角色/人员的所有权限，是否继续？";
        if(text == '清除选中模块权限') {
            records = Ext.getCmp('system-authclearedit-moduletree').getChecked();
            if(records.length == 0) {
                Ext.Msg.show({
                    title:'警告',
                    message: '清除模块权限时，需要选择至少一个模块。',
                });
                return false;
            } else {
                msg = "清除权限会删除角色/人员在勾选的模块中的权限，是否继续？"
                Ext.Array.each(records, function(rec) {
                    array.push(Ext.create('iFlat.model.system.AuthClear', {
                        roleId: roleId,
                        account: account,
                        nameSpace: rec.data.nameSpace,
                        moduleName: rec.data.moduleName,
                    }).data);
                })
            }
        } else {
            array.push(Ext.create('iFlat.model.system.AuthClear', {
                roleId: roleId,
                account: account,
                clearAll: true,
            }).data);
        }
        Ext.Msg.confirm("提示!",msg,function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'system_clearAuthority.action?',
                    params: {
                        'authBatchList': Ext.JSON.encode(array),
                    },
                    success: function(response, opts) {
                        Ext.getCmp('system-authclearedit').hide();
                        Flat.util.tip(response.responseText);
                    },
                })
            };
        })
    },

    changeAuthWindowModuleStatus: function(node, checked, eOpts) {
        childNodeHandler(node, checked);
        parentNodeHandler(node);
        function childNodeHandler(node, status) {
            if(node.childNodes.length != 0) {
                for(var i = 0; i < node.childNodes.length; i++) {
                    node.childNodes[i].set('checked', status);
                    childNodeHandler(node.childNodes[i], status);
                }
            }
        }
        function parentNodeHandler(node, status) {
            if(node.parentNode != null) {
                if(!status) {
                    for(var i = 0; i < node.parentNode.childNodes.length; i++) {
                        status = node.parentNode.childNodes[i].get('checked') || status;
                    }
                }
                node.parentNode.set('checked', status);
                parentNodeHandler(node.parentNode, status);
            }
        }
    },

    onRowdblclickGlobalVariable: function(tree, record, tr, rowIndex, e, eOpts) {
        var ta = Ext.getCmp('system-authdataedit-form-filter');
        ta.setValue(ta.getValue() + ' ' + record.get('value') + ' ');
    }
});
