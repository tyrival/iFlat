package com.iflat.system.interceptor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.*;

import com.iflat.system.entity.AuthDataVo;
import com.iflat.system.entity.AuthFieldVo;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.JSONHelper;
import com.iflat.util.Session;
import com.opensymphony.xwork2.ActionContext;
import net.sf.jsqlparser.JSQLParserException;
import net.sf.jsqlparser.expression.Expression;
import net.sf.jsqlparser.expression.operators.conditional.AndExpression;
import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.*;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.*;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.reflection.MetaObject;
import org.apache.ibatis.reflection.SystemMetaObject;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;

/**
 * 拦截Mybatis的Executor.query()
 * 获取*Mapper.xml中的sqlId，根据sqlId获取模块名、视图名
 * 获取原始sql，根据sql获取表名
 * 根据模块名，视图名，表名查询用户权限
 * 根据权限改写原始sql
 */
@Intercepts({    @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
)})
public class DataAuthorityInterceptor implements Interceptor {

    //sql中全局变量和函数的替换映射文件路径
    private String sqlmapperPath;
    //匹配拦截Sql的id的正则表达式
    private String sqlId;
    private static final List<ResultMapping> EMPTY_RESULTMAPPING = new ArrayList<ResultMapping>(0);
    private SqlSessionTemplate sqlSessionTemplateInterceptor;

    public Object intercept(Invocation invocation) throws Throwable {

        //获取用户和角色
        UserInfoVo userInfoVo = getUserInfoFromSession();
        //admin不作过滤
        if(userInfoVo != null && !"admin".equals(userInfoVo.getAccount())) {

            Object[] args = invocation.getArgs();
            //获取MappedStatement
            MappedStatement mappedStatement = (MappedStatement)args[0];
            //获取*Mapper.xml中，sql语句的id
            String id = mappedStatement.getId();
            //System命名空间的语句不作处理
            String[] module = id.split("\\.");
            if(!"System".equals(module[0])) {
                if(id.matches(this.sqlId)) {
                    //解析sql
                    try {
                        //获得BoundSql
                        BoundSql boundSql = mappedStatement.getBoundSql(args[1]);
                        //复制一个MappedStatement
                        MappedStatement newMs = newMappedStatement(mappedStatement, new BoundSqlSqlSource(boundSql));

                        //反射newMs获得类
                        MetaObject msObject = SystemMetaObject.forObject(newMs);
                        //获取原始sql
                        String sql = (String)msObject.getValue("sqlSource.boundSql.sql");
                        Statement stmt = CCJSqlParserUtil.parse(sql);
                        Select select = (Select) stmt;
                        SelectBody selectBody = select.getSelectBody();
                        //根据session、模块信息、表名，获取数据权限信息
                        AuthDataVo authDataVo = getAuthDataVo(userInfoVo, module, selectBody);
                        //数据权限存在，并且状态为启用时
                        if(authDataVo != null && authDataVo.getAdStatus()) {
                            //根据权限改写sql
                            processSelectBody(selectBody, authDataVo, userInfoVo);
                        }
                        String newSql = selectBody.toString();
                        //替换原始sql
                        msObject.setValue("sqlSource.boundSql.sql", newSql);
                        //恢复类型
                        msObject.setValue("resultMaps", mappedStatement.getResultMaps());

                        //将参数中的MappedStatement替换为新的qs，防止并发异常
                        args[0] = newMs;

                    } catch (JSQLParserException e) {
                        return invocation.proceed();
                    } catch (Exception e) {
                        throw e;
                    }
                }
            }
        }
        return invocation.proceed();
    }

    private void processSelectBody(SelectBody selectBody, AuthDataVo authDataVo, UserInfoVo userInfoVo) throws Exception{
        //只处理常规语句: select * from tableName where ...
        if (selectBody instanceof PlainSelect) {
            processPlainSelect(selectBody, authDataVo, userInfoVo);
        }
    }

