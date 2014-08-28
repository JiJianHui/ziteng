package com.ziteng.dto.query.hotel;

import com.ziteng.dto.query.base.Query;

public class HotelAreaQuery extends Query {
	private 	Integer 	id;
	private 	String		areaName;
	private 	String		areaCode;
	private 	Integer		order;
	private 	String		areaContents;
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
	public String getAreaContents() {
		return areaContents;
	}
	public void setAreaContents(String areaContents) {
		this.areaContents = areaContents;
	}
	
}
