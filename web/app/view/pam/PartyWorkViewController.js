Ext.define('iFlat.view.pam.PartyWorkViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pam-partyworkview',

    onPartyBranchClick: function(tree, record, tr, rowIndex, e, eOpts) {
        var pb = record.get('text');
        pamPartyWorkViewMonthNodeStore.getProxy().extraParams['monthlyWork.pbName'] = pb;
        pamPartyWorkViewMonthNodeStore.reload();
        pamPartyWorkViewYearPlanNodeStore.getProxy().extraParams['yearWork.pbName'] = pb;
        pamPartyWorkViewYearPlanNodeStore.reload();
        pamPartyWorkViewYearSumNodeStore.getProxy().extraParams['yearWork.pbName'] = pb;
        pamPartyWorkViewYearSumNodeStore.reload();
    },

    onMonthClick: function (grid, record, index, op) {
        Ext.getCmp('pam-partyworkview-month-form').loadRecord(record);
    },

    onAttachmentChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-partyworkview-att').show();
            Ext.getCmp('pam-partyworkview-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-partyworkview-att').hide();
            Ext.getCmp('pam-partyworkview-link').setHref('');
        }
    },

    onYearPlanClick: function (grid, record, index, op) {
        Ext.getCmp('pam-partyworkview-year-plan-form').loadRecord(record);
    },

    onAttachmentChangeYearPlanChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-partyworkview-year-plan-att').show();
            Ext.getCmp('pam-partyworkview-year-plan-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-partyworkview-year-plan-att').hide();
            Ext.getCmp('pam-partyworkview-year-plan-link').setHref('');
        }
    },

    onYearSumClick: function (grid, record, index, op) {
        Ext.getCmp('pam-partyworkview-year-sum-form').loadRecord(record);
    },

    onAttachmentChangeYearSumChange: function(field, newValue, oldValue, eOpts) {
        if (newValue && newValue != '') {
            Ext.getCmp('pam-partyworkview-year-sum-att').show();
            Ext.getCmp('pam-partyworkview-year-sum-link').setHref(newValue);
        } else {
            Ext.getCmp('pam-partyworkview-year-sum-att').hide();
            Ext.getCmp('pam-partyworkview-year-sum-link').setHref('');
        }
    },
    rejectMonthlyWork: function (btn) {
        Ext.Msg.confirm("提示!","退回后该记录不可见，除非支部重新提交，是否退回?",function(btn) {
            if(btn=="yes") {
                var form = Ext.getCmp('pam-partyworkview-month-form');
                var id = form.down('textfield[name=monthlyWork.id]').getValue();
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'pam_rejectMonthlyWork.action?monthlyWork.id=' + id,
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamPartyWorkViewMonthNodeStore.reload();
                        form.reset();
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamPartyWorkViewMonthNodeStore.reload();
                        form.reset();
                    }
                })
            };
        })

    },
    
    rejectYearWorkPlan: function (btn) {
        Ext.Msg.confirm("提示!","退回后该记录不可见，除非支部重新提交，是否退回?",function(btn) {
            if(btn=="yes") {
                var form = Ext.getCmp('pam-partyworkview-year-plan-form');
                var id = form.down('textfield[name=yearWork.id]').getValue();
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'pam_rejectYearWork.action?yearWork.id=' + id,
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamPartyWorkViewYearPlanNodeStore.reload();
                        form.reset();
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamPartyWorkViewYearPlanNodeStore.reload();
                        form.reset();
                    }
                })
            };
        })

    },
    
    rejectYearWorkSum: function (btn) {
        Ext.Msg.confirm("提示!","退回后该记录不可见，除非支部重新提交，是否退回?",function(btn) {
            if(btn=="yes") {
                var form = Ext.getCmp('pam-partyworkview-year-sum-form');
                var id = form.down('textfield[name=yearWork.id]').getValue();
                Flat.util.mask();
                Ext.Ajax.request({
                    url: 'pam_rejectYearWork.action?yearWork.id=' + id,
                    success: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamPartyWorkViewYearSumNodeStore.reload();
                        form.reset();
                    },
                    failure: function (response, opts) {
                        Flat.util.unmask();
                        Flat.util.tip(response.responseText);
                        pamPartyWorkViewYearSumNodeStore.reload();
                        form.reset();
                    }
                })
            };
        })

    },
    
})