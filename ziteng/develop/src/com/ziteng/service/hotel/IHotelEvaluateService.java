package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelEvaluateQuery;
import com.ziteng.entity.hotel.HotelEvaluate;

public interface IHotelEvaluateService {
	/**
	 * 添加酒店评价
	 * @param hotelEvaluate 为传递的实体类对象 
	 * */
	public boolean addHotelEvaluate(HotelEvaluate hotelEvaluate);
	
	/**
	 * 更新酒店评价
	 * @param hotelEvaluate 为传递的实体类对象 
	 * */
	public boolean updateHotelEvaluate(HotelEvaluate hotelEvaluate);
	
	/**
	 * 删除酒店评价
	 * @param hotelEvaluate 为传递的实体类对象 
	 * */
	public boolean deleteHotelEvaluate(HotelEvaluate hotelEvaluate);
	
	/**
	 * 删除酒店评价 列表
	 * @param hotelEvaluates 为传递的实体类对象 
	 * */
	public boolean deleteHotelEvaluates(String hotelEvaluates);
	
	/**
	 * 查询酒店评价列表
	 * @param query   查询条件
	 * */
	public List<HotelEvaluate> queryHotelEvaluate(HotelEvaluateQuery query);
	
	/**
	 * 查询酒店评价数量
	 * @param query 查询条件
	 * */
	public int queryHotelEvaluateCount(HotelEvaluateQuery query);

	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelEvaluateQuery query);
}
