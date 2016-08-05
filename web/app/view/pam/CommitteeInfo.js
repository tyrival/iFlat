Ext.define('iFlat.view.pam.CommitteeInfo', {
    extend: 'Ext.window.Window',
    alias: 'widget.pam-committeeinfo',
    title: '党委会',
    layout: 'fit',
    modal: true,

    height: '95%',
    width: '95%',
    id: 'pam-committeeinfo',
    closeAction: 'hide',
    items: [{
        xtype: 'container',
        padding: '15 15 0 15',
        scrollable: 'y',
        layout: {
            type: 'vbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'form',
            id: 'pam-committeeinfo-form',
            fieldDefaults: {
                labelAlign: 'right',
                labelWidth: 80,
            },
            items: [{
                xtype: 'container',
                layout: 'hbox',
                items: [{
                    xtype: 'datefield',
                    name: 'committee.electionTime',
                    editable: false,
                    fieldLabel: '改选日期',
                    format: 'Y-m-d',
                    width: 240,
                }, {
                    xtype: 'textfield',
                    name: 'committee.id',
                    fieldLabel: 'ID',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    name: 'committee.pbName',
                    fieldLabel: '党支部',
                    hidden: true
                }]
            }]
        }, {
            xtype: 'panel',
            minHeight: 300,
            flex: 1,
            border: false,
            margin: '30 0 5 0',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            items: [{
                xtype: 'gridpanel',
                width: '100%',
                scrollable: true,
                store: pamPartyInfoCommitteeDetailStore = Ext.create('iFlat.store.pam.CommitteeDetail'),
                border: true,
                columnLines: true,

                columns: [{
                    header: '职务',
                    width: 120,
                    dataIndex: 'committeeDetail.title',
                }, {
                    header: '姓名',
                    width: 120,
                    dataIndex: 'committeeDetail.name',
                }, {
                    header: '性别',
                    width: 80,
                    dataIndex: 'committeeDetail.sex',
                }, {
                    header: '文化程度',
                    width: 120,
                    dataIndex: 'committeeDetail.degree',
                }, {
                    header: '出生年月',
                    width: 120,
                    dataIndex: 'committeeDetail.birth',
                    formatter: 'date("Y-m")',
                }, {
                    header: '行政职务',
                    width: 120,
                    dataIndex: 'committeeDetail.adminTitle',
                }, {
                    header: '联系电话',
                    flex: 1,
                    dataIndex: 'committeeDetail.tel',
                }, ],
            }]
        }],
    }],
});