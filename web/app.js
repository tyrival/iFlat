/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
var application = new Ext.application({
    name: 'iFlat',

    extend: 'iFlat.Application',

    paths: {
        'ux': '/ext/packages/ux/classic/src',
        'charts': '/ext/packages/charts/classic/src'
    },

    requires: [
        'iFlat.view.main.Main',
        'Ext.ux.grid.Printer'
    ],

    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
    mainView: 'iFlat.view.main.Main'
	
    //-------------------------------------------------------------------------
    // Most customizations should be made to iFlat.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
Ext.Ajax.on('requestcomplete',function(conn,response,options) {
    var result = Ext.JSON.decode(response.responseText);
    if(result['flag'] == "session") {
        Ext.Msg.alert('提示', '您的上一次登陆已超时，请重新登录。', function(){
            parent.location.href = 'index.jsp';
        });
    }
    if(result['flag'] == "online") {
        Ext.Msg.alert('提示', '您的账号已在别处登陆，请重新登陆。', function(){
            parent.location.href = 'index.jsp';
        });
    }
    if(result['flag'] == "forbidden") {
        Ext.Msg.show({
            title:'提示',
            message: '您没有进行此操作的权限！',
        });
    }
});
Ext.form.action.Action.override({
    success: function (form, action) {
        Flat.util.tip(action.response.responseText);
        var win = Ext.WindowManager.getActive();
        if (win && win.isXType('window')) {
            win.close();
        };
        var store = Ext.getCmp('main-view-tabpanel').getActiveTab().getStore();
        if (store) {
            store.reload();
        }
    },
    failure: function (form, action) {
        Flat.util.tip(action.response.responseText);
    }
})