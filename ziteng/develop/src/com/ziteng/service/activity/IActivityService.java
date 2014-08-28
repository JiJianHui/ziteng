package com.ziteng.service.activity;

import java.util.List;

import com.ziteng.dto.query.activity.ActivityQuery;
import com.ziteng.entity.activity.Activity;

/**
 * 活动服务接口
 * @author yangzuo
 * @date 2014-04-19
 *
 */
public interface IActivityService {
	
	/**
     * 
     * <b>Summary: </b>
     *      createActivity 创建新活动
     * @param activity
     * @return 成功true, 失败false
     */
	public boolean createActivity(Activity activity);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *      updateActivity 修改活动
	 * @param activity
	 * @return 成功true, 失败false
	 */
	public boolean updateActivity(Activity activity);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *      deleteActivity 删除活动
	 * @param activity
	 * @return
	 */
	public void deleteActivity(Activity activity);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     findActiityById 通过活动id查询活动
	 * @param id
	 * @return Activity
	 */
	public Activity findActivityById(Integer id);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *      queryActivity 查询活动
	 * @param query
	 * @return 返回非NULL的集合
	 */
	public List<Activity> queryActivities(ActivityQuery query);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     queryActivityCount 查询数量
	 * @param query
	 * @return
	 */
	public int queryActivityCount(ActivityQuery query);
	
}
