package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelInfoQuery;
import com.ziteng.dto.query.hotel.HotelPhotoQuery;
import com.ziteng.dto.query.hotel.HotelRoomQuery;
import com.ziteng.entity.hotel.HotelInfo;
import com.ziteng.entity.hotel.HotelPhoto;
import com.ziteng.entity.hotel.HotelRoom;
import com.ziteng.service.hotel.IHotelInfoService;
import com.ziteng.service.hotel.IHotelPhotoService;
import com.ziteng.service.hotel.IHotelRoomService;

@Controller
public class HotelInfoController {
	 @Autowired
	 private IHotelInfoService hotelInfoService;
	 @Autowired
	 private IHotelRoomService hotelRoomService;	 
	 @Autowired
	 private IHotelPhotoService hotelPhotoService;

	 public HotelInfoQuery getHotelInfoQuery(HotelInfo hotelInfo)
	 {
		 HotelInfoQuery hiq = new HotelInfoQuery(); 
		 hiq.setHotelName(hotelInfo.getHotelName());         //酒店名称
		 hiq.setHotelAddress(hotelInfo.getHotelAddress());   //酒店地址
		 hiq.setHotelManger(hotelInfo.getHotelManger());     //酒店负责人
		 hiq.setHotelMgnPhone(hotelInfo.getHotelMgnPhone()); //酒店联系电话
		 hiq.setHotelStar(hotelInfo.getHotelStar());
		 hiq.setHotelType(hotelInfo.getHotelType());
		 hiq.setOwnProvince(hotelInfo.getOwnProvince());
		 hiq.setOwnArea(hotelInfo.getOwnArea());
		 hiq.setAddressDesc(hotelInfo.getAddressDesc());
		 hiq.setRoomPrice(hotelInfo.getRoomPrice());
		 hiq.setRoomNum(hotelInfo.getRoomNum());
		 hiq.setLandMarks(hotelInfo.getLandMarks());
		 hiq.setHotelContent(hotelInfo.getHotelContent());
		 hiq.setHotelServices(hotelInfo.getHotelServices());
		 hiq.setHotelImgUrl(hotelInfo.getHotelImgUrl());
		 hiq.setMessageConfirm(hotelInfo.getMessageConfirm());
		 hiq.setHotelOrder(hotelInfo.getHotelOrder());
		 hiq.setBrowseNum(hotelInfo.getBrowseNum());
		 hiq.setReserveNum(hotelInfo.getReserveNum());
		 hiq.setHotelGood(hotelInfo.getHotelGood());
		 hiq.setHotelBad(hotelInfo.getHotelBad());
		 hiq.setRemarks(hotelInfo.getRemarks());
		 hiq.setExpandCol1(hotelInfo.getExpandCol1());
		 hiq.setExpandCol2(hotelInfo.getExpandCol2());
		 hiq.setExpandCol3(hotelInfo.getExpandCol3());
		 hiq.setExpandCol4(hotelInfo.getExpandCol4());
		 hiq.setExpandCol5(hotelInfo.getExpandCol5());
		 return hiq;
	 }
	 
