package com.ziteng.service.activity.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.activity.IActivityDao;
import com.ziteng.dto.query.activity.ActivityQuery;
import com.ziteng.entity.activity.Activity;
import com.ziteng.service.activity.IActivityService;

/**
 * 活动服务实现类
 * @author yangzuo
 * @date 2014-04-19
 *
 */
@Service
@Transactional
public class ActivityServiceImpl implements IActivityService {

	@Autowired
	private IActivityDao activityDao;

	@Override
	public boolean createActivity(Activity activity) {
		activity.setCreateTime(new Date());
		activity.setModifyTime(new Date());
		activity.setStatus(Activity.UNRELEASE);
		Integer flag = activityDao.insert(activity);        
        return flag != null && flag > 0;
	}

	@Override
	public boolean updateActivity(Activity activity) {
		activity.setEndTime(new Date());
		Integer flag = activityDao.update(activity);
		return flag != null && flag > 0;
	}

	@Override
	public void deleteActivity(Activity activity) {
		activityDao.delete(activity);
	}

	@Override
	public Activity findActivityById(Integer id) {
		Activity result = activityDao.selectById(id);
		update(result);
		return result;
	}

	@Override
	public List<Activity> queryActivities(ActivityQuery query) {
		List<Activity> activities = activityDao.selectEntityList(query);
		activities = activities == null ? 
				new ArrayList<Activity>(0) 
				: activities;
		boolean flag = false;
		
		for(Activity at:activities){
			flag =  update(at) | flag ;
		}
		
		if(flag){
			activities = activityDao.selectEntityList(query);
			activities = activities == null ? 
					new ArrayList<Activity>(0) 
					: activities;
		}
		
		return activities;
	}

	@Override
	public int queryActivityCount(ActivityQuery query) {
		Integer count = activityDao.selectEntityCount(query);
		return (count == null ? 0 : count);
	}
	
	public boolean update(Activity activity){
		Date date = new Date();
		Date startDate = activity.getStartTime();
		Date endDate = activity.getEndTime();

		if(date.after(endDate) && activity.getStatus()!=Activity.S_END){
			activity.setStatus(Activity.S_END);
			activityDao.update(activity);
			return true;
		}
		
		if(date.after(startDate) && date.before(endDate)&& activity.getStatus()!=Activity.JOIN){
			activity.setStatus(Activity.DOING);
			activityDao.update(activity);
			return true;
		}
		
		return false;
	}
	
}
