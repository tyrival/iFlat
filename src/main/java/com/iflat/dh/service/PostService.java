package com.iflat.dh.service;

import com.iflat.base.service.BaseService;
import com.iflat.dh.bean.Post;

/**
 * Created by tyriv on 2016/6/18.
 */
public interface PostService extends BaseService {
    void submit(Post post) throws Exception;
}