	 /**
	  * 酒店信息注册
	  * @param hotelInfo 酒店信息对象
	  * */
	 @RequestMapping("/hotel/hotelInfoAdd.do")
	 @ResponseBody
	 public String hotelInfoAdd(HttpServletRequest request,HttpSession session, HotelInfo hotelInfo)
	 {
		 Result result = new Result();
		 HotelInfoQuery hiq = getHotelInfoQuery(hotelInfo); 
		 
		 int count = hotelInfoService.queryHotelInfoCount(hiq);  //判断 是否已经添加酒店信息 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelInfo.setId(hotelInfoService.getGeneralId(null));
	    		boolean hotelInfoFlag = hotelInfoService.addHotelInfo(hotelInfo);
	        	result.setSuccess(hotelInfoFlag);
	        	result.setMsg(hotelInfoFlag ? "添加酒店信息成功！" : "添加酒店信息失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店信息更新 
	  *@param hotelInfo 酒店信息对象
	  * */
	 @RequestMapping("/hotel/hotelInfoUpdate.do")
	 @ResponseBody
	 public String hotelInfoUpdate(HttpServletRequest request,HttpSession session, HotelInfo hotelInfo)
	 {
		 Result result = new Result();
		 
	     boolean hotelInfoFlag = hotelInfoService.updateHotelInfo(hotelInfo);
	     result.setSuccess(hotelInfoFlag);
	     result.setMsg(hotelInfoFlag ? "更新酒店信息成功！" : "更新酒店信息失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店信息删除
	  * */
	 @RequestMapping("/hotel/hotelInfoDelete.do")
	 @ResponseBody
	 public String hotelInfoDelete(HttpServletRequest request,HttpSession session, HotelInfo hotelInfo)
	 {
		 System.out.println("here now");
		 Result result = new Result();
		 
		 
	     boolean hotelInfoFlag = hotelInfoService.deleteHotelInfo(hotelInfo);
	     result.setSuccess(hotelInfoFlag);
	     result.setMsg(hotelInfoFlag ? "删除酒店信息成功！" : "删除酒店信息失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店信息批量删除
	  * */
	 @RequestMapping("/hotel/hotelInfosDelete.do")
	 @ResponseBody
	 public String hotelInfosDelete(HttpServletRequest request,HttpSession session, HotelInfoQuery query)
	 {
		 Result result = new Result();
		 
	     boolean hotelInfoFlag = hotelInfoService.deleteHotelInfos(query.getHotelContent());
	     result.setSuccess(hotelInfoFlag);
	     result.setMsg(hotelInfoFlag ? "删除酒店信息成功！" : "删除酒店信息失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店信息列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelInfos.do")
	 @ResponseBody
	 public String getSearchHotelInfos(HttpServletRequest request,HttpSession session, HotelInfoQuery query)
	 {
		Result result = new Result();
		int           total     = hotelInfoService.queryHotelInfoCount(query);
	    List<HotelInfo> hotelInfos  = hotelInfoService.queryHotelInfo(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelInfos", hotelInfos);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店信息列表 包括酒店的客房 
	  * */
	 @RequestMapping("/hotel/getSearchHotelInfosAndRooms.do")
	 @ResponseBody
	 public String getSearchHotelInfosAndRooms(HttpServletRequest request,HttpSession session, HotelInfoQuery query)
	 {
		Result result = new Result();
		int           total     = hotelInfoService.queryHotelInfoCount(query);
	    List<HotelInfo> hotelInfos  = hotelInfoService.queryHotelInfo(query);
	    for(HotelInfo ht : hotelInfos)
	    {
	    	//根据酒店id获取酒店客房别做为酒店对象的一个属性
	    	//hotelRoomService
	    	HotelRoomQuery hrq = new HotelRoomQuery();
	    	hrq.setHotelId(ht.getId());
	    	List<HotelRoom> hrs = hotelRoomService.queryHotelRoom(hrq);
	    	ht.setRooms(hrs);
	    }
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelInfos", hotelInfos);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店信息列表 包括酒店的客房 
	  * */
	 @RequestMapping("/hotel/getIndexHotelInfosAndRooms.do")
	 @ResponseBody
	 public String getIndexHotelInfosAndRooms(HttpServletRequest request,HttpSession session, HotelInfoQuery query)
	 {
		Result result = new Result();
		int total = hotelInfoService.queryHotelInfoCount(query);
	    List<HotelInfo> hotelInfos  = hotelInfoService.queryIndexHotelInfo(query);
	    for(HotelInfo ht : hotelInfos)
	    {
	    	//根据酒店id获取酒店客房别做为酒店对象的一个属性
	    	//hotelRoomService
	    	HotelRoomQuery hrq = new HotelRoomQuery();
	    	hrq.setHotelId(ht.getId());
	    	List<HotelRoom> hrs = hotelRoomService.queryHotelRoom(hrq);
	    	ht.setRooms(hrs);
	    }
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelInfos", hotelInfos);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 }
	  
	 
	 /**
	  * 酒店信息
	  * */
	 @RequestMapping("/hotel/getHotelInfo.do")
	 @ResponseBody
	 public String getHotelInfo(HttpServletRequest request,HttpSession session, HotelInfoQuery query)
	 {
		Result result = new Result();
		
		int           total     = hotelInfoService.queryHotelInfoCount(query);
	    HotelInfo hotelInfo  = hotelInfoService.queryHotelInfoDef(query.getId());
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelInfo", hotelInfo);  
	    
	        
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店信息 包括 图片列表、房间列表
	  * */
	 @RequestMapping("/hotel/getHotelDetail.do")
	 @ResponseBody
	 public String getHotelDetail(HttpServletRequest request,HttpSession session, HotelInfoQuery query)
	 {
		Result result = new Result();
		
		
	    HotelInfo hotelInfo  = hotelInfoService.queryHotelInfoDef(query.getId());
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    //根据hotelId 获取 酒店图片列表 和酒店房间列表
	    
	    //第一步 获取 酒店图片
	    HotelPhotoQuery hiq = new HotelPhotoQuery();		
		hiq.setHotelId(query.getId()); 		
	    List<HotelPhoto> hotelPhotos  = hotelPhotoService.queryHotelPhoto(hiq);
	    
	    //第二部获取酒店房间列表
	    HotelRoomQuery hrq = new HotelRoomQuery();
    	hrq.setHotelId(query.getId());
    	List<HotelRoom> hrs = hotelRoomService.queryHotelRoom(hrq);
    	
    	hotelInfo.setRooms(hrs);    	
	    result.putObject("hotelInfo", hotelInfo);  
	    result.putObject("hotelPhotos", hotelPhotos);  
	    
	        
	    return result.toJsonString();
	 }
}