    private void processPlainSelect(SelectBody selectBody, AuthDataVo authDataVo, UserInfoVo userInfoVo) throws Exception {
        List<AuthFieldVo> list = null;
        //解析字段权限
        list = authDataVo.getField() != "" ? (List<AuthFieldVo>)JSONHelper.jsonToList(authDataVo.getField(), "com.iflat.system.entity.AuthFieldVo") : null;
        String fields = "";
        if(list != null) {
            for(int i = 0; i < list.size(); i++) {
                fields += list.get(i).getField() + ",";
            }
            fields = fields.substring(0, fields.length() - 1);
        } else {
            fields = "*";
        }
        //根据数据权限，构成具体的查询语句
        StringBuilder sqlAuth = new StringBuilder("select ").append(fields).append(" from ").append(authDataVo.getTableName());
        //存在数据过滤时，附加where条件
        if(!"".equals(authDataVo.getFilter())) {
            sqlAuth.append(" where (").append(this.globalVariableMapping(authDataVo.getFilter(), userInfoVo)).append(")");
        }
        //解析
        Statement stmt = CCJSqlParserUtil.parse(sqlAuth.toString());
        Select select = (Select) stmt;
        SelectBody selectBodyAuth = select.getSelectBody();
        //将原始sql的select字段替换为新的字段
        ((PlainSelect) selectBody).setSelectItems(((PlainSelect) selectBodyAuth).getSelectItems());
        //根据原始sql和新sql生成新的where条件，并替换where条件
        Expression where = null;
        if(((PlainSelect) selectBody).getWhere() == null) {
            where = ((PlainSelect) selectBodyAuth).getWhere();
        } else {
            where = new AndExpression(((PlainSelect) selectBody).getWhere(), ((PlainSelect) selectBodyAuth).getWhere());
        }
        ((PlainSelect) selectBody).setWhere(where);

    }

    private AuthDataVo getAuthDataVo(UserInfoVo userInfoVo, String[] module, SelectBody selectBody) {
        AuthDataVo authDataVo = new AuthDataVo();
        authDataVo.setRoleId(userInfoVo.getRoleId());
        authDataVo.setAccount(userInfoVo.getAccount());
        String ns = "";
        for(int i = 0; i < module.length - 2; i ++) {
            ns += module[i] + ".";
        }
        ns = ns.substring(0, ns.length() - 1);
        authDataVo.setNameSpace(ns);
        authDataVo.setModuleName(module[module.length - 2]);

        String[] tableInfo = getTableInfoFromSelectBody(selectBody);
        authDataVo.setDbInstance(tableInfo[0]);
        authDataVo.setDbName(tableInfo[1]);
        authDataVo.setTableName(tableInfo[2]);

        List<AuthDataVo> list = getSqlSessionTemplateInterceptor().selectList("System.AuthData.getVo", authDataVo);
        return list == null || list.size() == 0 ? null : list.get(0);

    }

    //解析sql语句，将其中的表/视图名转化为数据库实例名、数据库名、表名
    private String[] getTableInfoFromSelectBody(SelectBody selectBody) {
        String[] array = new String[]{"","",""};
        String[] temp = ((PlainSelect) selectBody).getFromItem().toString().split("\\.");
        if(temp.length < 3) {
            array[2] = removeBracket(temp[temp.length - 1]);
        } else if(temp.length == 3) {
            array[1] = removeBracket(temp[0]);
            array[2] = removeBracket(temp[2]);
        } else if(temp.length == 4) {
            array[0] = removeBracket(temp[0]);
            array[1] = removeBracket(temp[1]);
            array[2] = removeBracket(temp[3]);
        }
        return array;
    }

    //移除中括号
    private String removeBracket(String str) {
        return str.indexOf("[") == 0 ? str.substring(1, str.length() - 2) : str;
    }

    //从session中获取用户信息
    private UserInfoVo getUserInfoFromSession() throws Exception {
        return Session.getUserInfo();
    }

    private class BoundSqlSqlSource implements SqlSource {
        BoundSql boundSql;
        public BoundSqlSqlSource(BoundSql boundSql) {
            this.boundSql = boundSql;
        }
        public BoundSql getBoundSql(Object parameterObject) {
            return boundSql;
        }
    }

