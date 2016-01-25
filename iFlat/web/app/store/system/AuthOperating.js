Ext.define('iFlat.store.system.AuthOperating', {
    extend: 'Ext.data.Store',

    autoLoad: true,
    model: 'iFlat.model.system.AuthOperating',
    pageSize: 0,
    proxy: {
        type: 'ajax',
        method: 'post',
        api: {
            create: 'system_saveBatchAuthOperating.action',
            read: 'system_listAuthOperatingVoByAuthOperatingVo.action',
            update: 'system_saveBatchAuthOperating.action',
        },
        reader: {
            type: 'json',
            rootProperty: 'list'
        },
        extraParams: {
            'authOperatingVo.nameSpace': '',
            'authOperatingVo.moduleName': '',
            'authOperatingVo.roleId': '',
            'authOperatingVo.account': '',
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            root: 'authOperatingVoList',
            encode: true
        }
    },
});