Ext.define('iFlat.view.system.DataDictionary', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.system-datadictionary',
    xtype: 'system-datadictionary',

    requires: [
        'Ext.grid.feature.Grouping'
    ],

    features: [{
        ftype: 'grouping',
        groupHeaderTpl: [
            '{name:this.getDatabase}',
            {
                getDatabase: function(name) {
                    var record = sysDataDictionaryStore.findRecord('dataDictionary.tableName', name);
                    var dbInstance = record.get('dataDictionary.dbInstance') == '' ? '本地服务器' : record.get('dataDictionary.dbInstance');
                    var dbName = record.get('dataDictionary.dbName') == '' ? '默认' : record.get('dataDictionary.dbName');
                    return dbInstance + ' / ' + dbName + ' : ';
                }
            },
            '{name} ({rows.length} 字段)',
        ],
        hideGroupedHeader: true,
        startCollapsed: true,
        id: 'system-datadictionary-features',
    }],

    controller: 'system-datadictionary',
    store: sysDataDictionaryStore = Ext.create('iFlat.store.system.DataDictionary'),
    id: 'system-datadictionary',
    tbar: [{
        text: '自动生成',
        id: 'system-datadictionary-generate',
        ui: 'orig-blue',
        handler: 'generateDataDictionary',
    }, '->', {
        text: '刷新',
        handler: 'refreshPage',
    }],
    columns: [{
        text: '字段',
        dataIndex: 'dataDictionary.fieldName',
        width: 250,
    }, {
        text: '别名',
        dataIndex: 'dataDictionary.alias',
        width: 250,
        flex: true,
        editor: {
            allowBlank: false
        }
    }, {
        text: '类型',
        dataIndex: 'dataDictionary.type',
        width: 120,
    }, {
        text: '长度',
        dataIndex: 'dataDictionary.length',
        width: 100,
    }, {
        text: '表名',
        dataIndex: 'dataDictionary.tableName',
    }],
    plugins: [
        sysRoleRowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            id: 'system-datadictionary-edit',
            clicksToMoveEditor: 1,
            autoCancel: true,
            listeners: {
                edit: 'updateDataDictionaryRecord',
            }
        })
    ]
})