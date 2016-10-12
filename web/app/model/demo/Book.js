Ext.define('iFlat.model.demo.Book', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'book.id', mapping: 'id', type: 'string'},
        {name: 'book.name', mapping: 'name', type: 'string'},
    ]
});