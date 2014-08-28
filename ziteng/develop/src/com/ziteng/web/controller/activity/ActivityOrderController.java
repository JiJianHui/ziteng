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
import com.ziteng.dto.query.activity.ActivityOrderQuery;
import com.ziteng.entity.activity.ActivityOrder;
import com.ziteng.entity.user.User;
import com.ziteng.service.activity.IActivityOrderService;

/**
 * 活动订单控制层
 * @author yangzuo
 * @date 2014-4-19
 *
 */
@Controller
public class ActivityOrderController {
	
	@Autowired
	private IActivityOrderService service;
	
	/**
	 * 创建活动订单
	 * @param session
	 * @param order
	 * @return
	 */
	@RequestMapping("/activity/createActivityOrder.do")
	@ResponseBody
	public String createActivityOrder(HttpSession session, ActivityOrder order) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			order.setCreateTime(new Date());
			order.setUserId(user.getId());
			boolean flg = service.createActivityOrder(order);
			result.setSuccess(flg);
			result.setMsg(flg == true? "创建活动订单成功" : "创建活动订单失败");
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 修改活动订单
	 * @param session
	 * @param order
	 * @return
	 */
	@RequestMapping("/activity/modifyActivityOrder.do")
	@ResponseBody
	public String modifyActivityOrder(HttpSession session, ActivityOrder order) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			order.setModifyTime(new Date());
			boolean flg = service.updateActivityOrder(order);
			result.setSuccess(flg);
			result.setMsg(flg == true? "修改活动订单成功" : "修改活动订单失败");
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 删除活动订单
	 * @param session
	 * @param order
	 * @return
	 */
	@RequestMapping("/activity/deleteActivityOrder.do")
	@ResponseBody
	public String deleteActivityOrder(HttpSession session, ActivityOrder order) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			service.deleteActivityOrder(order);
			result.setSuccess(true);
			result.setMsg("删除活动订单成功");
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 查询用户的活动订单
	 * @param session
	 * @param query
	 * @return
	 */
	@RequestMapping("/activity/queryActivityOrders.do")
	@ResponseBody
	public String queryActivityOrders(HttpSession session, ActivityOrderQuery query) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			if (query == null) {
				query = new ActivityOrderQuery();
			}
			query.setUserId(user.getId());
			List<ActivityOrder> orders = service.queryActivityOrder(query);
			result.setSuccess(true);
	        result.setMsg("查询成功");
	        result.putObject("orders", orders);
		}
		
		return result.toJsonString();
	}
}
