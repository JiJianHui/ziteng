package com.ziteng.service.activity;

import java.util.List;

import com.ziteng.dto.query.activity.ActivityOrderQuery;
import com.ziteng.entity.activity.ActivityOrder;

/**
 * 活动订单服务接口
 * @author yangzuo
 * @date 2014-04-19
 *
 */
public interface IActivityOrderService {

    /**
     *
     * <b>Summary: </b>
     *     createActivityOrder 创建活动订单
     * @param order
     * @return 成功true, 失败false
     */
    public boolean createActivityOrder(ActivityOrder order);

    /**
     *
     * <b>Summary: </b>
     *     updateActivityOrder 修改活动订单
     * @param order
     * @return 成功true, 失败false
     */
    public boolean updateActivityOrder(ActivityOrder order);

    /**
     *
     * <b>Summary: </b>
     *     deleteActivityOrder 删除活动订单
     * @param order
     */
    public void deleteActivityOrder(ActivityOrder order);

    /**
     *
     * <b>Summary: </b>
     *     queryActivityOrderById 通过订单id查询活动订单
     * @param id
     * @return
     */
    public ActivityOrder queryActivityOrderById(Integer id);

    /**
     *
     * <b>Summary: </b>
     *     queryActivityOrderById 通过订单id查询活动订单
     * @param id
     * @return
     */
    public ActivityOrder queryActivityOrderByUserIdAndActivityId(Integer userId, Integer activityId);

    /**
     *
     * <b>Summary: </b>
     *     queryActivityOrder 查询活动订单
     * @param query
     * @return 返回非NULL的集合
     */
    public List<ActivityOrder> queryActivityOrder(ActivityOrderQuery query);

    /**
     *
     * <b>Summary: </b>
     *     queryActivityOrderCount 查询数量
     * @param query
     * @return
     */
    public int queryActivityOrderCount(ActivityOrderQuery query);

}
