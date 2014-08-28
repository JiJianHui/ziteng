package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelTypeQuery;
import com.ziteng.entity.hotel.HotelType;
import com.ziteng.service.hotel.IHotelTypeService;

@Controller
public class HotelTypeController {
	 @Autowired
	 private IHotelTypeService hotelTypeService;
	 public HotelTypeQuery getHotelTypeQuery(HotelType hotelType)
	 {
		HotelTypeQuery hiq = new HotelTypeQuery();
		hiq.setId(hotelType.getId()); 
		hiq.setHotelType(hotelType.getHotelType()); 
		hiq.setOrder(hotelType.getOrder()); 
		return hiq;
		
	 }
	 
	 
	 /**
	  * 酒店类型添加
	  * @param hotelType 酒店类型对象
	  * */
	 @RequestMapping("/hotel/hotelTypeAdd.do")
	 @ResponseBody
	 public String hotelTypeAdd(HttpServletRequest request,HttpSession session, HotelType hotelType)
	 {
		 Result result = new Result();
		 HotelTypeQuery hiq = getHotelTypeQuery(hotelType); 
		 
		 int count = hotelTypeService.queryHotelTypeCount(hiq);  //判断 是否已经添加酒店类型 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelType.setId(hotelTypeService.getGeneralId(null));
	    		boolean hotelTypeFlag = hotelTypeService.addHotelType(hotelType);
	        	result.setSuccess(hotelTypeFlag);
	        	result.setMsg(hotelTypeFlag ? "添加酒店类型成功！" : "添加酒店类型失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店类型更新 
	  *@param hotelType 酒店类型对象
	  * */
	 @RequestMapping("/hotel/hotelTypeUpdate.do")
	 @ResponseBody
	 public String hotelTypeUpdate(HttpServletRequest request,HttpSession session, HotelType hotelType)
	 {
		 Result result = new Result();
		 
	     boolean hotelTypeFlag = hotelTypeService.updateHotelType(hotelType);
	     result.setSuccess(hotelTypeFlag);
	     result.setMsg(hotelTypeFlag ? "更新酒店类型成功！" : "更新酒店类型失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店类型删除
	  * */
	 @RequestMapping("/hotel/hotelTypeDelete.do")
	 @ResponseBody
	 public String hotelTypeDelete(HttpServletRequest request,HttpSession session, HotelType hotelType)
	 {
		 Result result = new Result();
		 
	     boolean hotelTypeFlag = hotelTypeService.deleteHotelType(hotelType);
	     result.setSuccess(hotelTypeFlag);
	     result.setMsg(hotelTypeFlag ? "删除酒店类型成功！" : "删除酒店类型失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店类型批量删除
	  * */
	 @RequestMapping("/hotel/hotelTypesDelete.do")
	 @ResponseBody
	 public String hotelTypesDelete(HttpServletRequest request,HttpSession session, HotelTypeQuery hotelTypes)
	 {
		 Result result = new Result();
		 
	     boolean hotelTypeFlag = hotelTypeService.deleteHotelTypes(hotelTypes.getTypeContents());
	     result.setSuccess(hotelTypeFlag);
	     result.setMsg(hotelTypeFlag ? "删除酒店类型成功！" : "删除酒店类型失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店类型列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelTypes.do")
	 @ResponseBody
	 public String getSearchHotelTypes(HttpServletRequest request,HttpSession session, HotelTypeQuery query)
	 {
		Result result = new Result();
		int           total     = hotelTypeService.queryHotelTypeCount(query);
	    List<HotelType> hotelTypes  = hotelTypeService.queryHotelType(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelTypes", hotelTypes);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 }
}
