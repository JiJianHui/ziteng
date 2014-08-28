package com.ziteng.web.controller.car;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.car.CarsharingMessageQuery;
import com.ziteng.entity.car.CarsharingMessage;
import com.ziteng.entity.user.User;
import com.ziteng.service.car.ICarsharingMessageService;

/**
 * 拼车留言控制层
 * @author yangzuo
 * @date 2014-4-20
 *
 */
@Controller
public class CarsharingMessageController {
	
	@Autowired
	private ICarsharingMessageService service;
	
	/**
	 * 发布拼车留言
	 * @param session
	 * @param message
	 * @return
	 */
	@RequestMapping("/carsharingMessage/makeCarsharingMessage.do")
	@ResponseBody
	public String makeCarsharingMessage(HttpSession session, Integer carsharingId, String content) {
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			CarsharingMessage message = new CarsharingMessage();
			message.setUserId(user.getId());
			message.setCarsharingId(carsharingId);
			message.setContent(content);
			message.setMsgTime(new Date());
			boolean flg = service.createCarsharingMessage(message);
			if (flg == true) {
				result.setSuccess(true);
				result.setMsg("评论成功！");
				result.putObject("carsharingMessage", message);
			} else {
				result.setSuccess(false);
				result.setMsg("评论不成功！");
			}
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 查询拼车留言
	 * @param query
	 * @return
	 */
	@RequestMapping("/carsharingMessage/queryCarsharingMessages.do")
	@ResponseBody
	public String queryCarSharingMessages(CarsharingMessageQuery query) {
		Result result = new Result();
		
		if (query == null) {
			query = new CarsharingMessageQuery();
		}
		
		List<CarsharingMessage> messages = service.queryCarsharingMessage(query);
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("messages", messages);
		
		return result.toJsonString();
	}
	
	/**
	 * 根据ID查询拼车的所有留言信息
	 * @param carsharingId
	 * @return
	 */
	@RequestMapping("/carsharingMessage/queryCarSharingMessagesById.do")
	@ResponseBody
	public String queryCarSharingMessagesById(Integer carsharingId) {
		Result result = new Result();
		
		CarsharingMessageQuery query = new CarsharingMessageQuery();
		query.setCarsharingId(carsharingId);
		
		List<CarsharingMessage> cm = service.queryCarsharingMessage(query);
		if(cm==null){
			result.setSuccess(false);
			result.setMsg("没有评论！");
		}else{
			result.setSuccess(true);
			result.setMsg("查询成功");
			result.putObject("carsharingMessages", cm);
		}
		
		return result.toJsonString();
	}
	
}
