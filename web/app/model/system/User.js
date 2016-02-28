Ext.define('iFlat.model.system.User', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'user.userId', mapping: 'userId', type: 'string'},
        {name: 'user.account', mapping: 'account', type: 'string'},
        {name: 'user.userName', mapping: 'userName', type: 'string'},
        {name: 'user.orgId', mapping: 'orgId', type: 'string'},
        {name: 'user.title', mapping: 'title', type: 'string'},
        {name: 'user.status', mapping: 'status', type: 'boolean'},
        {name: 'user.sequence', mapping: 'sequence', type: 'string'},
        {name: 'user.officeTel', mapping: 'officeTel', type: 'string'},
        {name: 'user.homeTel', mapping: 'homeTel', type: 'string'},
        {name: 'user.mobileTel', mapping: 'mobileTel', type: 'string'},
        {name: 'user.email', mapping: 'email', type: 'string'},
        {name: 'user.address', mapping: 'address', type: 'string'},
        {name: 'user.qq', mapping: 'qq', type: 'string'},
        {name: 'user.skype', mapping: 'skype', type: 'string'},
        {name: 'user.fax', mapping: 'fax', type: 'string'},
        {name: 'user.rank', mapping: 'rank', type: 'string'},
        {name: 'user.comment', mapping: 'comment', type: 'string'}
    ]
});