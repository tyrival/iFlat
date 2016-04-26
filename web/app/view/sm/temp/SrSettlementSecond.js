Ext.define('iFlat.view.sm.temp.SrSettlementSecond', {
    extend: 'Ext.window.Window',
    alias: 'widget.sm-srsettlementsecond',
    title: '修船二级结算',
    layout: 'fit',
    modal: true,

    requires: [
        'iFlat.view.sm.temp.SrSettlementSecondController',
        'iFlat.view.sm.temp.detail.SrSettlementSecondDetailMain',
        'iFlat.view.sm.temp.detail.SrSettlementSecondDetailMisc',
    ],

    listeners: {
        hide: function () {
            var win = Ext.WindowManager.getActive();
            if (win.isXType('tip')) {
                win.close();
                win = Ext.WindowManager.getActive();
            }
            win.down('sm-detail-srsettlementsecondgrid').getStore().reload();
            // 加载可分配金额
            var balance = win.down('form').down('textfield[name=balance]');
            //Flat.util.mask('加载中...');
            Ext.Ajax.request({
                url: 'sm_listSrSettlementBalance.action',
                method: 'post',
                params: {
                    'srSettlementBalance.deptName': dept
                },
                success: function(response, opts) {
                    var list = Ext.JSON.decode(response.responseText)['list'];
                    balance.setValue(list[0]['amount']);
                },
                failure: function(response, opts) {
                    Flat.util.tip(response.responseText);
                }
            });
        }
    },

    controller: 'sm-srsettlementsecond',
    closeAction: 'hide',
    id: 'sm-srsettlementsecond',
    width: '95%',
    items: [{
        xtype: 'container',
        margin: '0 15 0 15',
        maxHeight: 700,
        scollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            name: 'sm-srsettlementsecondedit-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 50,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlementSecond.deptName',
                    fieldLabel: '部门',
                    width: 230,
                    hidden: true,
                    listeners: {
                        change: function(combo, newValue, oldValue, eOpts) {
                            // 将下一个控件的store根据部门值联动
                            var store = combo.nextSibling('combo').getStore()
                            store.getProxy().extraParams['team.deptName']= newValue;
                            store.reload();
                        }
                    },
                }, {
                    xtype: 'combo',
                    name: 'srSettlementSecond.team',
                    queryMode: 'local',
                    allowBlank: false,
                    editable: false,
                    forceSelection : true,
                    displayField: 'teamName',
                    valueField: 'teamName',
                    width: 380,
                    fieldLabel: '施工队',
                    store: Ext.create('iFlat.store.code.Team'),
                }, {
                    xtype: 'button',
                    name: 'sm-srsettlementsecondedit-link',
                    text: '下载附件',
                    margin: '0 10 0 30',
                    width: 100,
                    hidden: true,
                }, {
                    xtype: 'button',
                    name: 'sm-srsettlementsecondedit-deleteatt',
                    ui: 'gray',
                    text: '删除',
                    hidden: true,
                    handler: 'deleteAttachment'
                }, {
                    xtype: 'textfield',
                    name: 'srSettlementSecond.attachment',
                    fieldLabel: 'attachment',
                    hidden: true,
                    listeners: [{
                        // 上传附件时触发显示附件下载和删除按钮
                        change: function(field, newValue, oldValue, eOpts) {
                            var win = field.up('window');
                            var del = win.down('button[name=sm-srsettlementsecondedit-deleteatt]');
                            var link = win.down('button[name=sm-srsettlementsecondedit-link]');
                            if (!Flat.util.isEmpty(newValue)) {
                                del.show();
                                link.show();
                                link.setHref(newValue);
                            } else {
                                del.hide();
                                link.hide();
                                link.setHref('');
                            }
                        },
                    }]
                }, {
                    xtype: 'label',
                    margin: '0 0 0 20',
                    padding: '10',
                    text: '可分配金额： ',
                    style: 'font-weight: bold; text-align: right; font-size: 110%',
                    flex: 1
                }, {
                    xtype: 'label',
                    name: 'balance',
                    padding: '10',
                    style: 'font-weight: bold; text-align: right; font-size: 110%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: '工号',
                    hidden: true,
                    name: 'srSettlementSecond.projNo',
                    width: 180,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '船名',
                    hidden: true,
                    name: 'srSettlementSecond.projName',
                    width: 310,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '进度%',
                    hidden: true,
                    name: 'srSettlementSecond.progress',
                    width: 150,
                }, {
                    xtype: 'textfield',
                    name: 'task.processInstanceId',
                    fieldLabel: 'processInstanceId',
                    listeners: {
                        change: 'loadBusinessObjByTaskId'
                    },
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlementSecond.id',
                    fieldLabel: 'ID',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlementSecond.pid',
                    fieldLabel: 'pid',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlementSecond.type',
                    hidden: true,
                }, {
                    xtype: 'textfield',
                    name: 'srSettlementSecond.status',
                    hidden: true,
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlementSecond.laborAmount',
                    fieldLabel: '人工费',
                    width: 180,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '易耗品补贴',
                    name: 'srSettlementSecond.consumableAmount',
                    labelWidth: 80,
                    width: 200,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '绩效',
                    name: 'srSettlementSecond.performanceAmount',
                    width: 180,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'textfield',
                    fieldLabel: '材料费',
                    name: 'srSettlementSecond.materialAmount',
                    width: 180,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }, {
                    xtype: 'label',
                    margin: '0 0 0 20',
                    padding: '10',
                    text: '合计： ',
                    style: 'font-weight: bold; text-align: right; font-size: 110%',
                    flex: 1
                }, {
                    xtype: 'label',
                    name: 'summaryAmount',
                    padding: '10',
                    text: '0',
                    style: 'font-weight: bold; text-align: right; font-size: 110%',
                }]
            }, {
                xtype: 'container',
                layout: 'hbox',
                name: 'assess',
                items: [{
                    xtype: 'textfield',
                    name: 'srSettlementSecond.mgrScore',
                    fieldLabel: '管理分',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '进度分',
                    name: 'srSettlementSecond.progressScore',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '质量分',
                    name: 'srSettlementSecond.qualityScore',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '安全分',
                    name: 'srSettlementSecond.safetyScore',
                    value: 100,
                    allowBlank: true,
                    width: 150,
                }, {
                    xtype: 'textfield',
                    fieldLabel: '扣款',
                    name: 'srSettlementSecond.fineAmount',
                    value: 0,
                    allowBlank: true,
                    width: 150,
                    listeners: {
                        change: 'changeSummaryAmount'
                    }
                }]
            }, {
                xtype: 'container',
                type: 'hbox',
                margin: '10 0 0 0',
                items: [{
                    xtype: 'textarea',
                    name: 'srSettlementSecond.comment',
                    fieldLabel: '备注',
                    width: '100%',
                }]
            }]
        }, {
            xtype: 'container',
            layout: 'hbox',
            name: 'sm-srsettlementsecondedit-uploadatt',
            items: [{
                xtype: 'form',
                fieldDefaults: {
                    labelAlign: 'right',
                    labelWidth: 50,
                },
                items: [{
                    xtype: 'fileuploadfield',
                    fieldLabel: '附件',
                    name: 'upload',
                    buttonText: '选择...',
                    width: 300,
                    margin: '0 10 0 0',
                }]
            }, {
                xtype: 'button',
                text: '上传',
                ui: 'orig-blue',
                handler: 'uploadAttachment'
            }]
        }, {
            xtype: 'panel',
            border: false,
            width: '100%',
            name: 'detail',
            height: 350,
            margin: '10 0 10 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'sm-detail-srsettlementseconddetailmain'
            }, {
                xtype: 'sm-detail-srsettlementseconddetailmisc'
            }]
        }],
    }],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        ui: 'footer',
        name: 'sm-srsettlementsecond-toolbar',
        items: [ '->', {
            xtype: 'button',
            text: '保 存',
            handler: 'saveEdit',
        }]
    }],

});