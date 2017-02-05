package com.iflat.demo.bean;

import com.iflat.util.code.CodeUtil;

/**
 * Created by tyriv on 2016/10/10.
 */
public class AA {

    public static void main(String[] args) {

        /**
         * CodeUtil.generate(String classFullName, String exclude);
         * @param className 类的完整路径
         * @param exclude 生成代码时需要排除的部分
         * 可以排除的部分包括struts, spring, mybatis(mapper), dao, service, action, mssql, extmodel(model), extstore(store), extview(view)，用半角逗号',' 隔开
         */
        CodeUtil.generate("com.iflat.demo.bean.Book", "struts,spring,mybatis,service,action,mssql,model,store,view");

    }
}
