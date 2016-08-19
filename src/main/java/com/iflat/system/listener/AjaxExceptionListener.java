package com.iflat.system.listener;

import com.iflat.base.action.ResultAware;
import com.iflat.base.entity.Result;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.util.Application;
import com.iflat.util.LogFile;
import com.iflat.util.Session;
import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.config.entities.ActionConfig;
import com.opensymphony.xwork2.interceptor.ExceptionHolder;
import com.opensymphony.xwork2.interceptor.PreResultListener;
import com.opensymphony.xwork2.util.CompoundRoot;

import java.io.*;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by tyriv on 2015/10/3.
 */
public class AjaxExceptionListener implements PreResultListener {

    private final String logDoc = "logs/exception";
    @Override
    public void beforeResult(ActionInvocation actionInvocation, String s) {

        /**
         * 根据resultCode是success还是error，来修改result对象的success属性
         * 如果无异常，则将result的message属性赋值为“操作成功”
         * 如果捕获异常，根据properties文件，将捕获到的异常信息，转化为更简洁直观的说明，赋值给result的message属性，
         * 并最终传递到前台
         */
        if("error".equals(s.toString())) {

            Action action = (Action)actionInvocation.getAction();

            if(action instanceof ResultAware) {

                Result result = new Result();
                //赋值success
                result.setSuccess(false);
                String localMsg = null;
                int delayTime = 10000;
                //获取ValueStack根目录
                CompoundRoot root = actionInvocation.getStack().getRoot();

                //遍历root
                for(int i = 0; i < root.size(); i++) {

                    //当遍历到异常信息存放位置时
                    if(root.get(i) instanceof ExceptionHolder) {

                        //获取异常信息
                        String message = ((ExceptionHolder) root.get(i)).getException().getMessage();
                        localMsg = message;
                        //查询properties文件，通过正则表达式查找对应说明
                        Properties prop = new Properties();

                        try {
                            InputStream in = readConfig(actionInvocation);  //读取文件
                            if(in != null) {
                                BufferedReader bf = new BufferedReader(new InputStreamReader(in,"UTF-8"));  //转码
                                prop.load(bf);  //将属性文件流装载到Properties对象中
                                Set set = prop.keySet();  //获取key集
                                //遍历key值，寻找与当前异常相符的key
                                for (Iterator it = set.iterator(); it.hasNext();) {
                                    String key = (String)it.next();
                                    Pattern p = Pattern.compile(key);
                                    Matcher m = p.matcher(message);
                                    if(m.find()){
                                        //获取满足条件的key的value
                                        Map map = analyzeValueString(prop.getProperty(key));
                                        localMsg = (String)map.get("message");
                                        delayTime = (Integer)map.get("time");
                                        break;
                                    }
                                }
                            }
                            //在此抛出异常检验下面的catch块
                            //throw new Exception("检验catch块");
                        } catch (Exception e) {

                            if(e instanceof  java.util.regex.PatternSyntaxException) {
                                localMsg = "AjaxException.properties中,key值为不合法正则表达式，请与管理员联系。";
                            } else if(e instanceof  IOException) {
                                localMsg = "未读取到错误解释。原始错误信息为：" + message;
                            } else {
                                localMsg = "AjaxExceptionListener异常，请联系管理员。异常信息：" + e.getMessage();
                            }
                            delayTime = 15000;
                        }
                        //强制返回值为success，使ajax返回状态为成功
                        actionInvocation.setResultCode("success");
                        //跳出循环
                        break;
                    }
                }

                try {
                    String log = getLog(actionInvocation, localMsg);
                    LogFile.write(this.logDoc, log);
                } catch (Exception ex) {
                    localMsg = "日志记录器错误，请联系管理员。异常信息：" + ex.getMessage();
                }

                //赋值message
                result.setSuccess(true);
                result.setMessage(localMsg);
                result.setTime(delayTime);
                ((ResultAware)action).setResult(result);
            }
        }
    }

    private String getLog(ActionInvocation invocation, String msg) throws Exception {

        ActionConfig config = invocation.getProxy().getConfig();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String time = sdf.format(new Date());
        StringBuilder sb = new StringBuilder("Time:" + time + "\r\n")
                .append("User: " + getSession() + "\r\n")
                .append("Class: " + config.getClassName() + "\r\n")
                .append("Method: " + config.getMethodName() + "\r\n")
                .append("Parameters: " + getParameters(invocation) + "\r\n")
                .append("Exception: " + msg + "\r\n");
        return sb.toString();
    }

    private String getSession() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        return "Account[" + userInfoVo.getAccount() + "],Role[" + userInfoVo.getRoleName() + "],Dept[" + userInfoVo.getOrgName() + "]";
    }

    private String getParameters(ActionInvocation invocation) throws Exception {

        StringBuilder sb = new StringBuilder();
        Map map = (Map)invocation.getInvocationContext().getContextMap().get("parameters");
        Set entrySet = map.keySet();

        for (Iterator it = entrySet.iterator(); it.hasNext();) {

            String key = (String)it.next();
            sb.append(key).append("[");
            Object[] objects = (Object[])map.get(key);
            String variable = "";

            for(int i = 0; i < objects.length; i++) {

                variable += objects[i].toString();

            }

            variable = variable.substring(0, variable.length());
            sb.append(variable).append("],");
        }
        return sb.toString();
    }
    //读取配置文件
    private InputStream readConfig(ActionInvocation invocation) throws Exception {

        String webRoot = Application.getWebRootPath();
        String pathConfig = webRoot + Application.getContextParam("configRoot") + "exception/";
        String className = invocation.getProxy().getConfig().getClassName();
        int secondDot = className.indexOf(".", className.indexOf(".") + 1);
        int thirdDot = className.indexOf(".", secondDot + 1);
        String moduleName = className.substring(secondDot + 1, thirdDot); //获取模块名
        String fileName = pathConfig + moduleName + ".properties";
        return new FileInputStream(fileName);  //读取文件
    }

    //解析value字符串为message和time
    private Map<String, Object> analyzeValueString(String value) {
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("message", value);
        map.put("time", 10000);
        int index = value.lastIndexOf("|");

        if(index >= 0) {

            String time = value.substring(index + 1);
            String regex = "^[0-9]*[1-9][0-9]*$";

            if(time.matches(regex)) {

                map.put("message", value.substring(0, index));
                map.put("time", Integer.parseInt(time));
            }
        }
        return map;
    }
}