    /**
     * 由于MappedStatement是一个全局共享的对象，因而需要复制一个对象来进行操作，防止并发访问导致错误
     */
    private MappedStatement newMappedStatement(MappedStatement ms, SqlSource newSqlSource) {
        MappedStatement.Builder builder = new MappedStatement.Builder(ms.getConfiguration(), ms.getId(), newSqlSource, ms.getSqlCommandType());
        builder.resource(ms.getResource());
        builder.fetchSize(ms.getFetchSize());
        builder.statementType(ms.getStatementType());
        builder.keyGenerator(ms.getKeyGenerator());
        if (ms.getKeyProperties() != null && ms.getKeyProperties().length != 0) {
            StringBuffer keyProperties = new StringBuffer();
            for (String keyProperty : ms.getKeyProperties()) {
                keyProperties.append(keyProperty).append(",");
            }
            keyProperties.delete(keyProperties.length() - 1, keyProperties.length());
            builder.keyProperty(keyProperties.toString());
        }
        builder.timeout(ms.getTimeout());
        builder.parameterMap(ms.getParameterMap());
        //由于resultMaps第一次需要返回int类型的结果，所以这里需要生成一个resultMap - 防止并发错误
        List<ResultMap> resultMaps = new ArrayList<ResultMap>();
        ResultMap resultMap = new ResultMap.Builder(ms.getConfiguration(), ms.getId(), int.class, EMPTY_RESULTMAPPING).build();
        resultMaps.add(resultMap);
        builder.resultMaps(resultMaps);
        builder.resultSetType(ms.getResultSetType());
        builder.cache(ms.getCache());
        builder.flushCacheRequired(ms.isFlushCacheRequired());
        builder.useCache(ms.isUseCache());
        return builder.build();
    }

    //替换全局变量和函数
    private String globalVariableMapping(String sql, UserInfoVo userInfoVo) throws Exception {
        sql = sql.replaceAll("#全局变量@账号#", "'" + userInfoVo.getAccount() + "'")
                .replaceAll("#全局变量@用户姓名#", "'" + userInfoVo.getUserName() + "'")
                .replaceAll("#全局变量@用户职位#", "'" + userInfoVo.getTitle() + "'")
                .replaceAll("#全局变量@角色ID#", "'" + userInfoVo.getRoleId() + "'")
                .replaceAll("#全局变量@角色名#", "'" + userInfoVo.getRoleName() + "'")
                .replaceAll("#全局变量@部门ID#", "'" + userInfoVo.getOrgId() + "'")
                .replaceAll("#全局变量@部门代码#", "'" + userInfoVo.getOrgCode() + "'")
                .replaceAll("#全局变量@部门名称#", "'" + userInfoVo.getOrgName() + "'")
                .replaceAll("#全局变量@上级部门ID#", "'" + userInfoVo.getPorgId() + "'")
                .replaceAll("#全局变量@上级部门代码#", "'" + userInfoVo.getPorgCode() + "'")
                .replaceAll("#全局变量@上级部门名称#", "'" + userInfoVo.getPorgName() + "'");
        //遍历sqlmapper文件，根据键值对，将其中的函数进行替换
        Properties prop = new Properties();
        try {
            InputStream in = readConfig();
            if(in != null) {
                BufferedReader bf = new BufferedReader(new InputStreamReader(in,"UTF-8"));
                prop.load(bf);
                Set set = prop.keySet();
                for (Iterator it = set.iterator(); it.hasNext();) {
                    String key = (String)it.next();
                    sql = sql.replaceAll(key, prop.getProperty(key));
                }
            }
        } catch (IOException e) {
            throw new IOException("sqlmapper.properties读取错误，请与管理员联系。");
        } catch (Exception e) {
            throw new Exception("DataAuthority拦截器替换全局变量时发生异常，请联系管理员。异常信息：" + e.getMessage());
        }
        return sql;
    }

    //读取配置文件
    private InputStream readConfig() {
        return getClass().getResourceAsStream(this.sqlmapperPath);  //读取文件
    }
    /**
     * 拦截方法，判断是否是Executor类，
     * 是则将方法和代理打包，返回一个代理；
     * 不是则不进行代理
     */
    public Object plugin(Object arg0) {
        return arg0 instanceof Executor?Plugin.wrap(arg0, this):arg0;
    }

    @Override
    public void setProperties(Properties properties) {
    }

    public String getSqlmapperPath() {
        return sqlmapperPath;
    }

    public void setSqlmapperPath(String sqlmapperPath) {
        this.sqlmapperPath = sqlmapperPath;
    }

    public String getSqlId() {
        return sqlId;
    }

    public void setSqlId(String sqlId) {
        this.sqlId = sqlId;
    }

    public SqlSessionTemplate getSqlSessionTemplateInterceptor() {
        return sqlSessionTemplateInterceptor;
    }

    public void setSqlSessionTemplateInterceptor(SqlSessionTemplate sqlSessionTemplateInterceptor) {
        this.sqlSessionTemplateInterceptor = sqlSessionTemplateInterceptor;
    }
}
