Ext.define('iFlat.view.main.ContactUs', {
    extend: 'Ext.window.Window',
    alias: 'widget.main-contactus',
    title: '联系方式',
    layout: 'fit',
    modal: true,

    id: 'main-contactus',
    closeAction: 'hide',
    width: 300,
    items: {
        xtype: 'form',
        id: 'main-profile-form',
        margin: 5,
        border: false,
        fieldDefaults: {
            labelAlign: 'left',
            labelWidth: 60
        },
        items: [{
            xtype: 'fieldset',
            html: [
                '<h2>窦培华</h2>',
                '移动电话：137-7160-6646<br />',
                '分机：8070',
            ]
        }, {
            xtype: 'fieldset',
            html: [
                '<h2>梅晓晶</h2>',
                '移动电话：139-1520-2272<br />',
                '分机：8078',
            ]
        }, {
            xtype: 'fieldset',
            html: [
                '<h2>何春梅</h2>',
                '移动电话：139-6167-6316<br />',
                '分机：8078',
            ]
        }, {
            xtype: 'fieldset',
            html: [
                '<h2>赵丽</h2>',
                '移动电话：153-7106-2686<br />',
                '分机：8078',
            ]
        }]


    },
});