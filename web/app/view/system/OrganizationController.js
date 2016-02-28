Ext.define('iFlat.view.system.OrganizationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.system-organization',

    //beforeedit时，延时100毫秒初始化combobox
    initParentCombobox: function(editor, context, eOpts) {
        setTimeout(function () {
            var combo = Ext.getCmp('system-organization-select');
            var store = combo.getStore();
            var pid = context.record.data.parentOrgId;
            pid = pid == undefined ? '00000000-0000-0000-0000-000000000000' : pid;
            store.remove(store.findRecord('orgId', context.record.data.orgId));
            combo.setValue(pid);
        }, 100);
    },
    //combobox选择时，将值传至pid
    transmitValueToTextField: function(combo, newValue, oldValue, eOpts) {
        Ext.getCmp('system-organization-pid').setValue(newValue);
    },
    //刷新
    refreshList: function() {
        sysOrganizationStore.reload();
        sysOrganizationEditStore.reload();
    },
    //新增项目
    addOrgRecord: function() {
        sysOrganizationRowEditing.cancelEdit();
        var r = Ext.create('iFlat.model.system.Organization', {
            'organization.parentOrgId': '00000000-0000-0000-0000-000000000000',
            'organization.status': true,
        });
        sysOrganizationStore.insert(0, r);
        sysOrganizationRowEditing.startEdit(0, 0);
    },
    //提交编辑结果
    updateOrgRecord: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'system_saveOrganization.action',
            method: 'post',
            params: context.record.data,
            success: function(response, opts) {
                tip(response.responseText);
            },
            failure: function(response, opts) {
                tip(response.responseText);
            }
        });
    },
    //启用/禁用组织
    changeOrganizationStatus: function(column, rowIndex, checked, eOpts) {
        var id = Ext.getCmp('system-organization').getStore().getData().items[rowIndex].data.orgId;
        Ext.Ajax.request({
            url: 'system_activeOrganization.action?organization.orgId=' + id + '&organization.status=' + checked,
            success: function(response, opts) {
                //赋值给main-view-popmessage，弹出提示窗
                tip(response.responseText);
            },
            failure: function(response, opts) {
                tip(response.responseText);
            }
        })
    },
    //删除组织
    deleteOrganization: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = grid.getStore().getData().items[rowIndex].data.orgId;
        if(id == undefined) {
            sysOrganizationStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除该组织吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'system_deleteOrganization.action?organization.orgId=' + id,
                        method: 'get',
                        success: function(response, opts) {
                            tip(response.responseText);
                            Ext.getCmp('system-organization').getStore().reload();
                            Ext.getCmp('system-organization-select').getStore().reload();
                        },
                        failure: function(response, opts) {
                            tip(response.responseText);
                            Ext.getCmp('system-organization').getStore().reload();
                            Ext.getCmp('system-organization-select').getStore().reload();
                        }
                    })
                };
            })
        }
    },
    //重载下拉菜单数据
    reloadParentCombobox: function(editor, context, eOpts) {
        //删除未保存记录
        var id = context.record.data["organization.orgId"];
        if(id == "") {
            sysOrganizationStore.remove(context.record);
        }
        Ext.getCmp('system-organization-select').getStore().reload();
    },
})