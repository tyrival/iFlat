Ext.define('iFlat.model.book.Book', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'book.id', mapping: 'id', type: 'string'},
        {name: 'book.category', mapping: 'category', type: 'string'},
        {name: 'book.name', mapping: 'name', type: 'string'},
        {name: 'book.author', mapping: 'author', type: 'string'},
        {name: 'book.publisher', mapping: 'publisher', type: 'string'},
        {name: 'book.owner', mapping: 'owner', type: 'string'},
        {name: 'book.number', mapping: 'number', type: 'number'}
    ]
});