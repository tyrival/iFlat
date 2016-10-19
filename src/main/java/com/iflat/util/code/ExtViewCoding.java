package com.iflat.util.code;

import com.iflat.util.FileUtil;
import com.iflat.util.StringUtil;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.Field;

/**
 * Created by tyriv on 2016/9/10.
 */
public class ExtViewCoding {

    public static void generate(String className, String extRootPath) {

        String temp = className.replace("com.iflat.", "")
                .replace("bean.", "")
                .replace("entity.", "");
        String moduleName = temp.substring(0, temp.lastIndexOf("."));
        String shortClassName = temp.substring(temp.lastIndexOf(".") + 1, temp.length());

        generateView(className, moduleName, shortClassName, extRootPath);
        generateController(className, moduleName, shortClassName, extRootPath);
        generateViewEdit(className, moduleName, shortClassName, extRootPath);

    }

    public static void generateView(String className, String moduleName, String shortClassName, String extRootPath) {

        String filePath = extRootPath + "view\\" + moduleName.replace(".", "\\") + "\\" + shortClassName + ".js";
        createFile(filePath);

        String lowerClassName = shortClassName.toLowerCase();
        String insClassName = StringUtil.lowerCaseFirstChar(shortClassName);
        String lowerFullClassName = moduleName.toLowerCase() + "-" + shortClassName.toLowerCase();

        String extClassName = "iFlat.view." + moduleName + "." + shortClassName;
        StringBuilder sb = new StringBuilder();
        sb = sb.append("Ext.define('").append(extClassName).append("', {").append("\n")
                .append("    extend: 'Ext.grid.Panel',").append("\n")
                .append("    alias: 'widget.").append(lowerFullClassName).append("',").append("\n")
                .append("    xtype: '").append(lowerFullClassName).append("',").append("\n")
                .append("\n")
                .append("    controller: '").append(lowerFullClassName).append("',").append("\n")
                .append("\n")
                .append("    store: ").append(moduleName).append(shortClassName).append("Store = Ext.create('iFlat.store.").append(moduleName).append(".").append(shortClassName).append("Page', {").append("\n")
                .append("        proxy: {").append("\n")
                .append("            extraParams: {").append("\n")
                .append("                '").append(lowerClassName).append(".creatorAcc': Ext.getCmp('global-panel').getViewModel().get('user')['account']").append("\n")
                .append("            }").append("\n")
                .append("        }").append("\n")
                .append("    }),").append("\n")
                .append("\n")
                .append("    dockedItems: [{").append("\n")
                .append("        xtype: 'toolbar',").append("\n")
                .append("        dock: 'top',").append("\n")
                .append("        overflowHandler: 'scroller',").append("\n")
                .append("        items: [{").append("\n")
                .append("            text: '新增',").append("\n")
                .append("            ui: 'orig-blue',").append("\n")
                .append("            handler: 'show").append(shortClassName).append("Edit',").append("\n")
                .append("        }, '->', {").append("\n")
                .append("            text: '刷新',").append("\n")
                .append("            handler: 'refreshList',").append("\n")
                .append("        }],").append("\n")
                .append("    }],").append("\n")
                .append("    columns: [{").append("\n")
                .append("        text: '编辑',").append("\n")
                .append("        width: 60,").append("\n")
                .append("        menuDisabled: true,").append("\n")
                .append("        xtype: 'actioncolumn',").append("\n")
                .append("        tooltip: '编辑',").append("\n")
                .append("        align: 'center',").append("\n")
                .append("        iconCls: 'x-fa fa-edit',").append("\n")
                .append("        handler: 'show").append(shortClassName).append("Edit',").append("\n")
                .append("        editor: {").append("\n")
                .append("            xtype: 'label',").append("\n")
                .append("        },").append("\n")
                .append("    }, ");

        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) {

                sb.append("{").append("\n");

                String name = field[j].getName();
                sb.append("        header: '").append(name).append("',").append("\n")
                        .append("        dataIndex: '").append(insClassName).append(".").append(name).append("',").append("\n")
                        .append("        flex: true,").append("\n");

                String type = field[j].getGenericType().toString(); //获取属性的类型
                String other = "";
                switch (type) {
                    case "class java.util.Date":
                        other = "        formatter: 'date(\"Y-m-d\")',\n";
                        break;
                }
                if ("id".equals(name)) {
                    sb.append("        hidden: true,").append("\n");
                }
                sb.append(other)
                        .append("    }, ");

            }
            sb.append("{").append("\n")
                    .append("        text: '删除',").append("\n")
                    .append("        width: 60,").append("\n")
                    .append("        menuDisabled: true,").append("\n")
                    .append("        xtype: 'actioncolumn',").append("\n")
                    .append("        tooltip: '删除',").append("\n")
                    .append("        align: 'center',").append("\n")
                    .append("        iconCls: 'x-fa fa-close',").append("\n")
                    .append("        handler: 'delete").append(shortClassName).append("',").append("\n")
                    .append("        editor: {").append("\n")
                    .append("            xtype: 'label',").append("\n")
                    .append("        },").append("\n")
                    .append("    }],").append("\n")
                    .append("\n")
                    .append("    bbar: {").append("\n")
                    .append("        xtype: 'pagingtoolbar',").append("\n")
                    .append("        pageIndex: 5,").append("\n")
                    .append("        store: ").append(moduleName).append(shortClassName).append("Store,").append("\n")
                    .append("        displayInfo: true,").append("\n")
                    .append("    }").append("\n")
                    .append("});").append("\n");

