package com.ziteng.entity.hotel;


/**
 * 酒店类型类
 * @author yuyajie
 * @date   2014/4/10
 * 
 * */
public class HotelType {
	private Integer id;
	private String  hotelType;
	private Integer order;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getHotelType() {
		return hotelType;
	}
	public void setHotelType(String hotelType) {
		this.hotelType = hotelType;
	}
	public Integer getOrder() {
		return order;
	}
	public void setOrder(Integer order) {
		this.order = order;
	}
	
}
