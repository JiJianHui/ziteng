package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelTypeQuery;
import com.ziteng.entity.hotel.HotelType;

public interface IHotelTypeService {
	/**
	 * 添加酒店类型
	 * @param hotelType 为传递的实体类对象 
	 * */
	public boolean addHotelType(HotelType hotelType);
	
	/**
	 * 更新酒店类型
	 * @param hotelType 为传递的实体类对象 
	 * */
	public boolean updateHotelType(HotelType hotelType);
	
	/**
	 * 删除酒店类型
	 * @param hotelType 为传递的实体类对象 
	 * */
	public boolean deleteHotelType(HotelType hotelType);
	
	/**
	 * 删除酒店类型 列表
	 * @param hotelTypes 为传递的实体类对象 
	 * */
	public boolean deleteHotelTypes(String hotelTypes);
	
	/**
	 * 查询酒店类型列表
	 * @param query   查询条件
	 * */
	public List<HotelType> queryHotelType(HotelTypeQuery query);
	
	/**
	 * 查询酒店类型数量
	 * @param query 查询条件
	 * */
	public int queryHotelTypeCount(HotelTypeQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelTypeQuery query);
}
