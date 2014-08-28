package com.ziteng.dao.activity;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.activity.ActivityOrder;
import org.apache.ibatis.annotations.*;

/**
 * 活动订单dao层
 * @author yangzuo
 * @date 2014-4-16
 *
 */
public interface IActivityOrderDao extends IBaseDao<ActivityOrder> {
	ActivityOrder selectByUserIdAndActivityId(@Param("userId") Integer userId, @Param("activityId")Integer activityId);
}
