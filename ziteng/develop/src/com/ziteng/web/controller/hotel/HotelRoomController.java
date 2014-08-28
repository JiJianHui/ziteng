package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelRoomQuery;
import com.ziteng.entity.hotel.HotelInfo;
import com.ziteng.entity.hotel.HotelRoom;
import com.ziteng.service.hotel.IHotelInfoService;
import com.ziteng.service.hotel.IHotelRoomService;

@Controller
public class HotelRoomController {
	@Autowired
	 private IHotelRoomService hotelRoomService;
	
	@Autowired
	 private IHotelInfoService hotelInfoService;
	 public HotelRoomQuery getHotelRoomQuery(HotelRoom hotelRoom)
	 {
		HotelRoomQuery hiq = new HotelRoomQuery();
		hiq.setId(hotelRoom.getId()); 
		hiq.setHotelId(hotelRoom.getHotelId()); 
		
		hiq.setWideType(hotelRoom.getWideType());     
		hiq.setRoomType(hotelRoom.getRoomType()); 
		hiq.setRoomPrice(hotelRoom.getRoomPrice()); 
		hiq.setRecommendRoom(hotelRoom.getRecommendRoom()); 
		hiq.setBreakfastType(hotelRoom.getBreakfastType()); 
		hiq.setRoomName(hotelRoom.getRoomName());     
		hiq.setRoomNum(hotelRoom.getRoomNum()); 
		hiq.setRoomDesc(hotelRoom.getRoomDesc()); 
		hiq.setRoomRemarks(hotelRoom.getRoomRemarks()); 
		hiq.setRoomPhoto1(hotelRoom.getRoomPhoto1()); 
		hiq.setRoomPhoto2(hotelRoom.getRoomPhoto2());  		
		hiq.setRoomPhoto3(hotelRoom.getRoomPhoto3()); 
		hiq.setExpandCol1(hotelRoom.getExpandCol1());
		hiq.setExpandCol2(hotelRoom.getExpandCol2());
		hiq.setExpandCol3(hotelRoom.getExpandCol3());
		hiq.setExpandCol4(hotelRoom.getExpandCol4());
		hiq.setExpandCol5(hotelRoom.getExpandCol5());
		return hiq;
		
	 }
	 
	 /**
	  * 酒店客房注册
	  * @param hotelRoom 酒店客房对象
	  * */
	 @RequestMapping("/hotel/hotelRoomAdd.do")
	 @ResponseBody
	 public String hotelRoomAdd(HttpServletRequest request,HttpSession session, HotelRoom hotelRoom)
	 {
		 Result result = new Result();
		 HotelRoomQuery hiq = getHotelRoomQuery(hotelRoom); 
		 
		 int count = hotelRoomService.queryHotelRoomCount(hiq);  //判断 是否已经添加酒店客房 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelRoom.setId(hotelRoomService.getGeneralId(null));
	    		boolean hotelRoomFlag = hotelRoomService.addHotelRoom(hotelRoom);
	        	result.setSuccess(hotelRoomFlag);
	        	result.setMsg(hotelRoomFlag ? "添加酒店客房成功！" : "添加酒店客房失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店客房更新 
	  *@param hotelRoom 酒店客房对象
	  * */	
	 @RequestMapping("/hotel/hotelRoomUpdate.do")
	 @ResponseBody
	 public String hotelRoomUpdate(HttpServletRequest request,HttpSession session, HotelRoom hotelRoom)
	 {
		 Result result = new Result();
		 
	     boolean hotelRoomFlag = hotelRoomService.updateHotelRoom(hotelRoom);
	     result.setSuccess(hotelRoomFlag);
	     result.setMsg(hotelRoomFlag ? "更新酒店客房成功！" : "更新酒店客房失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店客房删除
	  * */
	 @RequestMapping("/hotel/hotelRoomDelete.do")
	 @ResponseBody
	 public String hotelRoomDelete(HttpServletRequest request,HttpSession session, HotelRoom hotelRoom)
	 {
		 Result result = new Result();
		 
	     boolean hotelRoomFlag = hotelRoomService.deleteHotelRoom(hotelRoom);
	     result.setSuccess(hotelRoomFlag);
	     result.setMsg(hotelRoomFlag ? "删除酒店客房成功！" : "删除酒店客房失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店客房批量删除
	  * */
	 @RequestMapping("/hotel/hotelRoomsDelete.do")
	 @ResponseBody
	 public String hotelRoomsDelete(HttpServletRequest request,HttpSession session, HotelRoomQuery hotelRooms)
	 {
		 Result result = new Result();
		 
	     boolean hotelRoomFlag = hotelRoomService.deleteHotelRooms(hotelRooms.getRoomContents());
	     result.setSuccess(hotelRoomFlag);
	     result.setMsg(hotelRoomFlag ? "删除酒店客房成功！" : "删除酒店客房失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店客房列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelRooms.do")
	 @ResponseBody
	 public String getSearchHotelRooms(HttpServletRequest request,HttpSession session, HotelRoomQuery query)
	 {
		Result result = new Result();
		int           total     = hotelRoomService.queryHotelRoomCount(query);
	    List<HotelRoom> hotelRooms  = hotelRoomService.queryHotelRoom(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    for(int i = 0; i < hotelRooms.size(); i++)
	    {
	    	HotelRoom hm = hotelRooms.get(i);
	    	String hotelName = "" + hm.getHotelId();
	    	hm.setExpandCol1(hotelName);
	    	if(null != hm.getHotelId())
	    	{
		    	HotelInfo hotelInfo  = hotelInfoService.queryHotelInfoDef(hm.getHotelId());
		    	if(hotelInfo!=null)
		    	{
		    		hotelName = hotelInfo.getHotelName();
		    		hm.setExpandCol1(hotelName);
		    		System.out.print("a");
		    	}
	    	}
	    	
	    	
	    }
	    result.putObject("total", total);  
	    result.putObject("hotelRooms", hotelRooms);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	    
	    
	        
	    return result.toJsonString();
	 } 
	 
	 
	 /**
	  * 客房信息
	  * */
	 @RequestMapping("/hotel/getRoomInfo.do")
	 @ResponseBody
	 public String getRoomInfo(HttpServletRequest request,HttpSession session, HotelRoomQuery query)
	 {
		Result result = new Result();
		
		int           total     = hotelRoomService.queryHotelRoomCount(query);
		
		HotelRoom roomInfo  = hotelRoomService.queryRoomInfoDef(query.getId());
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("roomInfo", roomInfo);  
	    
	        
	    return result.toJsonString();
	 }
}
