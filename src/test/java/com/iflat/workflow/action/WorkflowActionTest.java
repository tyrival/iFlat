package com.iflat.workflow.action;

import org.activiti.engine.RepositoryService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("/spring/spring.xml")
public class WorkflowActionTest {

    @Resource
    private RepositoryService repositoryService;

    @Test
    public void test() throws Exception {
        System.out.println("测试");
    }

}