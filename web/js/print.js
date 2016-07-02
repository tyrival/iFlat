var Print = {

    fineHtml: function (m) {
        var type = m['type'];
        if (!type) {
            type = '施工质量';
        }
        if (type != '计划执行' && type != '设备能源' && type != '其他' && type != '施工质量') {
            type = '安全5S';
        }
        return '<h1 style="text-align: center">船体车间工程考核单</h1>'
            + '<table class="am-table am-table-bordered am-table-centered" style="margin-bottom: 0">'
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
            + ' <td colspan="6" style="word-wrap:break-word;word-break:break-all;">'
            + '说明：' + m['description']
            + '</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>'
            + '<table class="am-table">'
            + '<tbody>'
            + '<tr>'
            + '<td>签发人：</td>'
            + '<td>审核：</td>'
            + '<td>审批：</td>'
            + '</tr>'
            + '</tbody>'
            + '</table>';
    },
    fine: function (model, type) {
        Flat.util.printPage(this.fineHtml(model));
    },

    headHtml: '<!DOCTYPE html><html lang="en"><head><link rel="stylesheet" type="text/css" href="/css/amazeui.min.css"></head><body><div class="am-print-hide"><button type="button" href="javascript:void(0);" class="am-btn am-btn-secondary am-btn-block" onclick="window.print();">打印</button></div>',
    footHtml: '</body></html>'
}