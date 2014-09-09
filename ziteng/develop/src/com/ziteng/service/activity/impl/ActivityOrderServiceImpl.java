package com.ziteng.service.activity.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.activity.IActivityOrderDao;
import com.ziteng.dto.query.activity.ActivityOrderQuery;
import com.ziteng.entity.activity.ActivityOrder;
import com.ziteng.service.activity.IActivityOrderService;

/**
 * 活动订单服务实现类
 * @author yangzuo
 * @date 2014-04-19
 *
 */
@Service
@Transactional
public class ActivityOrderServiceImpl implements IActivityOrderService {

    @Autowired
    private IActivityOrderDao dao;

    @Override
    public boolean createActivityOrder(ActivityOrder order) {
        Integer flag = dao.insert(order);
        return flag != null && flag > 0;
    }

    @Override
    public boolean updateActivityOrder(ActivityOrder order) {
        Integer flag = dao.update(order);
        return flag != null && flag > 0;
    }

    @Override
    public void deleteActivityOrder(ActivityOrder order) {
        dao.delete(order);
    }

    @Override
    public ActivityOrder queryActivityOrderById(Integer id) {
        return dao.selectById(id);
    }

    @Override
    public ActivityOrder queryActivityOrderByUserIdAndActivityId(Integer userId, Integer activityId) {
        return dao.selectByUserIdAndActivityId(userId, activityId);
    }

    @Override
    public List<ActivityOrder> queryActivityOrder(ActivityOrderQuery query) {
        List<ActivityOrder> orders = dao.selectEntityList(query);
        orders = orders == null ? new ArrayList<ActivityOrder>(0) : orders;
        return orders;
    }

    @Override
    public int queryActivityOrderCount(ActivityOrderQuery query) {
        Integer count = dao.selectEntityCount(query);
        return (count == null ? 0 : count);
    }

}
