package com.ziteng.web.controller.activity;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.activity.UserActivityAttendQuery;
import com.ziteng.entity.activity.UserActivityAttend;
import com.ziteng.entity.user.User;
import com.ziteng.service.activity.IUserActivityAttendService;

/**
 * 活动控制层
 * @author yangzuo
 * @date 2014-4-19
 *
 */
@Controller
public class UserActivityAttendController {
	
	@Autowired
	private IUserActivityAttendService service;
	
	/**
	 * 参与活动
	 * @param session
	 * @param activityId
	 * @return
	 */
	@RequestMapping("/activity/attendActivity.do")
	@ResponseBody
	public String attendActivity(HttpSession session, String activityId) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		
		UserActivityAttend entity = new UserActivityAttend();
		entity.setUserId(user.getId());
		entity.setActivityId(Integer.parseInt(activityId));
		
		boolean flg = service.createActivity(entity);
		result.setSuccess(flg);
		result.setMsg(flg ? "参加活动成功" : "参加活动失败");
		
		return result.toJsonString();
	}
	
	@RequestMapping("/activity/cancelAttendActivity.do")
	@ResponseBody
	public String cancelActivity(HttpSession session, String activityId) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		
		UserActivityAttendQuery query = new UserActivityAttendQuery();
		query.setUserId(user.getId());
		query.setActivityId(Integer.parseInt(activityId));
		
		UserActivityAttend entity = service.queryActivities(query).get(0);
		
		service.deleteActivity(entity);
		result.setSuccess(true);
		result.setMsg("取消活动成功");
		
		return result.toJsonString();
	}
}
