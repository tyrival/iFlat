/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('iFlat.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    logout: function(button) {
        Ext.Msg.confirm("提示!","确定要注销吗？",function(btn) {
            if(btn == "yes") {
                Ext.Ajax.request({
                    url: 'system_logout.action',
                    success: function(response, opts) {
                        parent.location.href = 'index.jsp';
                    },
                });
            };
        })
    },

    //点击菜单，激活对应的功能
    onNavigationTreeSelectionChange: function (tree, node) {
        //引入视图类和控制器类
        var namespace = node.get('nameSpace');
        var controller = node.get('controller');
        controller = controller == 'null' || controller == '' || controller == undefined ? '' : 'iFlat.view.' + namespace + '.' + controller;
        var viewName = node.get('viewName');
        viewName = viewName == 'null' || viewName == '' || viewName == undefined ? '' : 'iFlat.view.' + namespace + '.' + viewName;
        var arr = new Array();
        if(controller != '' && !Ext.ClassManager.isCreated(controller)) {
            arr.push(controller);
        };
        if(viewName != '' && !Ext.ClassManager.isCreated(viewName)) {
            arr.push(viewName);
        };
        Ext.require(arr, function(){
            //回调函数打开tab或url
            createTabpanel(viewName);
        });
        function createTabpanel(viewName) {
            //view属性存在时
            if (node && node.get('viewName')) {
                //获取 id:main-view-tabpanel 控件
                var tabPanel = Ext.getCmp('main-view-tabpanel');
                //获取routeId属性，用于item的itemId，由于html元素id必须为字母开头，所以加上tab前缀
                //var nodeId = 'tab' + node.get('nodeId');
                var nodeId = 'tab_' + node.get('nameSpace') + '_' + node.get('viewName');
                nodeId = nodeId.replace('\.', '_');
                //获取标签页的所有nodeId
                var itemList = tabPanel.items.keys;
                var hasExisted = false;
                //遍历routeId，是否与当前点击的routeId相同，判断标签页是否存在
                for(var i = 0; i < itemList.length; i++) {
                    if(nodeId == itemList[i]) {
                        hasExisted = true;
                    }
                };
                //标签页不存在时，创建标签
                if(!hasExisted) {
                    //获取点击菜单的文本
                    var text = node.get('text');
                    //创建组件
                    var item = Ext.create(viewName, {
                        title: text,
                        itemId: nodeId,
                        closable: true,
                    });
                    //添加标签页
                    tabPanel.add(item);
                };
                //通过itemId激活标签页
                tabPanel.getLayout().setActiveItem(nodeId);
            };
            //节点属于外链地址
            if (node && node.get('url')) {
                var url = node.get('url');
                window.open(url);
            }
        }
    },

    /*导航菜单缩放
    onToggleNavigationSize: function () {
        var treelist = this.lookupReference('navigationTreeList');
        var senchaLogo = this.lookupReference('senchaLogo');
        var container = treelist.ownerCt;
        var collapsing = !treelist.getMicro();

        /!* 禁止拖动navigationTree
        this.oldWidth = 0 ? 250 : this.oldWidth;
        var newWidth = !collapsing ? this.oldWidth : 44;
        if(collapsing) {
            this.oldWidth = container.width;
        };*!/
        var newWidth = !collapsing ? 250 : 44;
        if (Ext.isIE9m || !Ext.os.is.Desktop) {
            Ext.suspendLayouts();
            senchaLogo.setWidth(newWidth);
            container.setWidth(newWidth);
            Ext.resumeLayouts(); // do not flush the layout here...
            // No animation for IE9 or lower...
            container.layout.animatePolicy = container.layout.animate = null;
            container.updateLayout();  // ... since this will flush them
        }
        else {
            senchaLogo.animate({dynamic: true, to: {width: newWidth}});
            container.animate({dynamic: true, to: {width: newWidth}});
        }
        treelist.setMicro(collapsing);
    },*/

    /**
     * 移除标签时，如果标签是由导航菜单中当前激活的节点打开的，会导致该节点无法再次点击
     * 所以，取消激活该节点，改为激活其父节点
     */
    onTabPanelRemoveComponent: function(tabpanel, component, eOpts) {
        //获取导航菜单
        var tree = navigationTree;
        //获取当前激活的节点
        var selectedNode = tree.getSelection();
        //判断标签的itemId和节点的routeId是否相等
        if(component.itemId == 'tab' + selectedNode.get('nodeId')){
            //激活该节点的父节点
            tree.setSelection(selectedNode.parentNode);
        };
        component.destroy();
    },

    beforeTabPanelAdd: function(panel, component, index, eOpts) {
        var thisCmp = component;
        var id = component.getItemId();
        id = id.substring(3, id.length);
        var r = sysNavigationTree.findRecord('nodeId', id);
        if(r){
            Ext.Ajax.request({
                url: 'system_getOperatingAuthority.action?',
                params: {
                    'authOperatingVo.nameSpace': r.get('nameSpace'),
                    'authOperatingVo.moduleName': r.get('moduleName'),
                },
                success: function(response, opts) {
                    var result = Ext.JSON.decode(response.responseText);
                    if(result['success'] && result['list'].length > 0) {
                        if(result['list'][0]['aoStatus']) {
                            Ext.Array.each(result['list'], function(name, index, countriesItSelf) {
                                var cp = Ext.getCmp(name['pageId']);
                                if(cp) {
                                    cp.setHidden(!name['status']);
                                }
                                cp = thisCmp.getPlugin(name['pageId']);
                                if(cp) {
                                    if(name['status']) {
                                        cp.enable();
                                    } else {
                                        cp.disable();
                                    }
                                }
                            });
                        }
                    }
                },
            });
            Ext.Ajax.request({
                url: 'system_getDataAuthority.action?',
                params: {
                    'authData.nameSpace': r.get('nameSpace'),
                    'authData.moduleName': r.get('moduleName'),
                },
                success: function(response, opts) {
                    var result = Ext.JSON.decode(response.responseText);
                    if(result['success'] && result['list'].length > 0) {
                        if(result['list'][0]['adStatus']) {
                            Ext.Array.each(result['list'], function(name, index, countriesItSelf) {
                                var fields = Ext.JSON.decode(name['field']);
                                var nameSpace = name['nameSpace'].toLowerCase();
                                var moduleName = name['moduleName'].toLowerCase();
                                Ext.Array.each(fields, function(obj, index, countriesItSelf) {
                                    var edit = Ext.getCmp(nameSpace + '-' + moduleName + '-' + obj['tableName'].toLowerCase() + '-' + obj['field'].toLowerCase() + '-edit');
                                    var read = Ext.getCmp(nameSpace + '-' + moduleName + '-' + obj['tableName'].toLowerCase() + '-' + obj['field'].toLowerCase());
                                    if(obj['status'] == 0) {
                                        processEle(edit, true);
                                        processEle(read, true);
                                    } else if(obj['status'] == 1) {
                                        processEle(edit, true);
                                        processEle(read, false);
                                    } else if(obj['status'] == 2) {
                                        processEle(edit, false);
                                        processEle(read, false);
                                    }
                                    function processEle(ele, forbidden) {
                                        if(ele) {
                                            ele.setHidden(forbidden);
                                            ele.setDisabled(forbidden);
                                        }
                                    }
                                });
                            });
                        }
                    }
                },
            })
        }
    },

    initHeadbar: function(viewport, layout, eOpts) {
        Ext.Ajax.request({
            url: 'system_getSession.action?',
            success: function(response, opts) {
                var user = Ext.JSON.decode(response.responseText)['object'];
                viewport.getViewModel().set('user', user);
            },
        })
    },

    popSubWindow: function(btn) {
        var name = 'iFlat.view.main.' + btn.getId();
        var id = 'main-' + btn.getId().toLowerCase();
        var win = Ext.getCmp(id);
        if(!win) {
            win = Ext.create(name);
        }
        win.show();
    },

    initSwitchRole: function() {
        Ext.getCmp('main-switchrole-combo').setValue(Ext.getCmp('global-panel').getViewModel().get('user.roleId'));
    },

    switchRole: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_switchRole.action',
            success: function(form, action) {
                win.hide();
                var result = Ext.JSON.decode(action.response.responseText);
                if(result['success']) {
                    //重新加载功能树
                    sysNavigationTree.reload();
                    navigationTree.onRootChange(sysNavigationTree.getRoot());
                    //修改viewmodel中的user数据
                    Ext.getCmp('global-panel').getViewModel().set('user', result['object']);
                    //关闭所有标签页
                    var home = Ext.getCmp('main-view-tabpanel').getComponent("home");
                    while(home.nextSibling()) {
                        home.nextSibling().close();
                    }
                } else {
                    Flat.util.tip(action.response.responseText);
                }
            },
        });
    },

    saveDefaultRole: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_saveDefaultRole.action',
            success: function(form, action) {
                win.hide();
                Flat.util.tip(action.response.responseText);
                defaultRoleStore.reload();
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            },
        });
    },

    changePassword: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_changePassword.action',
            success: function(form, action) {
                Flat.util.tip(action.response.responseText);
                win.hide();
                clearFields(win);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
                clearFields(win);
            },
        });
        function clearFields(win) {
            win.down('textfield[name=password.old]').setValue('');
            win.down('[name=password.password]').setValue('');
            win.down('[name=password.varify]').setValue('');
        }
    },

    initProfile: function(window, eOpts) {
        var profile = Ext.create('iFlat.store.main.Profile');
        profile.load({
            callback: function(records, option, success) {
                window.down('form').loadRecord(records[0]);
            }
        })
    },

    saveProfile: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_saveProfile.action',
            success: function(form, action) {
                win.hide();
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            },
        });
    },

    initMemo: function(window, eOpts) {
        var memo = Ext.create('iFlat.store.main.Memo');
        memo.load({
            callback: function(records, option, success) {
                window.down('form').loadRecord(records[0]);
            }
        })
    },

    saveMemo: function(button) {
        var win = button.up('window');
        var form = win.down('form');
        form.submit({
            url :'system_saveMemo.action',
            success: function(form, action) {
                win.hide();
                Flat.util.tip(action.response.responseText);
            },
            failure: function(form, action) {
                Flat.util.tip(action.response.responseText);
            },
        });
    },

});