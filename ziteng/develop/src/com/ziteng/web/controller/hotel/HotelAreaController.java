package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelAreaQuery;
import com.ziteng.entity.hotel.HotelArea;
import com.ziteng.service.hotel.IHotelAreaService;

@Controller
public class HotelAreaController {
	 @Autowired
	 private IHotelAreaService hotelAreaService;
	 public HotelAreaQuery getHotelAreaQuery(HotelArea hotelArea)
	 {
		HotelAreaQuery hiq = new HotelAreaQuery();
		hiq.setId(hotelArea.getId()); 
		hiq.setAreaName(hotelArea.getAreaName()); 
		hiq.setAreaCode(hotelArea.getAreaCode());     
		hiq.setOrder(hotelArea.getOrder()); 
		return hiq;
		
	 }
	 
	 
	 /**
	  * 酒店地址添加
	  * @param hotelArea 酒店地址对象
	  * */
	 @RequestMapping("/hotel/hotelAreaAdd.do")
	 @ResponseBody
	 public String hotelAreaAdd(HttpServletRequest request,HttpSession session, HotelArea hotelArea)
	 {
		 Result result = new Result();
		 HotelAreaQuery hiq = getHotelAreaQuery(hotelArea); 
		 
		 int count = hotelAreaService.queryHotelAreaCount(hiq);  //判断 是否已经添加酒店地址 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelArea.setId(hotelAreaService.getGeneralId(null));
	    		boolean hotelAreaFlag = hotelAreaService.addHotelArea(hotelArea);
	        	result.setSuccess(hotelAreaFlag);
	        	result.setMsg(hotelAreaFlag ? "添加酒店地址成功！" : "添加酒店地址失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店地址更新 
	  *@param hotelArea 酒店地址对象
	  * */
	 @RequestMapping("/hotel/hotelAreaUpdate.do")
	 @ResponseBody
	 public String hotelAreaUpdate(HttpServletRequest request,HttpSession session, HotelArea hotelArea)
	 {
		 Result result = new Result();
		 
	     boolean hotelAreaFlag = hotelAreaService.updateHotelArea(hotelArea);
	     result.setSuccess(hotelAreaFlag);
	     result.setMsg(hotelAreaFlag ? "更新酒店地址成功！" : "更新酒店地址失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店地址删除
	  * */
	 @RequestMapping("/hotel/hotelAreaDelete.do")
	 @ResponseBody
	 public String hotelAreaDelete(HttpServletRequest request,HttpSession session, HotelArea hotelArea)
	 {
		 Result result = new Result();
		 
	     boolean hotelAreaFlag = hotelAreaService.deleteHotelArea(hotelArea);
	     result.setSuccess(hotelAreaFlag);
	     result.setMsg(hotelAreaFlag ? "删除酒店地址成功！" : "删除酒店地址失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店地址批量删除
	  * */
	 @RequestMapping("/hotel/hotelAreasDelete.do")
	 @ResponseBody
	 public String hotelAreasDelete(HttpServletRequest request,HttpSession session, HotelAreaQuery query)
	 {
		 Result result = new Result();
		 
	     boolean hotelAreaFlag = hotelAreaService.deleteHotelAreas(query.getAreaContents());
	     result.setSuccess(hotelAreaFlag);
	     result.setMsg(hotelAreaFlag ? "删除酒店地址成功！" : "删除酒店地址失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店地址列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelAreas.do")
	 @ResponseBody
	 public String getSearchHotelAreas(HttpServletRequest request,HttpSession session, HotelAreaQuery query)
	 {
		Result result = new Result();
		int           total     = hotelAreaService.queryHotelAreaCount(query);
	    List<HotelArea> hotelAreas  = hotelAreaService.queryHotelArea(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelAreas", hotelAreas);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 }
}
