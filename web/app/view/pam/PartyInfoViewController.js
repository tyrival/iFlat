Ext.define('iFlat.view.pam.PartyInfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-partyinfoview',

    onPartyBranchClick: function(tree, record, tr, rowIndex, e, eOpts) {
        var pb = record.get('text');
        Ext.getCmp('pam-partyinfoview-general-form').down('textfield[name=pamGeneral.pbName]').setValue(pb);
        pamPartyInfoCommitteeStore.getProxy().extraParams['committee.pbName'] = pb;
        pamPartyInfoCommitteeStore.reload();
        pamPartyInfoPartyGroupStore.getProxy().extraParams['partyGroup.pbName'] = pb;
        pamPartyInfoPartyGroupStore.reload();
        pamPartyInfoMemberFullStore.getProxy().extraParams['pamMember.pbName'] = pb;
        pamPartyInfoMemberFullStore.reload();
        pamPartyInfoMemberProbStore.getProxy().extraParams['pamMember.pbName'] = pb;
        pamPartyInfoMemberProbStore.reload();
        pamPartyInfoActivistStore.getProxy().extraParams['activist.pbName'] = pb;
        pamPartyInfoActivistStore.reload();
        pamPartyInfoApplicantStore.getProxy().extraParams['applicant.pbName'] = pb;
        pamPartyInfoApplicantStore.reload();
    },

    onGeneralPbNameChange: function (tf, newV, oldV, op) {
        if (Flat.util.isEmpty(newV)) {
            var store = Ext.create('iFlat.store.pam.General', {
                'pamGeneral.pbName': newV
            });
            store.reload({
                callback: function (records, operation, success) {
                    if (records != null && records.length > 0) {
                        Ext.getCmp('pam-partyinfoview-general-form').loadRecord(records[0]);
                    }
                }
            })
        }
    },

    showCommitteeInfo: function(grid, rowIndex, colIndex, actionItem, event, record, row) {
        var win = Ext.getCmp('pam-committeeinfo');
        if(!win) {
            win = Ext.create('iFlat.view.pam.CommitteeInfo');
        }
        var form = win.down('form[id=pam-committeeinfo-form]');
        form.loadRecord(record);
        if (record.get('id')) {
            pamPartyInfoCommitteeDetailStore.getProxy().extraParams['committeeDetail.pid'] = record.get('id');
            pamPartyInfoCommitteeDetailStore.reload();
        }
        win.show();
    },


})