package com.ziteng.dto.query.activity;

import com.ziteng.dto.query.base.Query;

/**
 * @author yangzuo
 * @date 2014-4-19
 */
public class UserActivityAttendQuery extends Query {
	private Integer id;
	private Integer userId;
	private Integer activityId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getActivityId() {
		return activityId;
	}
	public void setActivityId(Integer activityId) {
		this.activityId = activityId;
	}
}
