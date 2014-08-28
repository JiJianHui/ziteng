package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelOrderQuery;
import com.ziteng.entity.hotel.HotelOrder;

public interface IHotelOrderService {
	/**
	 * 添加酒店订单
	 * @param hotelOrder 为传递的实体类对象 
	 * */
	public boolean addHotelOrder(HotelOrder hotelOrder);
	
	/**
	 * 更新酒店订单
	 * @param hotelOrder 为传递的实体类对象 
	 * */
	public boolean updateHotelOrder(HotelOrder hotelOrder);
	
	/**
	 * 更新酒店订单状态
	 * @param hotelOrder 为传递的实体类对象 
	 * */
	public boolean updateHotelOrderState(HotelOrder hotelOrder);
	
	/**
	 * 删除酒店订单
	 * @param hotelOrder 为传递的实体类对象 
	 * */
	public boolean deleteHotelOrder(HotelOrder hotelOrder);
	
	/**
	 * 删除酒店订单 列表
	 * @param hotelOrders 为传递的实体类对象 
	 * */
	public boolean deleteHotelOrders(String  hotelOrders);
	
	/**
	 * 查询酒店订单列表
	 * @param query   查询条件
	 * */
	public List<HotelOrder> queryHotelOrder(HotelOrderQuery query);
	
	/**
	 * 查询酒店订单数量
	 * @param query 查询条件
	 * */
	public int queryHotelOrderCount(HotelOrderQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelOrderQuery query);
}
