<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <title>中船澄西 - iFlat</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="renderer" content="webkit">
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="stylesheet" href="/css/amazeui.min.css"/>
    <link rel="stylesheet" href="/css/admin.css">
</head>
<body>
<div class="am-cf admin-main">
    <div class="admin-sidebar am-offcanvas" id="admin-offcanvas">
        <div class="am-offcanvas-bar admin-offcanvas-bar">
            <ul class="am-list admin-sidebar-list">
                <li><a id="position" href="#">座标 X: 0&nbsp&nbspY: 0</a></li>
                <li class="admin-parent">
                    <a class="am-cf" data-am-collapse="{target: '#rectangle'}"><span class="am-icon-square"></span> 矩形 <span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub" id="rectangle">
                        <br>
                        <label style="width:50px"><small>名称:</small></label><input id="rectName" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>字号:</small></label><input id="rectFont" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>X:</small></label><input id="rectX" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>Y:</small></label><input id="rectY" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>宽:</small></label><input id="rectW" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>高:</small></label><input id="rectH" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>边宽:</small></label><input id="rectL" type="text" style="width:150px"><br>
                        <br><button class="am-btn am-btn-primary am-btn-xs" onclick="iPaint.addRectangle()">增加矩形</button>
                        <br><br>
                    </ul>
                </li>
                <li class="admin-parent">
                    <a class="am-cf" data-am-collapse="{target: '#polygon'}"><span class="am-icon-star"></span> 多边形 <span class="am-icon-angle-right am-fr am-margin-right"></span></a>
                    <ul class="am-list am-collapse admin-sidebar-sub" id="polygon">
                        <br>
                        <div class="am-form-inline" role="form">
                            <div class="am-form-group">
                                <input id="polyDotX" type="text" style="width:70px" placeholder=" X">
                            </div>
                            <div class="am-form-group">
                                <input id="polyDotY" type="text" style="width:70px" placeholder=" Y">
                            </div>
                            <div class="am-form-group" style="width:40px">
                                <button class="am-btn am-btn-primary am-btn-xs" onclick="iPaint.savePolygonDot()">端点 +</button>
                            </div>
                        </div>
                        <div style="width:200px">
                            <table class="am-table am-table-compact">
                                <thead>
                                <tr>
                                    <td colspan="3"><label style="width:50px"><small>端点</small></label></td>
                                </tr>
                                </thead>
                                <tbody id="polygonlist">
                                </tbody>
                            </table>
                        </div>
                        <label style="width:50px"><small>名称:</small></label><input id="polyName" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>字号:</small></label><input id="polyFont" type="text" style="width:150px"><br>
                        <label style="width:50px"><small>边宽:</small></label><input id="polyL" type="text" style="width:150px"><br>
                        <br><button class="am-btn am-btn-primary am-btn-xs" onclick="iPaint.addPolygon()">增加多边形</button>
                        <br><br>
                    </ul>
                </li>
            </ul>
            <div class="am-panel am-panel-default admin-sidebar-panel">
                <button class="am-btn am-btn-primary am-btn-block" data-am-modal="{target: '#ipaint-data', closeViaDimmer: 0}">编辑图形清单</button>
            </div>
        </div>
    </div>
    <div class="admin-content">
        <canvas id="canvas" style="height:100%;">
            当前浏览器不支持HTML5的Canvas，请更换为IE9+、遨游、Firefox、Chrome等浏览器。
        </canvas>
    </div>
    <div class="am-modal am-modal-confirm" tabindex="-1" id="deleteDot-confirm">
        <div class="am-modal-dialog">
            <div class="am-modal-bd">
                确定要删除这条记录吗？
            </div>
            <div class="am-modal-footer">
                <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                <span class="am-modal-btn" data-am-modal-confirm>确定</span>
            </div>
        </div>
    </div>
    <div class="am-modal am-modal-alert" tabindex="-1" id="addDot-alert">
        <div class="am-modal-dialog">
            <div class="am-modal-bd">
                端点座标参数错误！
            </div>
            <div class="am-modal-footer">
                <span class="am-modal-btn">确定</span>
            </div>
        </div>
    </div>
    <div class="am-modal am-modal-prompt" tabindex="-1" id="ipaint-data">
        <div class="am-modal-dialog">
            <div class="am-modal-hd">图形列表</div>
            <div class="am-modal-bd">
                <table class="am-table am-table-bordered am-table-striped am-table-compact">
                    <thead>
                    <tr>
                        <th>名称</th>
                        <th>类型</th>
                        <th>参数</th>
                        <th>线宽</th>
                        <th>字号</th>
                        <th>编辑</th>
                        <th>删除</th>
                    </tr>
                    </thead>
                    <tbody id="ipaint-data-list">
                    </tbody>
                </table>
            </div>
            <div class="am-modal-footer">
                <span class="am-modal-btn" data-am-modal-cancel>取消</span>
                <span class="am-modal-btn" onclick="saveData()">保存</span>
            </div>
        </div>
    </div>
</div>
</body>
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
<script src="/js/iflat/iflat.coordinate.js"></script>
<script src="/js/iflat/iflat.draw.js"></script>
</html>
<%--
缺少功能：
1、增删改查Paint功能
2、与后台交互存取Graph列表
--%>