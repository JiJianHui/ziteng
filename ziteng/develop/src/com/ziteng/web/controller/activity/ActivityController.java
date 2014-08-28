package com.ziteng.web.controller.activity;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.activity.ActivityQuery;
import com.ziteng.entity.activity.Activity;
import com.ziteng.entity.user.User;
import com.ziteng.service.activity.IActivityService;

/**
 * 活动控制层
 * @author yangzuo
 * @date 2014-4-19
 *
 */
@Controller
public class ActivityController {
	
	@Autowired
	private IActivityService activityService;
	
	/**
	 * 发布新活动
	 * @param session
	 * @param activity
	 * @return
	 */
	@RequestMapping("/v/w/activity/createNewActivity.do")
	@ResponseBody
	public String createNewActivity(HttpSession session, Activity activity) {
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		
		if (user == null) {
			return result.setErrorMsg("用户未登录").toJsonString();
		}
		activity.setCreateUserId(user.getId());
		boolean flg = activityService.createActivity(activity);
		result.setSuccess(flg);
		result.setMsg(flg ? "创建新活动成功" : "创建新活动失败");
		
		return result.toJsonString();
	}
	
	/**
	 * 修改活动内容
	 * @param session
	 * @param activity
	 * @return
	 */
	@RequestMapping("/v/w/activity/modifyActivity.do")
	@ResponseBody
	public String modifyActivity(HttpSession session, Integer activityId, Activity activity) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		
		activity.setId(activityId);
		activity.setCreateUserId(user.getId());
		activity.setModifyTime(new Date());
		activity.setStatus(0);
		
		boolean flag = activityService.updateActivity(activity);
		result.setSuccess(flag);
		result.setMsg(flag ? "更新活动信息成功" : "更新活动信息失败");
		
		return result.toJsonString();
	}
	
	/**
	 * 查询已经发布的活动　
	 * @param session
	 * @param query
	 * @return
	 */
	@RequestMapping("/activity/queryActivities.do")
	@ResponseBody
	public String getReleaseAvtivities(ActivityQuery query) {
		Result result = new Result();
		
		if (query == null) {
			query = new ActivityQuery();
		}
		System.out.println("In query activities.do");
		query.isUsePagination(false);
		List<Activity> activities = activityService.queryActivities(query);
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("activities", activities);
		
		return result.toJsonString();
	}
	
	/**
	 * 根据活动id查询活动详情
	 * @param id
	 * @return
	 */
	@RequestMapping("/activity/getActivityInfo.do")
	@ResponseBody
	public String getActivityById(Integer activityId) {
		Result result = new Result();
		
		Activity activity = activityService.findActivityById(activityId);
		if (activity != null) {
			result.setSuccess(true);
			result.setMsg("查询成功");
			result.putObject("activity", activity);
		} else {
			result.setSuccess(false);
			result.setMsg("查询失败");
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 删除发布的活动
	 * @param session
	 * @param activity
	 * @return
	 */
	@RequestMapping("/v/w/activity/deleteActivity.do")
	@ResponseBody
	public String deleteActivity(HttpSession session, Integer activityId) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		Activity activity = activityService.findActivityById(activityId);
		if(activity==null){
			return result.setErrorMsg("不存在的活动id "+activityId).toJsonString();
		}
		if(activity.getStatus() ==Activity.DOING || activity.getStatus()==Activity.JOIN){
			return result.setErrorMsg("正在参与或正在进行的活动，不能删除").toJsonString();
		}
		
		activityService.deleteActivity(activity);
		result.setSuccess(true);
		result.setMsg("删除成功");		
		return result.toJsonString();
	}
	
	
	/**
	 * 发布的活动
	 * @param session
	 * @param activity
	 * @return
	 */
	@RequestMapping("/v/w/activity/releaseActivity.do")
	@ResponseBody
	public String releaseActivity(HttpSession session, Integer activityId) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		Activity activity = activityService.findActivityById(activityId);
		if(activity==null){
			return result.setErrorMsg("不存在的活动id "+activityId).toJsonString();
		}
		
		if(activity.getStatus() !=Activity.UNRELEASE){
			return result.setErrorMsg("该活动未处于未发布状态，不能进行操作").toJsonString();
		}
		
		Date date = new Date();
		Date startDate = activity.getStartTime();
		Date endDate = activity.getEndTime();
		
		if(startDate.after(date)){
			activity.setStatus(Activity.JOIN);
		}else if(endDate.before(date)){
			activity.setStatus(Activity.S_END);
		}else{
			activity.setStatus(Activity.DOING);
		}
		boolean flag =activityService.updateActivity(activity);
		result.setSuccess(flag);
		result.setMsg(flag?"更新成功":"操作失败");
		return result.toJsonString();
	}
}
