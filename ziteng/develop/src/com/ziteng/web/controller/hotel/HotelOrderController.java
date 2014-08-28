package com.ziteng.web.controller.hotel;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelOrderQuery;
import com.ziteng.entity.hotel.HotelOrder;
import com.ziteng.entity.user.User;
import com.ziteng.service.hotel.IDuanXinSMSService;
import com.ziteng.service.hotel.IHotelOrderService;

@Controller
public class HotelOrderController {
	@Autowired
	 private IHotelOrderService hotelOrderService;
	@Autowired
	 private IDuanXinSMSService duanXinSMS;
	
	 public HotelOrderQuery getHotelOrderQuery(HotelOrder hotelOrder)
	 {
		HotelOrderQuery hiq = new HotelOrderQuery();
		hiq.setId(hotelOrder.getId()); 
		hiq.setHotelId(hotelOrder.getHotelId()); 
		hiq.setHotelName(hotelOrder.getHotelName());     
		hiq.setRoomId(hotelOrder.getRoomId()); 
		hiq.setRoomName(hotelOrder.getRoomName()); 
		hiq.setVisitorName(hotelOrder.getVisitorName());		
		hiq.setPhoneNum(hotelOrder.getPhoneNum());
		hiq.setReserveDate(hotelOrder.getReserveDateString());
		hiq.setIntoDate(hotelOrder.getIntoDateString());
		hiq.setLeaveDate(hotelOrder.getLeaveDateString());
		hiq.setOrderDate(hotelOrder.getOrderDateString());
		hiq.setReserveCount(hotelOrder.getReserveCount());
		hiq.setTotalPirce(hotelOrder.getTotalPirce());
		hiq.setRoomSource(hotelOrder.getRoomSource());
		hiq.setOrderStatus(hotelOrder.getOrderStatus());				
		hiq.setExpandCol1(hotelOrder.getExpandCol1()); 
		hiq.setExpandCol2(hotelOrder.getExpandCol2()); 
		hiq.setExpandCol3(hotelOrder.getExpandCol3()); 
		hiq.setExpandCol4(hotelOrder.getExpandCol4()); 
		hiq.setExpandCol5(hotelOrder.getExpandCol5()); 
		return hiq;
		
	 }
	 public HotelOrder getHotelOrder(HotelOrderQuery hotelOrder)
	 {
		HotelOrder hiq = new HotelOrder();
		hiq.setId(hotelOrder.getId()); 
		hiq.setHotelId(hotelOrder.getHotelId()); 
		hiq.setHotelName(hotelOrder.getHotelName());     
		hiq.setRoomId(hotelOrder.getRoomId()); 
		hiq.setRoomName(hotelOrder.getRoomName()); 
		hiq.setVisitorName(hotelOrder.getVisitorName());		
		hiq.setPhoneNum(hotelOrder.getPhoneNum());
		hiq.setReserveDate(hotelOrder.getReserveDate());
		hiq.setIntoDate(hotelOrder.getIntoDate());
		hiq.setLeaveDate(hotelOrder.getLeaveDate());
		hiq.setOrderDate(hotelOrder.getOrderDate());
		hiq.setReserveCount(hotelOrder.getReserveCount());
		hiq.setTotalPirce(hotelOrder.getTotalPirce());
		hiq.setRoomSource(hotelOrder.getRoomSource());
		hiq.setOrderStatus(hotelOrder.getOrderStatus());				
		hiq.setExpandCol1(hotelOrder.getExpandCol1()); 
		hiq.setExpandCol2(hotelOrder.getExpandCol2()); 
		hiq.setExpandCol3(hotelOrder.getExpandCol3()); 
		hiq.setExpandCol4(hotelOrder.getExpandCol4()); 
		hiq.setExpandCol5(hotelOrder.getExpandCol5()); 
		return hiq;
		
	 }
	 /**
	  * 酒店订单注册
	  * @param hotelOrder 酒店订单对象
	 * @throws IOException 
	  * */
	 @RequestMapping("/v/hotel/hotelOrderAdd.do")
	 @ResponseBody
	 public String hotelOrderAdd(HttpServletRequest request,HttpSession session, HotelOrderQuery hotelOrder) throws IOException
	 {
		 Result result = new Result();
		// HotelOrderQuery hiq = getHotelOrderQuery(hotelOrder); 
		 User user = (User)session.getAttribute(Constants.USER_INFO);
		 if(user == null)
		 {
			 return result.setErrorMsg("请登录！").toJsonString();
		 }
		 else
		 {
			 hotelOrder.setExpandCol3(user.getId()+"");
		 }
		 
		 int count = hotelOrderService.queryHotelOrderCount(hotelOrder);  //判断 是否已经添加酒店订单 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelOrder.setId(String.valueOf(hotelOrderService.getGeneralId(null)));
	    		boolean hotelOrderFlag = hotelOrderService.addHotelOrder(getHotelOrder(hotelOrder));
	        	result.setSuccess(hotelOrderFlag);
	        	result.setMsg(hotelOrderFlag ? "添加酒店订单成功！" : "添加酒店订单失败");
	        	if(hotelOrderFlag) // 如果酒店订单 添加成功 则短信提醒 ，后续 更改为 订单支付成功 发送短信
	        	{
	        		String content = "您好！欢迎订购“"+hotelOrder.getHotelName()+"”大床房，总价："+hotelOrder.getExpandCol2()+"元 预计到店时间："+hotelOrder.getIntoDateString()+"  "+hotelOrder.getRoomSource()+"。 欢迎入住【紫藤车队】";
	        		String smsCode = duanXinSMS.sendSMS(hotelOrder.getPhoneNum(),content);	  
	        		System.out.println(smsCode); // 如果 smsCode 为 100 则证明发送成功	
	        		//保存发送记录，记录是否发送成功！ 
	        		
	        		int rscode = 
	        				duanXinSMS.saveSMSRc(hotelOrder.getId(), hotelOrder.getPhoneNum(), content, smsCode);
	        			
	        	}
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 
	 
	 /**
	  *酒店订单更新 
	  *@param hotelOrder 酒店订单对象
	  * */
	 /**
	  * 酒店订单注册
	  * @param hotelOrder 酒店订单对象
	  * */
	 @RequestMapping("/hotel/hotelOrderUpdate.do")
	 @ResponseBody
	 public String hotelOrderUpdate(HttpServletRequest request,HttpSession session, HotelOrder hotelOrder)
	 {
		 Result result = new Result();
		 
	     boolean hotelOrderFlag = hotelOrderService.updateHotelOrder(hotelOrder);
	     result.setSuccess(hotelOrderFlag);
	     result.setMsg(hotelOrderFlag ? "更新酒店订单成功！" : "更新酒店订单失败");
	        	
	    return result.toJsonString();
	 }
	 /**
	  * 更新订单状态
	  * @param hotelOrder 酒店订单对象
	  * */
	 @RequestMapping("/hotel/hotelOrderStateUpdate.do")
	 @ResponseBody
	 public String hotelOrderStateUpdate(HttpServletRequest request,HttpSession session, HotelOrder hotelOrder)
	 {
		 Result result = new Result();
		 
	     boolean hotelOrderFlag = hotelOrderService.updateHotelOrderState(hotelOrder);
	     result.setSuccess(hotelOrderFlag);
	     result.setMsg(hotelOrderFlag ? "更新酒店订单成功！" : "更新酒店订单失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店订单删除
	  * */
	 @RequestMapping("/hotel/hotelOrderDelete.do")
	 @ResponseBody
	 public String hotelOrderDelete(HttpServletRequest request,HttpSession session, HotelOrder hotelOrder)
	 {
		 Result result = new Result();
		 
	     boolean hotelOrderFlag = hotelOrderService.deleteHotelOrder(hotelOrder);
	     result.setSuccess(hotelOrderFlag);
	     result.setMsg(hotelOrderFlag ? "删除酒店订单成功！" : "删除酒店订单失败");
	    
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店订单批量删除
	  * */
	 @RequestMapping("/hotel/hotelOrdersDelete.do")
	 @ResponseBody
	 public String hotelOrdersDelete(HttpServletRequest request,HttpSession session, HotelOrderQuery hotelOrders)
	 {
		 Result result = new Result();
		 
	     boolean hotelOrderFlag = hotelOrderService.deleteHotelOrders(hotelOrders.getOrderContent());
	     result.setSuccess(hotelOrderFlag);
	     result.setMsg(hotelOrderFlag ? "删除酒店订单成功！" : "删除酒店订单失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店订单列表
	  * */
	 @RequestMapping("/v/hotel/getSearchHotelOrders.do")
	 @ResponseBody
	 public String getSearchHotelOrders(HttpServletRequest request,HttpSession session, HotelOrderQuery query)
	 {
		Result result = new Result();
		User user = (User)session.getAttribute(Constants.USER_INFO);
		 if(user == null)
		 {
			 return result.setErrorMsg("请登录！").toJsonString();
		 }
		 else
		 {
			 query.setExpandCol3(user.getId()+"");
		 }
		int           total     = hotelOrderService.queryHotelOrderCount(query);
	    List<HotelOrder> hotelOrders  = hotelOrderService.queryHotelOrder(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelOrders", hotelOrders);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 } 
	 
	 /**
	  * 酒店订单列表
	  * */
	 @RequestMapping("/v/hotel/getSearchHotelAllOrders.do")
	 @ResponseBody
	 public String getSearchHotelAllOrders(HttpServletRequest request,HttpSession session, HotelOrderQuery query)
	 {
		Result result = new Result();
		User user = (User)session.getAttribute(Constants.USER_INFO);
		 if(user == null)
		 {
			 
			 return result.setErrorMsg("请登录！").toJsonString();
		 }
		 
		int           total     = hotelOrderService.queryHotelOrderCount(query);
	    List<HotelOrder> hotelOrders  = hotelOrderService.queryHotelOrder(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelOrders", hotelOrders);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	   
	    return result.toJsonString();
	 } 
}
