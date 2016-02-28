/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('iFlat.view.main.Main', {
    extend: 'Ext.container.Viewport',
    xtype: 'mainviewport',

    requires: [
        'Ext.list.Tree',
        'iFlat.model.main.MainModel',
        'iFlat.view.main.MainController',
    ],

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',
    id: 'global-panel',
    controller: 'main',
    viewModel: 'main',

    layout: 'border',

    listeners: {
        afterlayout: 'initHeadbar'
    },

    items: [{
        region: 'north',
        xtype: 'toolbar',
        cls: 'sencha-dash-dash-headerbar toolbar-btn-shadow',
        height: 64,
        itemId: 'headerBar',
        items: [
            {
                xtype: 'component',
                reference: 'senchaLogo',
                cls: 'sencha-logo',
                bind: {
                    html: '<div class="main-logo" style="font-family: 微软雅黑;font-size: 20px"><img src="{title.iconPath}">{title.name}</div>',
                },
                width: 250
            },
            {
                xtype: 'tbspacer',
                flex: 1
            },
            {
                cls: 'header-bar-icon',
                iconCls:'x-fa fa-edit',
                tooltip: '速记本',
                id: 'Memo',
                handler: 'popSubWindow'
            },
            {
                xtype: 'button',
                id: 'headbar-user',
                //iconCls: 'x-fa fa-user',
                cls: 'header-bar-icon',
                bind: {
                    text: '<div style="font-family:微软雅黑;font-size:15px;font-weight:bold;color:#5fa2dd"> {user.userName} [{user.roleName}] </div>',
                },
                menu: [
                    { text: '切换角色', handler: 'popSubWindow', id: 'SwitchRole' },
                    { text: '修改密码', handler: 'popSubWindow', id: 'Password' },
                    { text: '默认角色', handler: 'popSubWindow', id: 'DefaultRole' },
                    //{ text: '常用功能', handler: 'popSubWindow', id: 'Favourite' },
                    { text: '个人资料', handler: 'popSubWindow', id: 'Profile' },
                ]
            },
            {
                cls: 'header-bar-icon',
                style: {
                    'height': '36px',
                    'width': '36px'
                },
                iconCls:'x-fa fa-sign-out',
                tooltip: '注销',
                handler: 'logout'
            },
        ]
    },{
        region: 'west',
        id: 'global-treepanel',
        width: 250,
        split: {
            size: 5
        },
        reference: 'treelistContainer',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        cls: 'treelist-with-nav',
        border: false,
        scrollable: 'y',
        items: [
            navigationTree = new Ext.list.Tree({
                xtype: 'treelist',
                reference: 'navigationTreeList',
                itemId: 'navigationTreeList',
                id: 'main-view-navigationtree',
                ui: 'navigation',
                store: sysNavigationTree = Ext.create('iFlat.store.main.Main'),
                expanderFirst: false,
                expanderOnly: false,
                listeners: {
                    selectionchange: 'onNavigationTreeSelectionChange',
                }
            })
        ],
    }, {
        region: 'center',
        xtype: 'tabpanel',
        flex: 1,
        id: 'main-view-tabpanel',
        listeners: {
            //移除标签时触发
            remove: 'onTabPanelRemoveComponent',
            beforeadd: 'beforeTabPanelAdd',
        },
        items: [{
            title: '首页',
            itemId: 'home',
            closable: false,
            tbar: ['->', {
                text: '联系我们',
                id: 'ContactUs',
                handler: 'popSubWindow',
            }]
        }]
    }]
});