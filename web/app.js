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
var Flat = {
    util: {
        printGrid: function (grid) {
            if (!grid) {
                grid = grid.up('grid');
            }
            if (grid) {
                //Ext.ux.grid.Printer.printAutomatically = false;
                Ext.ux.grid.Printer.print(grid);
            } else {
                Ext.example.msg("错误", "找不到需打印的表格，请联系系统管理员", 5000);
            }
        },
        
        mask: function (msg) {
            if (this.isEmpty(msg)) {
                msg = '保存中...'
            }
            Ext.MessageBox.show({ msg: msg, wait:true });
        },

        unmask: function () {
            Ext.MessageBox.hide();
        },
        
        isEmpty: function (str) {
            if (str === undefined || str === null || str ==='') {
                return true;
            }
            return false;
        },
        tip: function (result) {
            if (result) {
                result = Ext.JSON.decode(result);
                Ext.example.msg(result.title, result.message, result.time);
            }
        },
        financeFormat: function (strNum, decimal){
            if (!parseFloat(strNum)) {
                return strNum;
            }
            if (decimal && parseInt(decimal)) {
                strNum = strNum.toFixed(parseInt(decimal));
            }
            if (strNum.length <= 3) {
                return strNum;
            }
            if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
                return strNum;
            }
            var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
            var re = new RegExp();
            re.compile("(\\d)(\\d{3})(,|$)");
            while (re.test(b)) {
                b = b.replace(re, "$1,$2$3");
            }
            return  a + "" + b + "" + c;
        },
        arrayToUrlParamList: function (array, paramName, isExtModel) {
            if (!array instanceof Array) {
                return null;
            }
            var result = new Object();
            for (var i = 0; i < array.length; i++) {
                var obj;
                if (isExtModel === true) {
                    obj = array[i].getData();
                } else {
                    obj = array[i];
                }
                var attribute;
                for (attribute in obj) {
                    result[paramName + "[" + i + "]." + attribute] = obj[attribute];
                }
            }
            return result;
        }
    }
}; 