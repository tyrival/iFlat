Ext.define('iFlat.view.report.wip.manhour.DetailOfMiscWo', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.system-detailofmiscwo',
    xtype: 'system-detailofmiscwo',

    controller: 'system-detailofmiscwo',
    store: rptDetailOfMiscWoStore = Ext.create('iFlat.store.report.wip.manhour.DetailOfMiscWo'),
    id: 'system-detailofmiscwo',
    tbar: [{
        text: '新增',
        id: 'system-detailofmiscwo-add',
        ui: 'orig-blue',
        //handler: 'addOrgRecord',
    }, '->', {
        text: '刷新',
        id: 'system-detailofmiscwo-refresh',
        //handler: 'refreshList',
    }],
    columns: [{
        header: '派工单类型',
        dataIndex: 'type',
    }, {
        header: '船号',
        dataIndex: 'projectCode',
    }, {
        header: '船名',
        dataIndex: 'projectName',
    }, {
        header: '派工原因',
        dataIndex: 'reason',
    }, {
        header: '派工内容',
        dataIndex: 'content',
    }, {
        header: '定额工时',
        dataIndex: 'manhour',
    }, {
        header: '本工/工程队',
        dataIndex: 'teamName',
    }, {
        header: '施工班组',
        dataIndex: 'groupName',
    }, {
        header: '施工部门',
        dataIndex: 'orgName',
    }, {
        header: '派工人员',
        dataIndex: 'personInCharge',
    }, {
        header: '开单时间',
        dataIndex: 'createTime',
    }, {
        header: '派工单号',
        dataIndex: 'woId',
    }],

})