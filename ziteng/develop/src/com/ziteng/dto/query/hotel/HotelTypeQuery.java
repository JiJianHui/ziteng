package com.ziteng.dto.query.hotel;

import com.ziteng.dto.query.base.Query;

public class HotelTypeQuery extends Query {
	private Integer id;
	private String  hotelType;
	private Integer order;
	private String  typeContents; //酒店类型的id串 如 1,2,3,4
	
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
	public String getTypeContents() {
		return typeContents;
	}
	public void setTypeContents(String typeContents) {
		this.typeContents = typeContents;
	}
}
