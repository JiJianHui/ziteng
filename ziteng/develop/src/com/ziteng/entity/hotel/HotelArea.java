package com.ziteng.entity.hotel;


/**
 * 酒店地区类
 * @author yuyajie
 * @date   2014/4/10
 * 
 * */
public class HotelArea {
	
	private 	Integer 	id;
	private 	String		areaName;
	private 	String		areaCode;
	private 	Integer		order;
	
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAreaName() {
		return areaName;
	}
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	public String getAreaCode() {
		return areaCode;
	}
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}
	public Integer getOrder() {
		return order;
	}
	public void setOrder(Integer order) {
		this.order = order;
	}
}
