var Flat = {
    util: {
        calcSeniority: function (account) {
            if (account) {
                var startWorkingYear = parseInt(account.substring(1, 5));
                return new Date().getFullYear() - startWorkingYear;
            } else {
                return 0;
            }
        },

        calcAge: function (birth) {
            if (birth) {
                return new Date().getFullYear() - birth.getFullYear();
            } else {
                return 0;
            }
        },

        printPage: function (html) {
            var win = window.open('/print.html');
            win.document.open();
            win.document.write('<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" type="text/css" href="/css/amazeui.css"></head><body><div class="am-print-hide"><button type="button" href="javascript:void(0);" class="am-btn am-btn-secondary am-btn-block" onclick="window.print();">打印</button></div>' + html + '</body></html>');
            win.document.close();
        },

        printGrid: function (grid, title, head, foot) {
            if (grid) {
                if (title) {
                    Ext.ux.grid.Printer.mainTitle = title;
                }
                if (head) {
                    Ext.ux.grid.Printer.head = head;
                }
                if (foot) {
                    Ext.ux.grid.Printer.foot = foot;
                }
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
                Ext.example.msg("提醒", result.message, result.time);
                //Ext.example.msg(result.title, result.message, result.time);
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
        arrayToUrlParamList: function (array, paramName, isExtModel, isObject) {
            if (!array instanceof Array) {
                return null;
            }
            var result = new Object();
            if (array == null || array.length == 0) {
                Ext.Msg.show({
                    title:'提示',
                    message: '请先勾选记录，然后才可进行操作。',
                })
                return null;
            }
            for (var i = 0; i < array.length; i++) {
                var obj;
                if (isExtModel === true) {
                    obj = array[i].getData();
                    var attribute;
                    for (attribute in obj) {
                        result[paramName + "[" + i + "]." + attribute] = obj[attribute];
                    }
                } else {
                    obj = array[i];
                    if (isObject === false) {
                        result[paramName + "[" + i + "]"] = obj;
                    } else {
                        var attribute;
                        for (attribute in obj) {
                            result[paramName + "[" + i + "]." + attribute] = obj[attribute];
                        }
                    }
                }
            }
            return result;
        }
    }
}; 