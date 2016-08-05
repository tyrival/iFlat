Ext.define('iFlat.view.pam.MemberDistController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-memberdist',

    cellclick: function (grid, td, cellIndex, record, tr, rowIndex, e, opt) {
        var c;
        var prop;
        var id;
        switch (cellIndex) {
            case 1:
                c = "MemberFull";
                prop = 'pamMember';
                break;
            case 2:
                c = "MemberProb";
                prop = 'pamMember';
                break;
            case 3:
                c = "Applicant";
                prop = 'applicant';
                break;
            case 4:
                c = "Activist";
                prop = 'activist';
                break;
        }
        if (!Flat.util.isEmpty(c)) {
            id = 'pam-' + c.toLowerCase() + 'list';
            var win = Ext.getCmp(id);
            if(!win) {
                var grid = Ext.create('iFlat.view.pam.' + c + 'List');
                win = Ext.create('Ext.window.Window', {
                    title: '清单',
                    closeAction: 'hide',
                    id: id,
                    layout: 'fit',
                    modal: true,
                    height: '95%',
                    width: '95%',
                    y: 20,
                    items: grid
                });
                
            }
            var store = win.down('grid').getStore();
            store.getProxy().extraParams[prop + '.pbName'] = record.data['memberDist.pbName'];
            store.reload();
            win.show();
        }
    },

    refreshList: function(btn) {
        pamMemberDistStore.reload();
    },
    
})