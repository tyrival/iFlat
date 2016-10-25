package com.iflat.util;

import com.iflat.system.bean.AuthModule;
import com.iflat.system.bean.Module;
import com.iflat.system.bean.Organization;
import com.iflat.system.bean.Role;
import com.iflat.system.entity.*;

import java.util.*;

/**
 * Created by tyriv on 2015/8/31.
 */
public class ExtTreeUtil {

    public static NavigationNode formatNavigationTree(List<Module> list) {

        if(list != null) {
            //节点列表（Hash表，无序，用于临时存储节点对象）
            HashMap nodeList = new HashMap();
            //根节点
            NavigationNode root = null;
            /**
             * 将结果集存入Hash表，
             * key = node.getNodeId();
             * Object = NavigationNode;
             */
            for (int i = 0; i < list.size(); i++) {
                NavigationNode node = new NavigationNode();
                node.setNodeId(list.get(i).getNodeId());
                node.setSequence(list.get(i).getSequence());
                node.setIconCls(list.get(i).getAweIcon());
                node.setAweIcon(list.get(i).getAweIcon());
                node.setText(list.get(i).getNodeName());
                node.setNodeName(list.get(i).getNodeName());
                node.setModuleName(list.get(i).getModuleName());
                node.setParentNodeId(list.get(i).getParentNodeId());
                node.setUrl(list.get(i).getUrl());
                node.setNameSpace(list.get(i).getNameSpace());
                node.setViewName(list.get(i).getViewName());
                node.setController(list.get(i).getController());
                node.setStatus(list.get(i).getStatus());
                node.setSequence(list.get(i).getSequence());
                //node.setRowCls("nav-tree-badge nav-tree-badge-new");
                //默认展开
                node.setExpanded(false);
                //默认leaf为true，后面遍历时，如果有子节点，则设置为false
                node.setLeaf(true);
                nodeList.put(node.getNodeId(), node);
            }
            //借助Hash表，构造无序的多叉树
            Set entrySet = nodeList.entrySet();
            for (Iterator it = entrySet.iterator(); it.hasNext();) {
                NavigationNode node = (NavigationNode) ((Map.Entry) it.next()).getValue();
                //无父节点的node为根节点
                if (node.getParentNodeId() == null) {
                    //root指向根节点
                    root = node;
                } else {
                    //使每个子节点被其父节点的children属性引用
                    ((NavigationNode)nodeList.get(node.getParentNodeId())).addChild(node);
                    //将每个子节点的父节点的leaf设置为false
                    ((NavigationNode)nodeList.get(node.getParentNodeId())).setLeaf(false);
                    //获取父节点名
                    //node.setParentNodeName(((NavigationNode)nodeList.get(node.getParentNodeId())).getNodeName());
                }
            }
            //对多叉树进行横向排序
            root.sortChildren();
            //利用Module中重写的toString()方法转为JSON格式
            return root;
        } else {
            return null;
        }
    }

}
