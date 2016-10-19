var Print = {

    outsourceApprHtml: function (m, b, p) {

        var bidding = '';
        for(var i = 0; i < b.length; i++) {
            bidding = bidding + '<tr>'
                + '<td colspan="2">' + (b[i].getData())['vendor'] + '</td>'
                + '<td colspan="2">' + (b[i].getData())['amount'] + '</td>'
                + '<td colspan="2">' + (b[i].getData())['comment'] + '</td>'
                + '</tr>'
        }
        bidding += '<tr><td colspan="6" style="word-wrap:break-word;word-break:break-all;text-align:left">说明：' + m['conComment'] + '</td></tr>';

        var process = '';
        for(var i = 0; i < p.length; i++) {
            process = process + '<tr>'
                + '<td>' + (p[i].getData())['date'].substring(0, 10) + '</td>'
                + '<td colspan="6">' + (p[i].getData())['description'] + '</td>'
                + '</tr>'
        }

        var h;
        h = '<h1 style="text-align: center">修船外协外包审批表</h1>'
            + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: -1px;margin-top: 0;">'
            + '<tbody>'
            + '<tr>'
            + '<td>船名</td>'
            + '<td>' + m['projName'] + '</td>'
            + '<td>工程内容</td>'
            + '<td colspan="5">' + m['name'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td rowspan="' + (b.length + 4) + '">业务申请</td>'
            + '<td>申请</td>'
            + '<td>' + m['creatorName'] + '</td>'
            + '<td>项目审核</td>'
            + '<td>' + m['auditorName'] + '</td>'
            + '<td>推荐</td>'
            + '<td colspan="3">' + m['vendor'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td rowspan="' + (b.length + 2) + '">供方选择</td>'
            + '<td colspan="2">供应商</td><td colspan="2">报价</td><td colspan="2">备注</td>'
            + '</tr>'
            + bidding
            + '<tr>'
            + '<td>经办人</td>'
            + '<td>' + m['operatorName'] + '</td>'
            + '<td>议标金额</td>'
            + '<td>' + m['bidAmountSecond'] + '</td>'
            + '<td>备注</td>'
            + '<td colspan="2">' + m['bidComment'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td rowspan="3">业务审批</td>'
            + '<td>项目经营代表</td>'
            + '<td>' + m['saleName'] + '</td>'
            + '<td>经营意见</td>'
            + '<td colspan="3">' + m['saleOpinion'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>科室长审批</td>'
            + '<td colspan="6">' + m['signorName'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>部门审批</td>'
            + '<td colspan="6">' + m['bdDirectorName'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td rowspan="' + (p.length + 1) + '">过程记录</td>'
            + '<td>日期</td><td colspan="6">描述</td>'
            + '</tr>'
            + process
            + '</tbody>'
            + '</table>';

        return h;
    },
    outsourceAppr: function (model, bidding, process) {
        Flat.util.printPage(this.outsourceApprHtml(model, bidding, process));
    },

    outsourceHtml: function (m, d) {
        var type = m['type'];
        var h;
        var detail = '<tr>'
                + '<td style="text-align:center;width:10%">序号</td>'
                + '<td style="text-align:center;width:25%">名称</td>'
                + '<td style="text-align:center;width:25%">型号及规格</td>'
                + '<td style="text-align:center;width:10%">单位</td>'
                + '<td style="text-align:center;width:10%">数量</td>'
                + '<td style="text-align:center;width:20%">备注</td>'
                + '</tr>';
        for(var i = 0; i < d.length; i++) {
            detail = detail + '<tr>'
                + '<td style="text-align:center">' + (i + 1) + '</td>'
                + '<td style="word-wrap:break-word;word-break:break-all;text-align:left">' + (d[i].getData())['content'] + '</td>'
                + '<td style="word-wrap:break-word;word-break:break-all;text-align:left">' + (d[i].getData())['specs'] + '</td>'
                + '<td style="text-align:center">' + (d[i].getData())['unit'] + '</td>'
                + '<td style="text-align:center">' + (d[i].getData())['qty'] + '</td>'
                + '<td style="word-wrap:break-word;word-break:break-all;text-align:left">' + (d[i].getData())['comment'] + '</td>'
                + '</tr>'
        }
        if (type == '外包') {

            h = '<h1 style="text-align: center">外包工程申请单</h1>'
                + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: -1px;margin-top: 0;">'
                + '<tbody>'
                + '<tr>'
                + '<td>船名</td>'
                + '<td>' + m['projName'] + '</td>'
                + '<td>工号</td>'
                + '<td>' + m['projNo'] + '</td>'
                + '<td>施工单位</td>'
                + '<td>' + m['dept'] + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>外包工程名称</td>'
                + '<td colspan="5">' + m['name'] + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>外包性质</td>'
                + '<td colspan="5">' + m['matSource'] + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: -1px;margin-top: 0;">'
                + '<tbody>'
                + detail
                + '</tbody>'
                + '</table>'
                + '</table>'
                + '<table class="am-table"">'
                + '<tbody>'
                + '<tr>'
                + '<td style="width:33%">申请人：' + m['creatorName'] + '</td>'
                + '<td style="width:33%">审核：' + m['auditorName'] + '</td>'
                + '<td style="width:33%">签收：' + m['signorName'] + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';
        }

        if (type == '外协') {
            h = '<h1 style="text-align: center">外协申请计划表</h1>'
                + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: -1px;margin-top: 0;">'
                + '<tbody>'
                + '<tr>'
                + '<td>工程类别</td>'
                + '<td></td>'
                + '<td>工程项目</td>'
                + '<td>' + m['projName'] + '</td>'
                + '<td>工程编号</td>'
                + '<td>' + m['projNo'] + '</td>'
                + '</tr>'
                + '<tr>'
                + '<td>资金来源</td>'
                + '<td>' + m['capitalSource'] + '</td>'
                + '<td>施工单位</td>'
                + '<td>' + m['dept'] + '</td>'
                + '<td>要求交货期</td>'
                + '<td>' + m['tod'].substring(0, 10) + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>'
                + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: -1px;margin-top: 0;">'
                + '<tbody>'
                + detail
                + '</tbody>'
                + '</table>'
                + '</table>'
                + '<table class="am-table"">'
                + '<tbody>'
                + '<tr>'
                + '<td style="width:33%">申请(主修)：' + m['creatorName'] + '</td>'
                + '<td style="width:33%">审核（总管）：' + m['auditorName'] + '</td>'
                + '<td style="width:33%">签收：' + m['signorName'] + '</td>'
                + '</tr>'
                + '</tbody>'
                + '</table>';
        }
        return h;
    },
    outsource: function (model, detail) {
        Flat.util.printPage(this.outsourceHtml(model, detail));
    },

    fineHtml: function (m) {
        var issuer = m['issuer'];
        if (Flat.util.isEmpty(issuer)) {
            issuer = m['creatorName'];
        }
        if (Flat.util.isEmpty(issuer)) {
            issuer = m['creator'];
        }
        var type = m['type'];
        if (!type) {
            type = '施工质量';
            issuer = m['qc'];
        }
        if (type != '计划执行' && type != '设备能源' && type != '其他' && type != '施工质量') {
            type = '安全5S';
        }
        var h = '<h1 style="text-align: center">船体车间工程考核单</h1>'
            + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: 0;margin-top: 0;">'
            + '<tbody>'
            + '<tr>'
            + '<td>单位/班组</td>'
            + '<td colspan="3">' + m['team'] + '</td>'
            + '<td>姓名</td>'
            + '<td>' + m['personName'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>工程项目</td>'
            + '<td colspan="3">' + m['projName'] + '</td>'
            + '<td>日期</td>'
            + '<td>' + m['date'].substring(0, 10) + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>考核类别</td>'
            + '<td colspan="5">' + type + '</td>'
            + '</tr>'
            + ' <tr>'
            + '<td>处罚金额</td>'
            + '<td colspan="3">' + m['amount'] + '</td>'
            + '<td>扣分</td>'
            + '<td>' + m['score'] + '</td>'
            + '</tr>'
            + '<tr>'
            + ' <td colspan="6" style="word-wrap:break-word;word-break:break-all;text-align:left;height: 170px">'
            + '说明：' + m['description']
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '<table class="am-table"">'
            + '<tbody>'
            + '<tr>'
            + '<td style="width:35%">签发人：' + issuer + '</td>'
            + '<td>审核：</td>'
            + '<td>审批：</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>';
        return h + h;
    },
    fine: function (model) {
        Flat.util.printPage(this.fineHtml(model));
    },

    creditHtml: function (m) {

        var h = '<h1 style="text-align: center;margin-top: 20px">员工日常绩效负面发现记录表</h1>'
            + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: 0">'
            + '<tbody>'
            + '<tr>'
            + '<td>责任部门</td>'
            + '<td colspan="7">' + m['creatorDept'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>单位</td>'
            + '<td colspan="3">' + m['dept'] + '-' + m['team'] + '</td>'
            + '<td>负责人</td>'
            + '<td>' + m['manager'] + '</td>'
            + '<td>区域</td>'
            + '<td>' + m['area'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>类型</td>'
            + '<td colspan="7">' + m['type'] + '</td>'
            + '</tr>'
            + ' <tr>'
            + '<td>负面发现描述</td>'
            + '<td colspan="7" style="word-wrap:break-word;word-break:break-all;text-align:left;height:70px">' + m['description'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>处理情况</td>'
            + '<td colspan="7" style="word-wrap:break-word;word-break:break-all;text-align:left;height:70px">' + m['feedback'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>区域长</td>'
            + '<td colspan="3">' + m['areaMgr'] + '</td>'
            + '<td>总管</td>'
            + '<td>' + m['projMgr'] + '</td>'
            + '<td>主管</td>'
            + '<td>' + m['profMgr'] + '</td>'
            + '</tr>'
            + '<tr>'
            + '<td>作业长</td>'
            + '<td>' + m['workMgr'] + '</td>'
            + '<td>班组长</td>'
            + '<td>' + m['groupMgr'] + '</td>'
            + '<td>责任人</td>'
            + '<td>' + m['personName'] + '</td>'
            + '<td>证件号</td>'
            + '<td>' + m['personAcc'] + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '<table class="am-table">'
            + '<tbody>'
            + '<tr>'
            + '<td>签发部门负责人：</td>'
            + '<td>记录人：' + m['creatorName'] + '</td>'
            + '<td>日期：' + m['date'].substring(0, 10) + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>';
        return h + h;
    },
    credit: function (model) {
        Flat.util.printPage(this.creditHtml(model));
    },

    headHtml: '<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" type="text/css" href="/css/amazeui.css"></head><body><div class="am-print-hide"><button type="button" href="javascript:void(0);" class="am-btn am-btn-secondary am-btn-block" onclick="window.print();">打印</button></div>',
    footHtml: '</body></html>'
}