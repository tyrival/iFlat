package com.iflat.system.service.impl;

import com.iflat.system.bean.UserRole;
import com.iflat.system.dao.UserRoleDao;
import com.iflat.system.entity.UserInfoVo;
import com.iflat.system.entity.UserRoleNode;
import com.iflat.system.entity.UserRoleVo;
import com.iflat.system.service.UserRoleService;
import com.iflat.util.Session;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * Created by tyriv on 2015/8/28.
 */
public class UserRoleServiceImpl implements UserRoleService {

    private UserRoleDao userRoleDao;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public String saveUserRole(UserRole userRole, String itemselector) throws Exception {

        int result = 0;
        List<UserRole> list = new ArrayList<UserRole>();
        String[] array = itemselector.equals("") ? null : itemselector.split(",");

        if (userRole.getAccount() != null) {
            this.userRoleDao.deleteByAccount(userRole.getAccount());
            if (array != null) {
                for (int i = 0; i < array.length; i++) {
                    UserRole userRole1 = new UserRole();
                    userRole1.setAccount(userRole.getAccount());
                    userRole1.setRoleId(array[i]);
                    userRole1.setSequence(i + 1);
                    list.add(userRole1);
                }
                result = this.userRoleDao.insertBatch(list);
            }
        } else if (userRole.getRoleId() != null) {
            this.userRoleDao.deleteByRoleId(userRole.getRoleId());
            if (array != null) {
                for (int i = 0; i < array.length; i++) {
                    UserRole userRole1 = new UserRole();
                    userRole1.setAccount(array[i]);
                    userRole1.setRoleId(userRole.getRoleId());
                    userRole1.setSequence(i + 1);
                    list.add(userRole1);
                }
                result = this.userRoleDao.insertBatch(list);
            }
        }
        return result == list.size() ? itemselector : null;
    }

    @Override
    public List<UserRole> saveUserRoleBatch(List<UserRole> list) throws Exception {
        return this.userRoleDao.updateBatch(list) > 0 ? list : null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean saveDefaultRole(UserRole userRole) throws Exception {

        int result = 0;

        UserInfoVo userInfoVo = Session.getUserInfo();
        userRole.setAccount(userInfoVo.getAccount());
        userRole = this.userRoleDao.getByUR(userRole);

        if (userRole == null) {
            throw new Exception("您可能已不再拥有该角色，请联系管理员。");
        }

        List<UserRoleVo> list = listVoByAccount();
        if (list != null && list.size() > 0) {
            //如果保存的角色和原默认角色相同，则不修改
            if (list.get(0).getRoleId().equals(userRole.getRoleId())) {
                return true;
            }

            UserRole orig = new UserRole();
            orig.setAccount(list.get(0).getAccount());
            orig.setRoleId(list.get(0).getRoleId());
            orig.setSequence(userRole.getSequence());
            result = this.userRoleDao.update(orig);
            if (result <= 0) {
                throw new Exception("默认角色修改失败，您的角色可能已被删除，请联系管理员。");
            }
        } else {
            throw new Exception("您没有任何角色，请联系管理员");
        }
        userRole.setSequence(0);
        result = this.userRoleDao.update(userRole);
        if (result <= 0) {
            throw new Exception("默认角色修改失败，您的角色可能已被删除，请联系管理员。");
        }
        return true;
    }

    @Override
    public String deleteByRoleId(String roleId) throws Exception {

        return this.userRoleDao.deleteByRoleId(roleId) > 0 ? roleId : null;
    }

    @Override
    public String deleteByAccount(String account) throws Exception {

        return this.userRoleDao.deleteByAccount(account) > 0 ? account : null;
    }

    @Override
    public String listAsString(UserRole userRole) throws Exception {

        List<UserRole> list = new ArrayList<UserRole>();
        String result;
        StringBuffer buffer = new StringBuffer();
        if(userRole.getAccount() != null) {
            list = this.userRoleDao.listByAccount(userRole.getAccount());
            for(int i = 0; i < list.size(); i++) {
                buffer.append(list.get(i).getRoleId()).append(",");
            }
        }
        else if (userRole.getRoleId() != null) {
            list = this.userRoleDao.listByRoleId(userRole.getRoleId());
            for(int i = 0; i < list.size(); i++) {
                buffer.append(list.get(i).getAccount()).append(",");
            }
        }
        result = buffer.substring(0, buffer.length() - 1);
        return result;
    }

    public List<UserRoleVo> listVo() throws Exception {

        return this.userRoleDao.listVo();
    }

    @Override
    public List<UserRoleVo> listVoByUser() throws Exception {

        UserInfoVo userInfoVo = Session.getUserInfo();
        return this.userRoleDao.listVoByUser(userInfoVo);
    }

    @Override
    public List<UserRoleVo> listVoByAccount() throws Exception {
        UserInfoVo userInfoVo = Session.getUserInfo();
        userInfoVo.setRoleId(null);
        return this.userRoleDao.listVoByUser(userInfoVo);
    }

    @Override
    public List<UserRoleVo> listVoByAccount(String account) throws Exception {
        UserInfoVo userInfoVo = new UserInfoVo();
        userInfoVo.setAccount(account);
        return this.userRoleDao.listVoByUser(userInfoVo);
    }

    @Override
    public List<UserRoleNode> listNode() throws Exception {

        List<UserRoleVo> list = this.userRoleDao.listVo();
        List<UserRoleNode> result = new ArrayList<UserRoleNode>();
        if(list != null) {
            HashMap roleMap = new HashMap();
            for(int i = 0; i < list.size(); i++) {
                if(roleMap.get(list.get(i).getRoleId()) == null) {
                    UserRoleNode node = new UserRoleNode();
                    node.setId(list.get(i).getRoleId());
                    node.setName("(" + list.get(i).getCategory() + ")" + list.get(i).getRoleName());
                    roleMap.put(node.getId(), node);
                }
                if(list.get(i).getAccount() != null) {
                    UserRoleNode userNode = new UserRoleNode();
                    userNode.setId(list.get(i).getAccount());
                    userNode.setName(list.get(i).getAccount() + "-" + list.get(i).getUserName());
                    userNode.setParentId(list.get(i).getRoleId());
                    ((UserRoleNode)roleMap.get(list.get(i).getRoleId())).setLeaf(false);
                    result.add(userNode);
                }
            }
            //遍历map，将node取出，生成list
            Set out = roleMap.entrySet();
            for (Iterator it = out.iterator(); it.hasNext();) {
                UserRoleNode node = (UserRoleNode) ((Map.Entry) it.next()).getValue();
                result.add(node);
            }
        }
        return result;
    }

    public UserRoleDao getUserRoleDao() {
        return userRoleDao;
    }

    public void setUserRoleDao(UserRoleDao userRoleDao) {
        this.userRoleDao = userRoleDao;
    }

}
