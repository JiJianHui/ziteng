package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelEvaluateQuery;
import com.ziteng.entity.hotel.HotelEvaluate;
import com.ziteng.service.hotel.IHotelEvaluateService;

@Controller
public class HotelEvaluateController {
	@Autowired
	 private IHotelEvaluateService hotelEvaluateService;
	 public HotelEvaluateQuery getHotelEvaluateQuery(HotelEvaluate hotelEvaluate)
	 {
		HotelEvaluateQuery hiq = new HotelEvaluateQuery();
		hiq.setId(hotelEvaluate.getId()); 
		hiq.setHotelId(hotelEvaluate.getHotelId()); 
		hiq.setHotelName(hotelEvaluate.getHotelName());     
		hiq.setEvaluativeContent(hotelEvaluate.getEvaluativeContent()); 
		hiq.setHotelStep(hotelEvaluate.getHotelStep()); 
		hiq.setOtherInfo(hotelEvaluate.getOtherInfo()); 
		hiq.setExpandCol1(hotelEvaluate.getExpandCol1()); 
		hiq.setExpandCol2(hotelEvaluate.getExpandCol2()); 
		hiq.setExpandCol3(hotelEvaluate.getExpandCol3()); 
		hiq.setExpandCol4(hotelEvaluate.getExpandCol4()); 
		hiq.setExpandCol5(hotelEvaluate.getExpandCol5()); 
		return hiq;
		
	 }
	 
	 /**
	  * 酒店评价注册
	  * @param hotelEvaluate 酒店评价对象
	  * */
	 @RequestMapping("/hotel/hotelEvaluateAdd.do")
	 @ResponseBody
	 public String hotelEvaluateAdd(HttpServletRequest request,HttpSession session, HotelEvaluate hotelEvaluate)
	 {
		 Result result = new Result();
		 HotelEvaluateQuery hiq = getHotelEvaluateQuery(hotelEvaluate); 
		 
		 int count = hotelEvaluateService.queryHotelEvaluateCount(hiq);  //判断 是否已经添加酒店评价 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelEvaluate.setId(hotelEvaluateService.getGeneralId(null));
	    		boolean hotelEvaluateFlag = hotelEvaluateService.addHotelEvaluate(hotelEvaluate);
	        	result.setSuccess(hotelEvaluateFlag);
	        	result.setMsg(hotelEvaluateFlag ? "添加酒店评价成功！" : "添加酒店评价失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店评价更新 
	  *@param hotelEvaluate 酒店评价对象
	  * */	 
	 @RequestMapping("/hotel/hotelEvaluateUpdate.do")
	 @ResponseBody
	 public String hotelEvaluateUpdate(HttpServletRequest request,HttpSession session, HotelEvaluate hotelEvaluate)
	 {
		 Result result = new Result();
		 
	     boolean hotelEvaluateFlag = hotelEvaluateService.updateHotelEvaluate(hotelEvaluate);
	     result.setSuccess(hotelEvaluateFlag);
	     result.setMsg(hotelEvaluateFlag ? "更新酒店评价成功！" : "更新酒店评价失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店评价删除
	  * */
	 @RequestMapping("/hotel/hotelEvaluateDelete.do")
	 @ResponseBody
	 public String hotelEvaluateDelete(HttpServletRequest request,HttpSession session, HotelEvaluate hotelEvaluate)
	 {
		 Result result = new Result();
		 
	     boolean hotelEvaluateFlag = hotelEvaluateService.deleteHotelEvaluate(hotelEvaluate);
	     result.setSuccess(hotelEvaluateFlag);
	     result.setMsg(hotelEvaluateFlag ? "删除酒店评价成功！" : "删除酒店评价失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店评价批量删除
	  * */
	 @RequestMapping("/hotel/hotelEvaluatesDelete.do")
	 @ResponseBody
	 public String hotelEvaluatesDelete(HttpServletRequest request,HttpSession session, HotelEvaluateQuery hotelEvaluates)
	 {
		 Result result = new Result();
		 
	     boolean hotelEvaluateFlag = hotelEvaluateService.deleteHotelEvaluates(hotelEvaluates.getEvaContent());
	     result.setSuccess(hotelEvaluateFlag);
	     result.setMsg(hotelEvaluateFlag ? "删除酒店评价成功！" : "删除酒店评价失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店评价列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelEvaluates.do")
	 @ResponseBody
	 public String getSearchHotelEvaluates(HttpServletRequest request,HttpSession session, HotelEvaluateQuery query)
	 {
		Result result = new Result();
		int           total     = hotelEvaluateService.queryHotelEvaluateCount(query);
	    List<HotelEvaluate> hotelEvaluates  = hotelEvaluateService.queryHotelEvaluate(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelEvaluates", hotelEvaluates);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 } 
	 
}
