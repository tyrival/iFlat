Ext.define('iFlat.model.dh.Post', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'post.id', mapping: 'id', type: 'string'},
        {name: 'post.type', mapping: 'type', type: 'string'},
        {name: 'post.system', mapping: 'system', type: 'string'},
        {name: 'post.description', mapping: 'description', type: 'string'},
        {name: 'post.attachment', mapping: 'attachment', type: 'string'},
        {name: 'post.comment', mapping: 'comment', type: 'string'},
        {name: 'post.tel', mapping: 'tel', type: 'string'},
        {name: 'post.dept', mapping: 'dept', type: 'string'},
        {name: 'post.status', mapping: 'status', type: 'string'},
        {name: 'post.creatorAcc', mapping: 'creatorAcc', type: 'string'},
        {name: 'post.creatorName', mapping: 'creatorName', type: 'string'},
        {name: 'post.createTime', mapping: 'createTime', type: 'date'},
        {name: 'post.handlerAcc', mapping: 'handlerAcc', type: 'string'},
        {name: 'post.handlerName', mapping: 'handlerName', type: 'string'},
        {name: 'post.workhour', mapping: 'workhour', type: 'number'},
        {name: 'post.reason', mapping: 'reason', type: 'string'},
    ]
});