package com.iflat.system.interceptor;

import com.iflat.system.entity.Page;
import org.apache.ibatis.executor.parameter.ParameterHandler;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Map;
import java.util.Properties;

/**
 * Created by tyriv on 2015/8/19.
 */
@Intercepts({@Signature(type=StatementHandler.class,method="prepare",args={Connection.class})})
public class PageInterceptor implements Interceptor {

    /**
     * 由于增删改查都可能触发prepareStatement，不能保证一定是查询操作，所以要对动作进行判断
     * 此系统中，约定只对listByPage方法进行拦截
     */
    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler statementHandler = (StatementHandler)invocation.getTarget();
        MetaObject metaObject = MetaObject.forObject(statementHandler, SystemMetaObject.DEFAULT_OBJECT_FACTORY, SystemMetaObject.DEFAULT_OBJECT_WRAPPER_FACTORY);
        MappedStatement mappedStatement = (MappedStatement)metaObject.getValue("delegate.mappedStatement");
        //配置文件中SQL语句的ID
        String id = mappedStatement.getId();
        /**
         * .+ByPage$
         * .表示至少出现了一个字符，$表示结束
         */
        if(id.matches(".+ByPage$")) {
            BoundSql boundSql = statementHandler.getBoundSql();
            //原始的SQL语句
            String sql = boundSql.getSql();
            //拼出查询总条数的sql语句
            String countSql = "select count(1) from (" + sql + ")a";
            Connection connection = (Connection)invocation.getArgs()[0];
            PreparedStatement countStatement = connection.prepareStatement(countSql);
            ParameterHandler parameterHandler = (ParameterHandler)metaObject.getValue("delegate.parameterHandler");
            parameterHandler.setParameters(countStatement);
            ResultSet rs = countStatement.executeQuery();

            //获取原始参数sysPage
            Map<?,?> parameter = (Map<?,?>)boundSql.getParameterObject();
            Page page = (Page)parameter.get("page");
            //得到page后再为总条数赋值
            if(rs.next()) {
                page.setLimit((int) rs.getLong(1));
            }
            //修改sql使其带分页功能
            String pageSql = sql;
            metaObject.setValue("delegate.boundSql.sql", pageSql);
        }
        return invocation.proceed();
    }

    /**
     * target为拦截对象，this为此拦截器的实例
     * wrap方法获取了类的注解 @Intercepts...
     * 再将注解内容和拦截的对象比较，得出是否要对该对象进行代理
     * 需要代理的对象才经过intercept()方法，否则只经过plugin()方法
     */
    @Override
    public Object plugin(Object target) {
        return Plugin.wrap(target, this);
    }

    @Override
    public void setProperties(Properties properties) {

    }
}
