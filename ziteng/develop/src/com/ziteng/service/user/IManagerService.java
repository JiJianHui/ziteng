package com.ziteng.service.user;

import java.util.List;

import com.ziteng.dto.query.user.ManagerQuery;
import com.ziteng.entity.user.Manager;

public interface IManagerService {
    /**
     * 
     * <b>Summary: </b>
     *     findManagerByName 查找管理员
     * @param  name 管理员名称
     * @return Manager
     */
    public Manager findManagerByName(String name);
    
    /**
     * 
     * <b>Summary: </b>
     *     queryManagers 查询管理员
     * @param query
     * @return 返回非NULL的集合
     */
    public List<Manager> queryManagers(ManagerQuery query);
    
    /**
     * 
     * <b>Summary: </b>
     *     queryManagersCount 查询数量
     * @param query
     * @return
     */
    public int queryManagersCount(ManagerQuery query);
    
    /**
     * 
     * <b>Summary: </b>
     *     addManager 新增管理员
     * @param manager
     * @return 
     */
    public boolean addManager(Manager manager);
}
