Ext.define('iFlat.store.system.GlobalVariable', {
    extend: 'Ext.data.TreeStore',

    root: {
        'text': ".",
        'expanded': true,
        'children': [
            {
                'text': "全局变量",
                'expanded': true,
                'children': [
                    {'text': '账号', 'value': '#全局变量@账号#', 'leaf': true },
                    {'text': '用户姓名', 'value': '#全局变量@用户姓名#', 'leaf': true },
                    {'text': '职位', 'value': '#全局变量@职位#', 'leaf': true },
                    {'text': '角色ID', 'value': '#全局变量@角色ID#', 'leaf': true },
                    {'text': '角色名', 'value': '#全局变量@角色名#', 'leaf': true },
                    {'text': '部门ID', 'value': '#全局变量@部门ID#', 'leaf': true },
                    {'text': '部门代码', 'value': '#全局变量@部门代码#', 'leaf': true },
                    {'text': '部门名称', 'value': '#全局变量@部门名称#', 'leaf': true },
                    {'text': '上级部门ID', 'value': '#全局变量@上级部门ID#', 'leaf': true },
                    {'text': '上级部门代码', 'value': '#全局变量@上级部门代码#', 'leaf': true },
                    {'text': '上级部门名称', 'value': '#全局变量@上级部门名称#', 'leaf': true }
                ]
            }
        ]
    }
});