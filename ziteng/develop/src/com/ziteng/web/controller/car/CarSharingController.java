package com.ziteng.web.controller.car;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.car.CarSharingQuery;
import com.ziteng.entity.car.CarSharing;
import com.ziteng.entity.user.User;
import com.ziteng.service.car.ICarSharingService;
//import java.io.UnsupportedEncodingException;
/**
 * 拼车控制层
 * @author yangzuo
 * @date 2014-4-20
 *
 */
@Controller
public class CarSharingController {
	
	@Autowired
	private ICarSharingService service;
	
	/**
	 * 发布拼车信息
	 * @param session
	 * @param carsharing
	 * @return
	 */
	
	
	@RequestMapping("/v/carSharing/publicCarsharingInfo.do")
	@ResponseBody
	public String createCarSharingInfo(HttpSession session, CarSharing carsharing) {
		
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			carsharing.setUserId(user.getId());
			carsharing.setCreateTime(new Date());
			
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(carsharing.getStartTime());
			Date startDate = calendar.getTime();
			
			carsharing.setStartTime(startDate);
			carsharing.setStatus(1);
			
			System.out.println("param:"+carsharing.getTitle());
			
			//carsharing.setTitle(   carsharing.getTitle().);
			/*
			String str=carsharing.getTitle();
		    char[] ch=str.toCharArray();
		    String ss="";
		    String info="";
		    for (int i = 0; i < ch.length; i++) {
			    ss="\\u"+Integer.toHexString(ch[i]);
			    System.out.println(ss);
			    info+=ss;
		    }
		    carsharing.setTitle(info);
		    */
			//carsharing.setTitle("张开");
			boolean flg = service.createCarSharingInfo(carsharing);
			result.setSuccess(flg);
			result.setMsg(flg == true ? "发布拼车信息成功" : "发布拼车信息失败");
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 删除拼车信息
	 * @param session
	 * @param carsharing
	 * @return
	 */
	@RequestMapping("/carSharing/deleteCarsharingInfo.do")
	@ResponseBody
	public String deleteCarSharingInfo(HttpSession session, CarSharing carsharing) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			service.deleteCarSharingInfo(carsharing);
			result.setSuccess(true);
			result.setMsg("删除拼车信息成功");
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 修改拼车信息
	 * @param session
	 * @param carsharing
	 * @return
	 */
	@RequestMapping("/carSharing/modifyCarsharingInfo.do")
	@ResponseBody
	public String modifyCarSharingInfo(HttpSession session, CarSharing carsharing) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
		} else {
			carsharing.setUserId(user.getId());
			carsharing.setModifyTime(new Date());
			boolean flg = service.updateCarSharingInfo(carsharing);
			result.setSuccess(flg);
			result.setMsg(flg == true ? "发布拼车信息成功" : "发布拼车信息失败");
		}
		return result.toJsonString();
	}
	
	/**
	 * 查询拼车信息
	 * @param session
	 * @param carsharing
	 * @return
	 */
	@RequestMapping("/carSharing/queryCarsharingInfos.do")
	@ResponseBody
	public String queryCarSharingInfo(HttpSession session, CarSharingQuery query) {
		Result result = new Result();
		
		if (query == null) {
			query = new CarSharingQuery();
		}
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		
		if (user != null) {
			query.setUserId(user.getId());
		}
		
		List<CarSharing> carsharings = service.queryCarSharingInfos(query);
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("carsharings", carsharings);
		
		return result.toJsonString();
	}
	
	/**
	 * @param query
	 * @return
	 */
	@RequestMapping("/carSharing/getAllCarSharingInfos.do")
	@ResponseBody
	public String getAllCarSharingInfos(CarSharingQuery query) {
		Result result = new Result();
		
		query.setStatus(1);
		int total = service.queryCarSharingInfoCount(query);
		List<CarSharing> carsharings  = service.queryCarSharingInfos(query);
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("total", total);  
		result.putObject("carSharings", carsharings);
		result.putObject("pageNo", query.getPageNo());
		result.putObject("pageSize", query.getPageSize());
		
		return result.toJsonString();
	}
	
	@RequestMapping("/carSharing/getUserCarSharingInfos.do")
	@ResponseBody
	public String getUserCarSharingInfos(HttpSession session) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		//System.out.println("userName:"+user.getUserName());
		//System.out.println("Id:"+user.getId());
		
		CarSharingQuery query = new CarSharingQuery();
		query.setUserId(user.getId());
		
		int total = service.queryCarSharingInfoCount(query);
		List<CarSharing> carsharings  = service.queryCarSharingInfos(query);
		/*
		System.out.println("count:"+total);
		for(CarSharing car:carsharings)
		{
			System.out.println("carsharings:"+car.getId());
		}*/
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("total", total);  
		result.putObject("carSharings", carsharings);
		result.putObject("pageNo", query.getPageNo());
		result.putObject("pageSize", query.getPageSize());
		
		return result.toJsonString();
	}
	
	/**
	 * 根据ID查询拼车信息
	 * @param carsharingId
	 * @return
	 */
	@RequestMapping("/carSharing/getCarSharingById.do")
	@ResponseBody
	public String getCarSharingById(Integer carsharingId) {
		Result result = new Result();
		
		CarSharing cs = service.findCarSharingInfoById(carsharingId);
		if(cs==null){
			result.setSuccess(false);
			result.setMsg("没有该攻略！");
		}else{
			result.setSuccess(true);
			result.setMsg("查询成功");
			result.putObject("carSharing", cs);
		}
		
		return result.toJsonString();
	}
	
	/**
	 * 根据ID关闭拼车信息
	 * @param carsharingId
	 * @return
	 */
	@RequestMapping("/carSharing/closeCarSharingById.do")
	@ResponseBody
	public String closeCarSharingById(HttpSession session, Integer carsharingId) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		
		CarSharing carSharing = service.findCarSharingInfoById(carsharingId);
		carSharing.setStatus(0);
		boolean flg = service.updateCarSharingInfo(carSharing);
		result.setSuccess(flg);
		result.setMsg(flg ? "关闭成功" : "关闭失败");
		
		return result.toJsonString();
	}
	
	/**
	 * 根据ID关闭拼车信息
	 * @param carsharingId
	 * @return
	 */
	@RequestMapping("/carSharing/openCarSharingById.do")
	@ResponseBody
	public String openCarSharingById(HttpSession session, Integer carsharingId) {
		Result result = new Result();
		
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if (user == null) {
			result.setSuccess(false);
			result.setMsg("用户未登录");
			return result.toJsonString();
		}
		
		CarSharing carSharing = service.findCarSharingInfoById(carsharingId);
		carSharing.setStatus(1);
		boolean flg = service.updateCarSharingInfo(carSharing);
		result.setSuccess(flg);
		result.setMsg(flg ? "打开成功" : "打开失败");
		
		return result.toJsonString();
	}
}
