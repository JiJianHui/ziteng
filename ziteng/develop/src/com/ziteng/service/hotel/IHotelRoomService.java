package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelRoomQuery;
import com.ziteng.entity.hotel.HotelRoom;

public interface IHotelRoomService {
	/**
	 * 添加酒店房间
	 * @param hotelRoom 为传递的实体类对象 
	 * */
	public boolean addHotelRoom(HotelRoom hotelRoom);
	
	/**
	 * 更新酒店房间
	 * @param hotelRoom 为传递的实体类对象 
	 * */
	public boolean updateHotelRoom(HotelRoom hotelRoom);
	
	/**
	 * 删除酒店房间
	 * @param hotelRoom 为传递的实体类对象 
	 * */
	public boolean deleteHotelRoom(HotelRoom hotelRoom);
	
	/**
	 * 删除酒店房间 列表
	 * @param hotelRooms 为传递的实体类对象 
	 * */
	public boolean deleteHotelRooms(String hotelRooms);
	
	/**
	 * 查询酒店房间列表
	 * @param query   查询条件
	 * */
	public List<HotelRoom> queryHotelRoom(HotelRoomQuery query);
	
	/**
	 * 查询酒店房间数量
	 * @param query 查询条件
	 * */
	public int queryHotelRoomCount(HotelRoomQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelRoomQuery query);
	
	/**
	 * 查询客房信息
	 * @param query   查询条件
	 * */
	public HotelRoom queryRoomInfoDef(int id);
}
