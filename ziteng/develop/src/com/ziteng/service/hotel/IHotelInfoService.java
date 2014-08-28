package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelInfoQuery;
import com.ziteng.entity.hotel.HotelInfo;

public interface IHotelInfoService {
	/**
	 * 添加酒店信息 
	 * @param hotelInfo 为传递的实体类对象 
	 * */
	public boolean addHotelInfo(HotelInfo hotelInfo);
	
	/**
	 * 更新酒店信息 
	 * @param hotelInfo 为传递的实体类对象 
	 * */
	public boolean updateHotelInfo(HotelInfo hotelInfo);
	
	/**
	 * 删除酒店信息 
	 * @param hotelInfo 为传递的实体类对象 
	 * */
	public boolean deleteHotelInfo(HotelInfo hotelInfo);
	
	/**
	 * 删除酒店信息 列表
	 * @param hotelIds 为传递的实体类对象 
	 * */
	public boolean deleteHotelInfos(String hotelIds);
	
	/**
	 * 查询酒店信息列表
	 * @param query   查询条件
	 * */
	public List<HotelInfo> queryHotelInfo(HotelInfoQuery query);
	
	/**
	 * 查询首页酒店信息列表
	 * @param query   查询条件
	 * */
	public List<HotelInfo> queryIndexHotelInfo(HotelInfoQuery query);
	
	
	/**
	 * 查询酒店信息
	 * @param query   查询条件
	 * */
	public HotelInfo queryHotelInfoDef(int id);
	
	/**
	 * 查询酒店信息数量
	 * @param query 查询条件
	 * */
	public int queryHotelInfoCount(HotelInfoQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelInfoQuery query);
	
}
