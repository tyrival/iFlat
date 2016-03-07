package com.iflat.system.service;

import com.iflat.system.bean.Organization;
import com.iflat.system.entity.OrganizationNode;
import com.iflat.system.entity.OrganizationVo;

import java.util.List;

/**
 * Created by tyriv on 2015/8/28.
 */
public interface OrganizationService {

    public Organization save(Organization organization) throws Exception;

    public String delete(String orgId) throws Exception;

    public List<Organization> list() throws Exception;

    public List<OrganizationVo> listVo() throws Exception;

    public List<OrganizationNode> listNode() throws Exception;
}
