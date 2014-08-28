package com.ziteng.service.user.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.user.IManagerDao;
import com.ziteng.dto.query.user.ManagerQuery;
import com.ziteng.entity.user.Manager;
import com.ziteng.service.user.IManagerService;

@Service
@Transactional
public class ManagerServiceImpl implements IManagerService {
    
    @Autowired
    private IManagerDao managerDao;

    @Override
    public Manager findManagerByName(String name) {
        List<Manager> managers = managerDao.selectManagerByName(name);
        if(managers!=null && !managers.isEmpty()){
            return managers.get(0);
        }
        managers.clear();
        return  null;
    }

    @Override
    public List<Manager> queryManagers(ManagerQuery query) {
        List<Manager> managers = managerDao.selectEntityList(query);
        
        managers = managers == null ? new ArrayList<Manager>(0) 
                                    : managers;
        return managers;
    }

    @Override
    public int queryManagersCount(ManagerQuery query) {
        Integer count = managerDao.selectEntityCount(query);
        count = count == null ? 0 
                              : count;
        return count;
    }

    @Override
    public boolean addManager(Manager manager) {
        Integer flag = managerDao.insert(manager);        
        return flag !=null && flag > 0;
    }
    
}
