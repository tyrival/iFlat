Ext.define('iFlat.model.dh.Reply', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'post.id', mapping: 'id', type: 'string'},
        {name: 'post.postId', mapping: 'postId', type: 'string'},
        {name: 'post.content', mapping: 'content', type: 'string'},
        {name: 'post.attachment', mapping: 'attachment', type: 'string'},
        {name: 'post.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'post.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'post.createTime', mapping: 'createTime', type: 'date'},
    ]
});