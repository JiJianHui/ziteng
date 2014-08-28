package com.ziteng.service.activity;

import java.util.List;

import com.ziteng.dto.query.activity.UserActivityAttendQuery;
import com.ziteng.entity.activity.UserActivityAttend;

/**
 * 活动服务接口
 * @author yangzuo
 * @date 2014-04-19
 *
 */
public interface IUserActivityAttendService {
	
	/**
     * 
     * <b>Summary: </b>
     *      createActivity 参与活动
     * @param entity
     * @return 成功true, 失败false
     */
	public boolean createActivity(UserActivityAttend entity);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *      updateActivity 修改活动
	 * @param entity
	 * @return 成功true, 失败false
	 */
	public boolean updateActivity(UserActivityAttend entity);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *      deleteActivity 取消活动
	 * @param entity
	 * @return
	 */
	public void deleteActivity(UserActivityAttend entity);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     findActiityById 通过活动id查询活动
	 * @param id
	 * @return Activity
	 */
	public UserActivityAttend findActivityById(Integer id);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *      queryActivity 查询活动
	 * @param query
	 * @return 返回非NULL的集合
	 */
	public List<UserActivityAttend> queryActivities(UserActivityAttendQuery query);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     queryCount 查询数量
	 * @param query
	 * @return
	 */
	public int queryCount(UserActivityAttendQuery query);
	
}
