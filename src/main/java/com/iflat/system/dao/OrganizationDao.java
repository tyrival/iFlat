package com.iflat.system.dao;

import com.iflat.system.bean.Organization;
import com.iflat.system.entity.OrganizationVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public interface OrganizationDao {

    public Organization insert(Organization organization) throws Exception;

    public Organization update(Organization organization) throws Exception;

    public int delete(String orgId) throws Exception;

    public Organization get(String orgId) throws Exception;

    public List<Organization> list() throws Exception;

    public List<Organization> listActivity() throws Exception;

    public List<OrganizationVo> listVo() throws Exception;

    public List<Organization> listChildren(String orgId) throws Exception;
}
