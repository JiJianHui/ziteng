package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelStarLevQuery;
import com.ziteng.entity.hotel.HotelStarLev;

public interface IHotelStarLevService {
	/**
	 * 添加酒店星级
	 * @param hotelStarLev 为传递的实体类对象 
	 * */
	public boolean addHotelStarLev(HotelStarLev hotelStarLev);
	
	/**
	 * 更新酒店星级
	 * @param hotelStarLev 为传递的实体类对象 
	 * */
	public boolean updateHotelStarLev(HotelStarLev hotelStarLev);
	
	/**
	 * 删除酒店星级
	 * @param hotelStarLev 为传递的实体类对象 
	 * */
	public boolean deleteHotelStarLev(HotelStarLev hotelStarLev);
	
	/**
	 * 删除酒店星级 列表
	 * @param hotelStarLevs 为传递的实体类对象 
	 * */
	public boolean deleteHotelStarLevs(String hotelStarLevs);
	
	/**
	 * 查询酒店星级列表
	 * @param query   查询条件
	 * */
	public List<HotelStarLev> queryHotelStarLev(HotelStarLevQuery query);
	
	/**
	 * 查询酒店星级数量
	 * @param query 查询条件
	 * */
	public int queryHotelStarLevCount(HotelStarLevQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelStarLevQuery query);
	
	
}
