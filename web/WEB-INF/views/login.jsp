<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>中船澄西 - iFlat</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="stylesheet" href="/css/amazeui.min.css"/>
    <style>
        .header {
            text-align: center;
        }
        .header h1 {
            font-size: 200%;
            color: #333;
            margin-top: 30px;
        }
        .header p {
            font-size: 14px;
        }
    </style>
    ﻿<!--[if !IE]><!-->
    <script src="/js/jQuery/jquery-2.1.4.min.js"></script>
    <!--<![endif]-->

    ﻿<!--[if gte IE 9]>
    <script src="/js/jQuery/jquery-2.1.4.min.js"></script>
    <![endif]-->

    <!--[if lt IE 9]>
    <script src="/js/jQuery/jquery-1.11.3.min.js"></script>
    <script src="/js/AmazeUI/modernizr.js"></script>
    <script src="/js/AmazeUI/amazeui.ie8polyfill.min.js"></script>
    <![endif]-->
    <script src="/js/AmazeUI/amazeui.min.js"></script>
</head>
<body>
<!--[if lt IE 9]>
<p>您的IE浏览器版本过低，为保证更好的用户体验，请使用以下浏览器：</p>
<p>Windows自带的IE10、IE11、IE12、Edge</p>
<p>遨游、QQ、TheWorld等国产浏览器</p>
<p>Chrome、FireFox、Safari等</p>
<a href="/resources/maxthon.exe">遨游浏览器 下载</a>
<![endif]-->
<div class="header">
    <div class="am-g">
        <h1>中船澄西</h1>
    </div>
    <hr />
</div>
<div class="am-g">
    <div class="am-u-lg-4 am-u-md-6 am-u-sm-centered">
        <form action="main.action" method="post" class="am-form" data-am-validator>
            <fieldset>
                <h5 id="message" class="am-text-danger">${message}</h5>
                <input type="text" id="account" name="user.account" minlength="2" maxlength="10" placeholder="用户名">
                <br/>
                <input type="password" id="password" name="user.password" placeholder="密码" required>
                <br/>
                <label for="remember">
                    <input id="remember" type="checkbox">
                    记住密码
                </label>
                <br/>
                <%--<s:token/>--%>
                <div class="am-cf">
                    <input type="submit" value="登 录" class="am-btn am-btn-primary am-fl am-btn-block" onclick="SetPwdAndChk()">
                </div>
            </fieldset>

        </form>
    </div>
</div>
</body>
<script type="text/javascript">
    window.onload=function onLoginLoaded() {
        //获取cookie中上次登录的用户
        GetLastUser();
    }

    function GetLastUser() {
        var id = "iFlat";//GUID标识符
        var usr = GetCookie(id);
        if (usr != null) {
            document.getElementById('account').value = usr;
        } else {
            document.getElementById('account').value = "";
        }
        var msg = document.getElementById('message').innerHTML;
        if(msg == '') {
            //加载页面时获取最后一个用户名的密码
            GetPwdAndChk();
        }
        else if(msg == '用户名或密码错误。') {
            //输错密码后，重新加载页面时不加载密码，且将现有错误密码清空
            ResetCookie();
        }

    }

    //点击登录时触发客户端事件
    function SetPwdAndChk() {
        //取用户名
        var usr = document.getElementById('account').value;
        //将最后一个用户信息写入到Cookie
        SetLastUser(usr);
        //如果记住密码选项被选中
        if (document.getElementById('remember').checked == true) {
            //取密码值
            var pwd = document.getElementById('password').value;
            var expdate = new Date();
            expdate.setTime(expdate.getTime() + 1000 * (24 * 60 * 60 * 1000));
            //将用户名和密码写入到Cookie
            SetCookie(usr, pwd, expdate);
        } else {
            //如果没有选中记住密码,则立即过期
            ResetCookie();
        }
    }

    function SetLastUser(usr) {
        var id = "iFlat";
        var expdate = new Date();
        //当前时间加上两周的时间
        expdate.setTime(expdate.getTime() + 14 * (24 * 60 * 60 * 1000));
        SetCookie(id, usr, expdate);
    }

    //用户名失去焦点时调用该方法（未设置）
    function GetPwdAndChk() {
        var usr = document.getElementById('account').value;
        var pwd = GetCookie(usr);
        if (pwd != null) {
            document.getElementById('remember').checked = true;
            document.getElementById('password').value = pwd;
        } else {
            document.getElementById('remember').checked = false;
            document.getElementById('password').value = "";
        }
    }
    //取Cookie的值
    function GetCookie(name) {
        var arg = name + "=";
        var alen = arg.length;
        var clen = document.cookie.length;
        var i = 0;
        while (i < clen) {
            var j = i + alen;
            //alert(j);
            if (document.cookie.substring(i, j) == arg) return getCookieVal(j);
            i = document.cookie.indexOf(" ", i) + 1;
            if (i == 0) break;
        }
        return null;
    }

    function getCookieVal(offset) {
        var endstr = document.cookie.indexOf(";", offset);
        if (endstr == -1) endstr = document.cookie.length;
        return unescape(document.cookie.substring(offset, endstr));
    }
    //写入到Cookie

    function SetCookie(name, value, expires) {
        var argv = SetCookie.arguments;
        //本例中length = 3
        var argc = SetCookie.arguments.length;
        var expires = (argc > 2) ? argv[2] : null;
        var path = (argc > 3) ? argv[3] : null;
        var domain = (argc > 4) ? argv[4] : null;
        var secure = (argc > 5) ? argv[5] : false;
        document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) + ((path == null) ? "" : ("; path=" + path)) + ((domain == null) ? "" : ("; domain=" + domain)) + ((secure == true) ? "; secure" : "");
    }

    function ResetCookie() {
        var usr = document.getElementById('account').value;
        var expdate = new Date();
        SetCookie(usr, null, expdate);
    }
</script>
</html>