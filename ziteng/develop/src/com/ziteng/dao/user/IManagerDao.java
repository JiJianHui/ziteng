package com.ziteng.dao.user;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.user.Manager;

public interface IManagerDao extends IBaseDao<Manager>{
    /**
     * 
     * <b>Summary: </b>
     *     selectManagerByName(通过用户名称查找用户)
     * @param name
     * @return
     */
    public List<Manager> selectManagerByName(String name);
}