            FileUtil.write(filePath, sb.toString());

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static void generateController(String className, String moduleName, String shortClassName, String extRootPath) {

        String filePath = extRootPath + "view\\" + moduleName.replace(".", "\\") + "\\" + shortClassName + "Controller.js";
        createFile(filePath);

        String lowerClassName = shortClassName.toLowerCase();
        String insClassName = StringUtil.lowerCaseFirstChar(shortClassName);
        String lowerFullClassName = moduleName.toLowerCase() + "-" + shortClassName.toLowerCase();

        String extClassName = "iFlat.view." + moduleName + "." + shortClassName + "Controller";
        StringBuilder sb = new StringBuilder();
        sb = sb.append("Ext.define('").append(extClassName).append("', {").append("\n")
                .append("    extend: 'Ext.app.ViewController',").append("\n")
                .append("    alias: 'controller.").append(lowerFullClassName).append("',").append("\n")
                .append("\n")
                .append("    show").append(shortClassName).append("Edit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {").append("\n")
                .append("        var win = Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit');").append("\n")
                .append("        if(!win) {").append("\n")
                .append("            win = Ext.create('iFlat.view.").append(moduleName).append(".").append(shortClassName).append("Edit');").append("\n")
                .append("        }").append("\n")
                .append("        if(!record) {").append("\n")
                .append("            record = Ext.create('iFlat.model.").append(moduleName).append(".").append(shortClassName).append("');").append("\n")
                .append("        }").append("\n")
                .append("        var form = win.down('form[id=").append(moduleName).append("-").append(lowerClassName).append("edit-form]');").append("\n")
                .append("        form.loadRecord(record);").append("\n")
                .append("        win.show();").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    delete").append(shortClassName).append(": function(grid, rowIndex, colIndex, actionItem, event, record, row) {").append("\n")
                .append("        var id = record.data['").append(insClassName).append(".id'];").append("\n")
                .append("        if(id == undefined || id == '') {").append("\n")
                .append("            ").append(moduleName).append(shortClassName).append("Store.remove(record);").append("\n")
                .append("        } else {").append("\n")
                .append("            Ext.Msg.confirm(\"提示!\",\"确定要删除这条记录吗?\",function(btn) {").append("\n")
                .append("                if(btn==\"yes\") {").append("\n")
                .append("                    Ext.Ajax.request({").append("\n")
                .append("                        url: '").append(moduleName).append("_delete").append(shortClassName).append(".action',").append("\n")
                .append("                        params: {").append("\n")
                .append("                            '").append(insClassName).append(".id': id").append("\n")
                .append("                        },").append("\n")
                .append("                        success: function (response, opts) {").append("\n")
                .append("                            var data = Ext.JSON.decode(response.responseText);").append("\n")
                .append("                            if(data.success) {\n").append("\n")
                .append("                                ").append(moduleName).append(shortClassName).append("Store.remove(record);").append("\n")
                .append("                            }").append("\n")
                .append("                            Flat.util.tip(response.responseText);").append("\n")
                .append("                        },").append("\n")
                .append("                    })").append("\n")
                .append("                };").append("\n")
                .append("            })").append("\n")
                .append("        }").append("\n")
                .append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    refreshList: function(btn) {").append("\n")
                .append("        btn.up('grid').getStore().reload();").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    save").append(shortClassName).append("Edit: function(button) {").append("\n")
                .append("        var win = button.up('window');").append("\n")
                .append("        var form = win.down('form[id=").append(moduleName).append("-").append(lowerClassName).append("edit-form]');").append("\n")
                .append("        if (form.isValid()) {").append("\n")
                .append("            form.submit({").append("\n")
                .append("                url :'").append(moduleName).append("_save").append(shortClassName).append(".action',").append("\n")
                .append("                success: function (form, action) {").append("\n")
                .append("                    Flat.util.tip(action.response.responseText);").append("\n")
                .append("                    var obj = Ext.JSON.decode(action.response.responseText)['object'];").append("\n")
                .append("                    if (!Flat.util.isEmpty(obj)) {").append("\n")
                .append("                        var id = obj['id'];").append("\n")
                .append("                        win.down('textfield[name=").append(insClassName).append(".id]').setValue(id);").append("\n")
                .append("                        win.close();").append("\n")
                .append("                    }").append("\n")
                .append("                },").append("\n")
                .append("                failure: function (form, action) {").append("\n")
                .append("                    Flat.util.tip(action.response.responseText);").append("\n")
                .append("                }").append("\n")
                .append("            });").append("\n")
                .append("        }").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    uploadAttachment: function(btn) {").append("\n")
                .append("        var form = Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-upload');").append("\n")
                .append("        if (form.isValid()) {").append("\n")
                .append("            form.submit({").append("\n")
                .append("                url: '").append(moduleName).append("_upload").append(shortClassName).append(".action',").append("\n")
                .append("                method: 'POST',").append("\n")
                .append("                waitMsg: '正在上传......',").append("\n")
                .append("                success: function (fp, o) {").append("\n")
                .append("                    var path = (Ext.JSON.decode(o.response.responseText)).object;").append("\n")
                .append("                    Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-attachment').setValue(path);").append("\n")
                .append("                },").append("\n")
                .append("                failure: function (fp, o) {").append("\n")
                .append("                    Flat.util.tip(o.response.responseText);").append("\n")
                .append("                }").append("\n")
                .append("            })").append("\n")
                .append("        }").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    deleteAttachment: function(btn) {").append("\n")
                .append("        Ext.Msg.confirm(\"提示!\",\"确定要删除附件吗?\",function(btn) {").append("\n")
                .append("            if(btn==\"yes\") {").append("\n")
                .append("                Ext.Ajax.request({").append("\n")
                .append("                    url: '").append(moduleName).append("_deleteFile.action?filePath=' + Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-attachment').getValue(),").append("\n")
                .append("                    success: function (response, opts) {").append("\n")
                .append("                        Flat.util.tip(response.responseText);").append("\n")
                .append("                    },").append("\n")
                .append("                })").append("\n")
                .append("                Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-attachment').setValue('');").append("\n")
                .append("            };").append("\n")
                .append("        })").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    onAttachmentChange: function(field, newValue, oldValue, eOpts) {").append("\n")
                .append("        if (newValue && newValue != '') {").append("\n")
                .append("            Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-att').show();").append("\n")
                .append("            Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-link').setHref(newValue);").append("\n")
                .append("        } else {").append("\n")
                .append("            Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-att').hide();").append("\n")
                .append("            Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("edit-link').setHref('');").append("\n")
                .append("        }").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    addDetail: function(btn) {").append("\n")
                .append("        ").append(moduleName).append(shortClassName).append("DetlRowEditing.cancelEdit();").append("\n")
                .append("        var rec = Ext.create('iFlat.model.").append(moduleName).append(".").append(shortClassName).append("Detl',{").append("\n")
                .append("            '").append(insClassName).append("Detl.pid': Ext.getCmp('").append(moduleName).append("-").append(lowerClassName).append("-id').getValue(),").append("\n")
                .append("        });").append("\n")
                .append("        ").append(moduleName).append(shortClassName).append("DetlStore.insert(0, ").append(lowerClassName).append(");").append("\n")
                .append("        ").append(moduleName).append(shortClassName).append("DetlRowEditing.startEdit(0, 0);").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    updateDetail: function(editor, context, eOpts) {").append("\n")
                .append("        Ext.Ajax.request({").append("\n")
                .append("            url: '").append(moduleName).append("_save").append(shortClassName).append("Detl.action',").append("\n")
                .append("            method: 'post',").append("\n")
                .append("            params: context.record.getData(),").append("\n")
                .append("            success: function(response, opts) {").append("\n")
                .append("                ").append(moduleName).append(shortClassName).append("DetlStore.reload();").append("\n")
                .append("                Flat.util.tip(response.responseText);").append("\n")
                .append("            },").append("\n")
                .append("            failure: function(response, opts) {").append("\n")
                .append("                ").append(moduleName).append(shortClassName).append("DetlStore.reload();").append("\n")
                .append("                Flat.util.tip(response.responseText);").append("\n")
                .append("            }").append("\n")
                .append("        });").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    deleteDetail: function(grid, rowIndex, colIndex, actionItem, event, record, row) {").append("\n")
                .append("        var id = record.get('").append(lowerClassName).append("Detl.id');").append("\n")
                .append("        if(id == undefined || id == '') {").append("\n")
                .append("            ").append(moduleName).append(shortClassName).append("DetlStore.remove(record);").append("\n")
                .append("        } else {").append("\n")
                .append("            Ext.Msg.confirm(\"提示!\",\"确定要删除这条记录吗?\",function(btn) {").append("\n")
                .append("                if(btn==\"yes\") {").append("\n")
                .append("                    Ext.Ajax.request({").append("\n")
                .append("                        url: '").append(moduleName).append("_delete").append(shortClassName).append("Detl.action',").append("\n")
                .append("                        params: record.data,").append("\n")
                .append("                        success: function (response, opts) {").append("\n")
                .append("                            var data = Ext.JSON.decode(response.responseText);").append("\n")
                .append("                            if(data.success) {").append("\n")
                .append("                                ").append(moduleName).append(shortClassName).append("DetlStore.remove(record);").append("\n")
                .append("                            }").append("\n")
                .append("                            Flat.util.tip(response.responseText);").append("\n")
                .append("                        },").append("\n")
                .append("                    })").append("\n")
                .append("                };").append("\n")
                .append("            })").append("\n")
                .append("        }").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    deleteEmptyRecord: function(editor, context, eOpts) {").append("\n")
                .append("        var id = context.record.data[\"").append(insClassName).append("Detl.id\"];").append("\n")
                .append("        if(id == \"\") {").append("\n")
                .append("            ").append(moduleName).append(shortClassName).append("DetlStore.remove(context.record);").append("\n")
                .append("        }").append("\n")
                .append("    },").append("\n")
                .append("\n")
                .append("    editClose: function () {").append("\n")
                .append("        ").append(moduleName).append(shortClassName).append("Store.reload();").append("\n")
                .append("    },").append("\n")
                .append("})").append("\n");

        FileUtil.write(filePath, sb.toString());
    }

    public static void generateViewEdit(String className, String moduleName, String shortClassName, String extRootPath) {

        String filePath = extRootPath + "view\\" + moduleName.replace(".", "\\") + "\\" + shortClassName + "Edit.js";
        createFile(filePath);

        String lowerClassName = shortClassName.toLowerCase();
        String insClassName = StringUtil.lowerCaseFirstChar(shortClassName);
        String lowerFullClassName = moduleName.toLowerCase() + "-" + shortClassName.toLowerCase();

        String extClassName = "iFlat.view." + moduleName + "." + shortClassName + "Edit";
        StringBuilder sb = new StringBuilder();
        sb.append("Ext.define('").append(extClassName).append("', {").append("\n")
                .append("    extend: 'Ext.window.Window',").append("\n")
                .append("    alias: 'widget.").append(moduleName).append("-").append(lowerClassName).append("edit',").append("\n")
                .append("    title: '").append(shortClassName).append("',").append("\n")
                .append("    layout: 'fit',").append("\n")
                .append("    modal: true,").append("\n")
                .append("\n")
                .append("    height: '95%',").append("\n")
                .append("    width: '95%',").append("\n")
                .append("    id: '").append(moduleName).append("-").append(lowerClassName).append("edit',").append("\n")
                .append("    controller: '").append(moduleName).append("-").append(lowerClassName).append("',").append("\n")
                .append("    closeAction: 'hide',").append("\n")
                .append("\n")
                .append("    items: [{").append("\n")
                .append("        xtype: 'container',").append("\n")
                .append("        padding: '15 15 0 15',").append("\n")
                .append("        scrollable: 'y',").append("\n")
                .append("        layout: {").append("\n")
                .append("            type: 'vbox',").append("\n")
                .append("            align: 'stretch'").append("\n")
                .append("        },").append("\n")
                .append("        items: [{").append("\n")
                .append("            xtype: 'form',").append("\n")
                .append("            id: '").append(moduleName).append("-").append(lowerClassName).append("edit-form',").append("\n")
                .append("            fieldDefaults: {").append("\n")
                .append("                labelAlign: 'right',").append("\n")
                .append("                labelWidth: 70,").append("\n")
                .append("            },").append("\n")
                .append("            items: [{").append("\n")
                .append("                xtype: 'container',").append("\n")
                .append("                layout: 'hbox',").append("\n")
                .append("                margin: '10 0 0 0',").append("\n")
                .append("                width: '100%',").append("\n")
                .append("                items: [{").append("\n")
                .append("                    xtype: 'textfield',").append("\n")
                .append("                    name: '").append(insClassName).append(".id',").append("\n")//
                .append("                    id: '").append(moduleName).append("-").append(lowerClassName).append("-id',").append("\n")
                .append("                    fieldLabel: 'ID',").append("\n")
                .append("                    labelWidth: 50,").append("\n")
                .append("                    width: '50%',").append("\n")
                .append("                    hidden: true").append("\n")
                .append("                }, ");

        try {
            Field[] field = Class.forName(className).getDeclaredFields();
            for (int j = 0; j < field.length; j++) {

                String name = field[j].getName();
                if ("id".equals(name)) {
                    continue;
                }
                sb.append("{").append("\n")
                        .append("                    xtype: 'textfield',").append("\n")
                        .append("                    name: '").append(insClassName).append(".").append(name).append("',").append("\n")
                        .append("                    fieldLabel: '").append(name).append("',").append("\n")
                        .append("                    labelWidth: 50,").append("\n")
                        .append("                    width: '50%',").append("\n")
                        .append("                }, ");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        sb.append("]").append("\n")
                .append("            }]").append("\n")
                .append("        }, {").append("\n")
                .append("            xtype: 'container',").append("\n")
                .append("            layout: 'hbox',").append("\n")
                .append("            margin: '10 0 0 0',").append("\n")
                .append("            hidden: true,").append("\n")
                .append("            id: '").append(moduleName).append("-").append(lowerClassName).append("edit-uploadatt',").append("\n")
                .append("            items: [{").append("\n")
                .append("                xtype: 'form',").append("\n")
                .append("                id: '").append(moduleName).append("-").append(lowerClassName).append("edit-upload',").append("\n")
                .append("                fieldDefaults: {").append("\n")
                .append("                    labelAlign: 'right',").append("\n")
                .append("                    labelWidth: 70,").append("\n")
                .append("                },").append("\n")
                .append("                items: [{").append("\n")
                .append("                    xtype: 'fileuploadfield',").append("\n")
                .append("                    fieldLabel: '附件',").append("\n")
                .append("                    name: 'upload',").append("\n")
                .append("                    buttonText: '选择...',").append("\n")
                .append("                    width: 300,").append("\n")
                .append("                    margin: '0 10 0 0',").append("\n")
                .append("                }]").append("\n")
                .append("            }, {").append("\n")
                .append("                xtype: 'button',").append("\n")
                .append("                text: '上传',").append("\n")
                .append("                ui: 'orig-blue',").append("\n")
                .append("                handler: 'uploadAttachment'").append("\n")
                .append("            }]").append("\n")
                .append("        }, /*{").append("\n")
                .append("            xtype: 'panel',").append("\n")
                .append("            minHeight: 300,").append("\n")
                .append("            flex: 1,").append("\n")
                .append("            border: false,").append("\n")
                .append("            margin: '30 0 5 0',").append("\n")
                .append("            layout: {").append("\n")
                .append("                type: 'hbox',").append("\n")
                .append("                align: 'stretch'").append("\n")
                .append("            },").append("\n")
                .append("            items: [{").append("\n")
                .append("                xtype: 'gridpanel',").append("\n")
                .append("                width: '100%',").append("\n")
                .append("                scrollable: true,").append("\n")
                .append("                store: ").append(moduleName).append(shortClassName).append("DetlStore = Ext.create('iFlat.store.").append(moduleName).append(".").append(shortClassName).append("Detl'),").append("\n")
                .append("                border: true,").append("\n")
                .append("                columnLines: true,").append("\n")
                .append("                plugins: [").append("\n")
                .append("                    ").append(moduleName).append(shortClassName).append("DetlRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {").append("\n")
                .append("                        pluginId: '").append(moduleName).append("-").append(lowerClassName).append("edit-detl-edit',").append("\n")
                .append("                        clicksToMoveEditor: 1,").append("\n")
                .append("                        autoCancel: true,").append("\n")
                .append("                        listeners: {").append("\n")
                .append("                            edit: 'updateDetl',").append("\n")
                .append("                            cancelEdit: 'deleteEmptyRecord',").append("\n")
                .append("                        }").append("\n")
                .append("                    })").append("\n")
                .append("                ],").append("\n")
                .append("                tbar: [{").append("\n")
                .append("                    xtype: 'button',").append("\n")
                .append("                    text: '新增',").append("\n")
                .append("                    ui: 'orig-blue',").append("\n")
                .append("                    handler: 'addDetail'").append("\n")
                .append("                }],").append("\n")
                .append("                columns: [{").append("\n")
                .append("                    text: '删除',").append("\n")
                .append("                    width: 50,").append("\n")
                .append("                    menuDisabled: true,").append("\n")
                .append("                    xtype: 'actioncolumn',").append("\n")
                .append("                    align: 'center',").append("\n")
                .append("                    iconCls: 'x-fa fa-close',").append("\n")
                .append("                    handler: 'deleteDetail',").append("\n")
                .append("                    editor: {").append("\n")
                .append("                        xtype: 'label'").append("\n")
                .append("                    }").append("\n")
                .append("                }, {").append("\n")
                .append("                    header: 'id',").append("\n")
                .append("                    width: 100,").append("\n")
                .append("                    dataIndex: '").append(insClassName).append("Detl.id',").append("\n")
                .append("                    cellWrap: true,").append("\n")
                .append("                    hidden: true,").append("\n")
                .append("                    editor: {").append("\n")
                .append("                        xtype: 'textarea',").append("\n")
                .append("                        allowBlank: true,").append("\n")
                .append("                    }").append("\n")
                .append("                }],").append("\n")
                .append("            }]").append("\n")
                .append("        }*/],").append("\n")
                .append("    }],").append("\n")
                .append("\n")
                .append("    dockedItems: [{").append("\n")
                .append("        xtype: 'toolbar',").append("\n")
                .append("        dock: 'bottom',").append("\n")
                .append("        ui: 'footer',").append("\n")
                .append("        id: '").append(moduleName).append("-").append(lowerClassName).append("edit-toolbar',").append("\n")
                .append("        items: ['->', {").append("\n")
                .append("            xtype: 'button',").append("\n")
                .append("            text: '保 存',").append("\n")
                .append("            handler: 'save").append(shortClassName).append("Edit',").append("\n")
                .append("        }]").append("\n")
                .append("    }],").append("\n")
                .append("\n")
                .append("    listeners: {").append("\n")
                .append("        close: 'editClose'").append("\n")
                .append("    }").append("\n")
                .append("});");

        FileUtil.write(filePath, sb.toString());
    }

    public static void createFile(String filePath) {
        File file = new File(filePath);
        if (!file.exists()) {
            try {
                file.createNewFile();
            } catch (IOException e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
