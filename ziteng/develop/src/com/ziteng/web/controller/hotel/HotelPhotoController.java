package com.ziteng.web.controller.hotel;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.hotel.HotelPhotoQuery;
import com.ziteng.entity.hotel.HotelPhoto;
import com.ziteng.service.hotel.IHotelPhotoService;

@Controller
public class HotelPhotoController {
	@Autowired
	 private IHotelPhotoService hotelPhotoService;
	 public HotelPhotoQuery getHotelPhotoQuery(HotelPhoto hotelPhoto)
	 {
		HotelPhotoQuery hiq = new HotelPhotoQuery();
		hiq.setId(hotelPhoto.getId()); 
		hiq.setHotelId(hotelPhoto.getHotelId()); 
		hiq.setHotelName(hotelPhoto.getHotelName());     
		hiq.setImgUrl(hotelPhoto.getImgUrl()); 
		hiq.setUploadDate(hotelPhoto.getUploadDate()); 
		hiq.setOrder(hotelPhoto.getOrder()); 
		hiq.setRemarks(hotelPhoto.getRemarks()); 
		return hiq;
		
	 }
	 
	 /**
	  * 酒店图片注册
	  * @param hotelPhoto 酒店图片对象
	  * */
	 @RequestMapping("/hotel/hotelPhotoAdd.do")
	 @ResponseBody
	 public String hotelPhotoAdd(HttpServletRequest request,HttpSession session, HotelPhoto hotelPhoto)
	 {
		 Result result = new Result();
		 HotelPhotoQuery hiq = getHotelPhotoQuery(hotelPhoto); 
		 
		 int count = hotelPhotoService.queryHotelPhotoCount(hiq);  //判断 是否已经添加酒店图片 如果添加则不允许重复
	    	if(count > 0){
	    		result.setSuccess(false);
	    		result.setMsg("该酒店已经添加");
	    		
	    	}else{
	    		hotelPhoto.setId(hotelPhotoService.getGeneralId(null));
	    		boolean hotelPhotoFlag = hotelPhotoService.addHotelPhoto(hotelPhoto);
	        	result.setSuccess(hotelPhotoFlag);
	        	result.setMsg(hotelPhotoFlag ? "添加酒店图片成功！" : "添加酒店图片失败");
	        	
	    	}
	    	return result.toJsonString();
	 }
	 
	 /**
	  *酒店图片更新 
	  *@param hotelPhoto 酒店图片对象
	  * */	
	 @RequestMapping("/hotel/hotelPhotoUpdate.do")
	 @ResponseBody
	 public String hotelPhotoUpdate(HttpServletRequest request,HttpSession session, HotelPhoto hotelPhoto)
	 {
		 Result result = new Result();
		 
	     boolean hotelPhotoFlag = hotelPhotoService.updateHotelPhoto(hotelPhoto);
	     result.setSuccess(hotelPhotoFlag);
	     result.setMsg(hotelPhotoFlag ? "更新酒店图片成功！" : "更新酒店图片失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店图片删除
	  * */
	 @RequestMapping("/hotel/hotelPhotoDelete.do")
	 @ResponseBody
	 public String hotelPhotoDelete(HttpServletRequest request,HttpSession session, HotelPhoto hotelPhoto)
	 {
		 Result result = new Result();
		 
	     boolean hotelPhotoFlag = hotelPhotoService.deleteHotelPhoto(hotelPhoto);
	     result.setSuccess(hotelPhotoFlag);
	     result.setMsg(hotelPhotoFlag ? "删除酒店图片成功！" : "删除酒店图片失败");
	        	
	    return result.toJsonString();
	 }
	 
	 /**
	  * 酒店图片批量删除
	  * */
	 @RequestMapping("/hotel/hotelPhotosDelete.do")
	 @ResponseBody
	 public String hotelPhotosDelete(HttpServletRequest request,HttpSession session, HotelPhotoQuery hotelPhotos)
	 {
		 Result result = new Result();
		 
	     boolean hotelPhotoFlag = hotelPhotoService.deleteHotelPhotos(hotelPhotos.getPhotoContent());
	     result.setSuccess(hotelPhotoFlag);
	     result.setMsg(hotelPhotoFlag ? "删除酒店图片成功！" : "删除酒店图片失败");
	        	
	    return result.toJsonString();
	 }
	 
	 
	 /**
	  * 酒店图片列表
	  * */
	 @RequestMapping("/hotel/getSearchHotelPhotos.do")
	 @ResponseBody
	 public String getSearchHotelPhotos(HttpServletRequest request,HttpSession session, HotelPhotoQuery query)
	 {
		Result result = new Result();
		int           total     = hotelPhotoService.queryHotelPhotoCount(query);
	    List<HotelPhoto> hotelPhotos  = hotelPhotoService.queryHotelPhoto(query);
	    result.setSuccess(true);
	    result.setMsg("查询成功");
	    //此处返回查询的结果，需要进行一下映射
	    result.putObject("total", total);  
	    result.putObject("hotelPhotos", hotelPhotos);  
	    result.putObject("pageNo",query.getPageNo());
	    result.putObject("pageSize", query.getPageSize());
	        
	    return result.toJsonString();
	 } 
}
