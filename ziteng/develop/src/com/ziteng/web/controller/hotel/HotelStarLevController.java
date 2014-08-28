package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelStarLevQuery;
import com.ziteng.entity.hotel.HotelStarLev;
import com.ziteng.service.hotel.IHotelStarLevService;

@Controller
public class HotelStarLevController {
	 @Autowired
	 private IHotelStarLevService hotelStarLevService;
	 public HotelStarLevQuery getHotelStarLevQuery(HotelStarLev hotelStarLev)
	 {
		HotelStarLevQuery hiq = new HotelStarLevQuery();
		hiq.setId(hotelStarLev.getId()); 
		hiq.setHotelStar(hotelStarLev.getHotelStar()); 
		hiq.setOrder(hotelStarLev.getOrder()); 
		return hiq;
		
	 }
	 
	 
	 /**
	  * 酒店星级添加
	  * @param hotelStarLev 酒店星级对象
	  * */
	 @RequestMapping("/hotel/hotelStarLevAdd.do")
	 @ResponseBody
	 public String hotelStarLevAdd(HttpServletRequest request,HttpSession session, HotelStarLev hotelStarLev)
	 {
		 Result result = new Result();
		 HotelStarLevQuery hiq = getHotelStarLevQuery(hotelStarLev); 
		 
		 int count = hotelStarLevService.queryHotelStarLevCount(hiq);  //判断 是否已经添加酒店星级 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelStarLev.setId(hotelStarLevService.getGeneralId(null));
	    		boolean hotelStarLevFlag = hotelStarLevService.addHotelStarLev(hotelStarLev);
	        	result.setSuccess(hotelStarLevFlag);
	        	result.setMsg(hotelStarLevFlag ? "添加酒店星级成功！" : "添加酒店星级失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店星级更新 
	  *@param hotelStarLev 酒店星级对象
	  * */
	 @RequestMapping("/hotel/hotelStarLevUpdate.do")
	 @ResponseBody
	 public String hotelStarLevUpdate(HttpServletRequest request,HttpSession session, HotelStarLev hotelStarLev)
	 {
		 Result result = new Result();
		 
	     boolean hotelStarLevFlag = hotelStarLevService.updateHotelStarLev(hotelStarLev);
	     result.setSuccess(hotelStarLevFlag);
	     result.setMsg(hotelStarLevFlag ? "更新酒店星级成功！" : "更新酒店星级失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店星级删除
	  * */
	 @RequestMapping("/hotel/hotelStarLevDelete.do")
	 @ResponseBody
	 public String hotelStarLevDelete(HttpServletRequest request,HttpSession session, HotelStarLev hotelStarLev)
	 {
		 Result result = new Result();
		 
	     boolean hotelStarLevFlag = hotelStarLevService.deleteHotelStarLev(hotelStarLev);
	     result.setSuccess(hotelStarLevFlag);
	     result.setMsg(hotelStarLevFlag ? "删除酒店星级成功！" : "删除酒店星级失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店星级批量删除
	  * */
	 @RequestMapping("/hotel/hotelStarLevsDelete.do")
	 @ResponseBody
	 public String hotelStarLevsDelete(HttpServletRequest request,HttpSession session, HotelStarLevQuery hotelStarLevs)
	 {
		 Result result = new Result();
		 
	     boolean hotelStarLevFlag = hotelStarLevService.deleteHotelStarLevs(hotelStarLevs.getStarContents());
	     result.setSuccess(hotelStarLevFlag);
	     result.setMsg(hotelStarLevFlag ? "删除酒店星级成功！" : "删除酒店星级失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店星级列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelStarLevs.do")
	 @ResponseBody
	 public String getSearchHotelStarLevs(HttpServletRequest request,HttpSession session, HotelStarLevQuery query)
	 {
		Result result = new Result();
		int           total     = hotelStarLevService.queryHotelStarLevCount(query);
	    List<HotelStarLev> hotelStarLevs  = hotelStarLevService.queryHotelStarLev(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelStarLevs", hotelStarLevs);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 }
}
