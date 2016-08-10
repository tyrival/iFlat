Ext.define('iFlat.model.ss.AccParty', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'accParty.id', mapping: 'id', type: 'string'},
        {name: 'accParty.accId', mapping: 'accId', type: 'string'},
        {name: 'accParty.type', mapping: 'type', type: 'string'},
        {name: 'accParty.dept', mapping: 'dept', type: 'string'},
        {name: 'accParty.team', mapping: 'team', type: 'string'},
        {name: 'accParty.groupName', mapping: 'groupName', type: 'date'},
        {name: 'accParty.title', mapping: 'title', type: 'string'},
        {name: 'accParty.personAcc', mapping: 'personAcc', type: 'string'},
        {name: 'accParty.personName', mapping: 'personName', type: 'string'},
        {name: 'accParty.opIdCardNo', mapping: 'opIdCardNo', type: 'string'},
        {name: 'accParty.age', mapping: 'age', type: 'number'},
        {name: 'accParty.seniority', mapping: 'seniority', type: 'number'},
        {name: 'accParty.sex', mapping: 'sex', type: 'string'},
        {name: 'accParty.injuryLvl', mapping: 'injuryLvl', type: 'string'},
    ]
});