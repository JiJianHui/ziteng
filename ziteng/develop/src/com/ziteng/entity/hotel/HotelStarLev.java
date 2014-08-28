package com.ziteng.entity.hotel;


/**
 * 酒店星级类
 * @author yuyajie
 * @date   2014/4/10
 * 
 * */
public class HotelStarLev {
	
	private Integer id;
	private String  hotelStar;
	private Integer order;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getHotelStar() {
		return hotelStar;
	}
	public void setHotelStar(String hotelStar) {
		this.hotelStar = hotelStar;
	}
	public Integer getOrder() {
		return order;
	}
	public void setOrder(Integer order) {
		this.order = order;
	}
	
}
