Ext.define('iFlat.view.ss.AccidentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ss-accident',

    deleteAccident: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.data['accident.id'];
        if(id == undefined || id == '') {
            ssAccidentStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteAccident.action',
                        params: {
                            'accident.id': id
                        },
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssAccidentStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

    refreshList: function() {
        ssAccidentStore.reload();
    },

    showAccidentEdit: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('ss-accidentedit');
        if(!win) {
            win = Ext.create('iFlat.view.ss.AccidentEdit');
        }
        if(!record) {
            record = Ext.create('iFlat.model.ss.Accident');
        }
        var form = win.down('form[id=ss-accidentedit-form]');
        form.loadRecord(record);
        win.show();
    },

    saveAccidentEdit: function(button) {
        var win = button.up('window');
        var form = win.down('form[id=ss-accidentedit-form]');
        if (form.isValid()) {
            form.submit({
                url :'ss_saveAccident.action',
                success: function (form, action) {
                    Flat.util.tip(action.response.responseText);
                    var obj = Ext.JSON.decode(action.response.responseText)['object'];
                    if (!Flat.util.isEmpty(obj)) {
                        var id = obj['id'];
                        Ext.getCmp('ss-accidentedit-form-id').setValue(id);
                    }
                },
                failure: function (form, action) {
                    Flat.util.tip(action.response.responseText);
                }
            });
        }
    },

    uploadAttachment: function(btn) {
        var form = Ext.getCmp('ss-accidentedit-upload');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadAccident.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-accidentedit-attachment').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除隐患照片吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-accidentedit-attachment').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-accidentedit-attachment').setValue('');

            };
        })
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-accidentedit-att').show();
            Ext.getCmp('ss-accidentedit-link').setHref(newValue);
        } else {
            Ext.getCmp('ss-accidentedit-att').hide();
            Ext.getCmp('ss-accidentedit-link').setHref('');
        }
    },

    uploadAttachment2: function(btn) {
        var form = Ext.getCmp('ss-accidentedit-upload2');
        if (form.isValid()) {
            form.submit({
                url: 'ss_uploadAccident.action',
                method: 'POST',
                waitMsg: '正在上传......',
                success: function (fp, o) {
                    var path = (Ext.JSON.decode(o.response.responseText)).object;
                    Ext.getCmp('ss-accidentedit-attachment2').setValue(path);
                },
                failure: function (fp, o) {
                    Flat.util.tip(o.response.responseText);
                }
            })
        }
    },

    deleteAttachment2: function(btn) {
        Ext.Msg.confirm("提示!","确定要删除整改后照片吗?",function(btn) {
            if(btn=="yes") {
                Ext.Ajax.request({
                    url: 'ss_deleteFile.action?filePath=' + Ext.getCmp('ss-accidentedit-attachment2').getValue(),
                    success: function (response, opts) {
                        Flat.util.tip(response.responseText);
                    },
                })
                Ext.getCmp('ss-accidentedit-attachment2').setValue('');

            };
        })
    },

    onAttachmentChange2: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('ss-accidentedit-att2').show();
            Ext.getCmp('ss-accidentedit-link2').setHref(newValue);
        } else {
            Ext.getCmp('ss-accidentedit-att2').hide();
            Ext.getCmp('ss-accidentedit-link2').setHref('');
        }
    },

    setPerson: function(btn) {
        var id = btn.up('window').down('textfield[name=accident.id]').getValue();
        if (Flat.util.isEmpty(id)) {
            Ext.Msg.show({
                title:'提示',
                message: '请先保存此次事故，然后才可编辑相关人员信息。',
            });
        } else {
            var win = Ext.getCmp('ss-accparty');
            if(!win) {
                win = Ext.create('iFlat.view.ss.AccParty');
            }
            Ext.getCmp('ss-accparty-accid').setValue(id);
            win.show();
        }
    },


    refreshPartyList: function() {
        ssAccPartyStore.reload();
    },

    deleteEmptyRecord: function(editor, context, eOpts) {
        var id = context.record.data["accParty.id"];
        if(id == "") {
            ssAccPartyStore.remove(context.record);
        }
    },

    updateDetail: function(editor, context, eOpts) {
        Ext.Ajax.request({
            url: 'ss_saveAccParty.action',
            method: 'post',
            params: context.record.getData(),
            success: function(response, opts) {
                ssAccPartyStore.reload();
                Flat.util.tip(response.responseText);
            },
            failure: function(response, opts) {
                ssAccPartyStore.reload();
                Flat.util.tip(response.responseText);
            }
        });
    },

    addDetail: function(btn) {
        ssAccPartyRowEditing.cancelEdit();
        var accparty = Ext.create('iFlat.model.ss.AccParty',{
            'accParty.accId': Ext.getCmp('ss-accparty-accid').getValue(),
        });
        ssAccPartyStore.insert(0, accparty);
        ssAccPartyRowEditing.startEdit(0, 0);
    },

    deleteDetail: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var id = record.get('accParty.id');
        if(id == undefined || id == '') {
            ssAccPartyStore.remove(record);
        } else {
            Ext.Msg.confirm("提示!","确定要删除这条记录吗?",function(btn) {
                if(btn=="yes") {
                    Ext.Ajax.request({
                        url: 'ss_deleteAccParty.action',
                        params: record.data,
                        success: function (response, opts) {
                            var data = Ext.JSON.decode(response.responseText);
                            if(data.success) {
                                ssAccPartyStore.remove(record);
                            }
                            Flat.util.tip(response.responseText);
                        },
                    })
                };
            })
        }
    },

})