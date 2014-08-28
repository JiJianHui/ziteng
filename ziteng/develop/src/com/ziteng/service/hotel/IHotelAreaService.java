package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelAreaQuery;
import com.ziteng.entity.hotel.HotelArea;

public interface IHotelAreaService {
	/**
	 * 添加酒店地区
	 * @param hotelArea 为传递的实体类对象 
	 * */
	public boolean addHotelArea(HotelArea hotelArea);
	
	/**
	 * 更新酒店地区
	 * @param hotelArea 为传递的实体类对象 
	 * */
	public boolean updateHotelArea(HotelArea hotelArea);
	
	/**
	 * 删除酒店地区 
	 * @param hotelArea 为传递的实体类对象 
	 * */
	public boolean deleteHotelArea(HotelArea hotelArea);
	
	/**
	 * 删除酒店地区 列表
	 * @param hotelAreas 为传递的实体类对象 
	 * */
	public boolean deleteHotelAreas(String hotelAreas);
	
	/**
	 * 查询酒店地区列表
	 * @param query   查询条件
	 * */
	public List<HotelArea> queryHotelArea(HotelAreaQuery query);
	
	/**
	 * 查询酒店地区数量
	 * @param query 查询条件
	 * */
	public int queryHotelAreaCount(HotelAreaQuery query);
	
	/**
	 * 查询酒店地区id的最大值 + 1
	 * */
	public int getGeneralId(HotelAreaQuery query);
}
