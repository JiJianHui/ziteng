package com.ziteng.web.controller.hotel;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelSmsRecQuery;
import com.ziteng.entity.hotel.HotelSmsRec;
import com.ziteng.service.hotel.IDuanXinSMSService;
import com.ziteng.service.hotel.IHotelSmsRecService;

@Controller
public class HotelSmsRecController {
	@Autowired
	 private IHotelSmsRecService hotelSmsRecService;
	@Autowired
	 private IDuanXinSMSService duanXinSMS;
	
	 public HotelSmsRecQuery getHotelSmsRecQuery(HotelSmsRec hotelSmsRec)
	 {
		HotelSmsRecQuery hiq = new HotelSmsRecQuery();
		hiq.setId(hotelSmsRec.getId()); 
		hiq.setOrderId(hotelSmsRec.getOrderId()); 		
		hiq.setSender(hotelSmsRec.getSender());     
		hiq.setSenderPhone(hotelSmsRec.getSenderPhone()); 
		hiq.setMessageType(hotelSmsRec.getMessageType()); 
		hiq.setReceive(hotelSmsRec.getReceive()); 
		hiq.setReceivePhone(hotelSmsRec.getReceivePhone());     
		hiq.setMessageContent(hotelSmsRec.getMessageContent()); 
		hiq.setCreateTime(hotelSmsRec.getCreateTime()); 
		hiq.setRemarks(hotelSmsRec.getRemarks()); 
		return hiq;
		
	 }
	 
	 /**
	  * 酒店订单短信注册
	  * @param hotelSmsRec 酒店订单短信对象
	  * */
	 @RequestMapping("/hotel/hotelSmsRecAdd.do")
	 @ResponseBody
	 public String hotelSmsRecAdd(HttpServletRequest request,HttpSession session, HotelSmsRec hotelSmsRec)
	 {
		 Result result = new Result();
		 HotelSmsRecQuery hiq = getHotelSmsRecQuery(hotelSmsRec); 
		 
		 int count = hotelSmsRecService.queryHotelSmsRecCount(hiq);  //判断 是否已经添加酒店订单短信 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelSmsRec.setId(hotelSmsRecService.getGeneralId(null));
	    		boolean hotelSmsRecFlag = hotelSmsRecService.addHotelSmsRec(hotelSmsRec);
	        	result.setSuccess(hotelSmsRecFlag);
	        	result.setMsg(hotelSmsRecFlag ? "添加酒店订单短信成功！" : "添加酒店订单短信失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店订单短信更新 
	  *@param hotelSmsRec 酒店订单短信对象
	  * */	
	 @RequestMapping("/hotel/hotelSmsRecUpdate.do")
	 @ResponseBody
	 public String hotelSmsRecUpdate(HttpServletRequest request,HttpSession session, HotelSmsRec hotelSmsRec)
	 {
		 Result result = new Result();
		 
	     boolean hotelSmsRecFlag = hotelSmsRecService.updateHotelSmsRec(hotelSmsRec);
	     result.setSuccess(hotelSmsRecFlag);
	     result.setMsg(hotelSmsRecFlag ? "更新酒店订单短信成功！" : "更新酒店订单短信失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店订单短信删除
	  * */
	 @RequestMapping("/hotel/hotelSmsRecDelete.do")
	 @ResponseBody
	 public String hotelSmsRecDelete(HttpServletRequest request,HttpSession session, HotelSmsRec hotelSmsRec)
	 {
		 Result result = new Result();
		 
	     boolean hotelSmsRecFlag = hotelSmsRecService.deleteHotelSmsRec(hotelSmsRec);
	     result.setSuccess(hotelSmsRecFlag);
	     result.setMsg(hotelSmsRecFlag ? "删除酒店订单短信成功！" : "删除酒店订单短信失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店订单短信批量删除
	  * */
	 @RequestMapping("/hotel/hotelSmsRecsDelete.do")
	 @ResponseBody
	 public String hotelSmsRecsDelete(HttpServletRequest request,HttpSession session, HotelSmsRecQuery hotelSmsRecs)
	 {
		 Result result = new Result();
		 
	     boolean hotelSmsRecFlag = hotelSmsRecService.deleteHotelSmsRecs(hotelSmsRecs.getSmsRecContents());
	     result.setSuccess(hotelSmsRecFlag);
	     result.setMsg(hotelSmsRecFlag ? "删除酒店订单短信成功！" : "删除酒店订单短信失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 保存回复的短信内容
	 * @throws IOException 
	  * **/
	 @RequestMapping("/hotel/saveReplaySMS.do")
	 @ResponseBody
	 public String saveReplaySMS(HttpServletRequest request,HttpSession session, HotelSmsRecQuery query) throws IOException
	 {
		 Result result = new Result();
		 result.setSuccess(true);
		 result.setMsg("获取回复短信成功");
		 String xml = duanXinSMS.getSMSRe(); //获取回复的短信内容
		 result.putObject("SMSReplays", xml);   			
		 return result.toJsonString();
	 }
	 
	 /**
	  * 酒店订单短信列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelSmsRecs.do")
	 @ResponseBody
	 public String getSearchHotelSmsRecs(HttpServletRequest request,HttpSession session, HotelSmsRecQuery query)
	 {
		Result result = new Result();
		int           total     = hotelSmsRecService.queryHotelSmsRecCount(query);
	    List<HotelSmsRec> hotelSmsRecs  = hotelSmsRecService.queryHotelSmsRec(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelSmsRecs", hotelSmsRecs);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 } 
}
