Ext.define('iFlat.model.book.Record', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'record.id', mapping: 'id', type: 'string'},
        {name: 'record.bookId', mapping: 'projNo', type: 'string'},
        {name: 'record.borrower', mapping: 'owner', type: 'string'},
        {name: 'record.start', mapping: 'surveyor', type: 'date'},
        {name: 'record.end', mapping: 'deliveryDate', type: 'date'},
    ]
});