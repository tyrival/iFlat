Ext.define('iFlat.model.report.wip.manhour.DetailOfMiscWo', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'woId', type: 'string'},
        {name: 'type', type: 'string'},
        {name: 'reason', type: 'string'},
        {name: 'content', type: 'string'},
        {name: 'manhour', type: 'integer'},
        {name: 'projectCode', type: 'string'},
        {name: 'projectName', type: 'string'},
        {name: 'orgName', type: 'string'},
        {name: 'teamName', type: 'string'},
        {name: 'groupName', type: 'string'},
        {name: 'createTime', type: 'date'},
        {name: 'personInCharge', type: 'string'},
    ]
})
