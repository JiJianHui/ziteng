package com.ziteng.service.activity.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.activity.IUserActivityAttendDao;
import com.ziteng.dto.query.activity.UserActivityAttendQuery;
import com.ziteng.entity.activity.Activity;
import com.ziteng.entity.activity.UserActivityAttend;
import com.ziteng.service.activity.IUserActivityAttendService;

/**
 * 活动服务实现类
 * @author yangzuo
 * @date 2014-04-19
 *
 */
@Service
@Transactional
public class UserActivityAttendServiceImpl implements IUserActivityAttendService {

	@Autowired
	private IUserActivityAttendDao dao;

	@Override
	public boolean createActivity(UserActivityAttend entity) {
		Integer flag = dao.insert(entity);
		return flag != null && flag > 0;
	}

	@Override
	public boolean updateActivity(UserActivityAttend entity) {
		Integer flag = dao.update(entity);
		return flag != null && flag > 0;
	}

	@Override
	public void deleteActivity(UserActivityAttend entity) {
		dao.delete(entity);
	}

	@Override
	public UserActivityAttend findActivityById(Integer id) {
		UserActivityAttend result = dao.selectById(id);
		return result;
	}

	@Override
	public List<UserActivityAttend> queryActivities(UserActivityAttendQuery query) {
		List<UserActivityAttend> lists = dao.selectEntityList(query);
		lists = lists == null ? new ArrayList<UserActivityAttend>(0) : lists;
		return lists;
	}

	@Override
	public int queryCount(UserActivityAttendQuery query) {
		Integer count = dao.selectEntityCount(query);
		return (count == null ? 0 : count);
	}

	
}
