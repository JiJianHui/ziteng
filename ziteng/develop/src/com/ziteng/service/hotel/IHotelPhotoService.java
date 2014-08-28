package com.ziteng.service.hotel;

import java.util.List;

import com.ziteng.dto.query.hotel.HotelPhotoQuery;
import com.ziteng.entity.hotel.HotelPhoto;

public interface IHotelPhotoService {
	/**
	 * 添加酒店图片
	 * @param hotelPhoto 为传递的实体类对象 
	 * */
	public boolean addHotelPhoto(HotelPhoto hotelPhoto);
	
	/**
	 * 更新酒店图片
	 * @param hotelPhoto 为传递的实体类对象 
	 * */
	public boolean updateHotelPhoto(HotelPhoto hotelPhoto);
	
	/**
	 * 删除酒店图片
	 * @param hotelPhoto 为传递的实体类对象 
	 * */
	public boolean deleteHotelPhoto(HotelPhoto hotelPhoto);
	
	/**
	 * 删除酒店图片 列表
	 * @param hotelPhotos 为传递的实体类对象 
	 * */
	public boolean deleteHotelPhotos(String hotelPhotos);
	
	/**
	 * 查询酒店图片列表
	 * @param query   查询条件
	 * */
	public List<HotelPhoto> queryHotelPhoto(HotelPhotoQuery query);
	
	/**
	 * 查询酒店图片数量
	 * @param query 查询条件
	 * */
	public int queryHotelPhotoCount(HotelPhotoQuery query);
	
	/**
	 * 获取要插入的id
	 * */
	public int getGeneralId(HotelPhotoQuery query);
}
