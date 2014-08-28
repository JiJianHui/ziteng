package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelSmsRecQuery;
import com.ziteng.entity.hotel.HotelSmsRec;

public interface IHotelSmsRecService {
	/**
	 * 添加预订信息短信记录
	 * @param hotelSmsRec 为传递的实体类对象 
	 * */
	public boolean addHotelSmsRec(HotelSmsRec hotelSmsRec);
	
	/**
	 * 更新预订信息短信记录
	 * @param hotelSmsRec 为传递的实体类对象 
	 * */
	public boolean updateHotelSmsRec(HotelSmsRec hotelSmsRec);
	
	/**
	 * 删除预订信息短信记录
	 * @param hotelSmsRec 为传递的实体类对象 
	 * */
	public boolean deleteHotelSmsRec(HotelSmsRec hotelSmsRec);
	
	/**
	 * 删除预订信息短信记录 列表
	 * @param hotelSmsRecs 为传递的实体类对象 
	 * */
	public boolean deleteHotelSmsRecs(String hotelSmsRecs);
	
	/**
	 * 查询预订信息短信记录列表
	 * @param query   查询条件
	 * */
	public List<HotelSmsRec> queryHotelSmsRec(HotelSmsRecQuery query);
	
	/**
	 * 查询预订信息短信记录数量
	 * @param query 查询条件
	 * */
	public int queryHotelSmsRecCount(HotelSmsRecQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelSmsRecQuery query);
}
