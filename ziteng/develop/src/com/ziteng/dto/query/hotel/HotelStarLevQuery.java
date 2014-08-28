package com.ziteng.dto.query.hotel;

import com.ziteng.dto.query.base.Query;

public class HotelStarLevQuery extends Query {
	private Integer id;
	private String  hotelStar;
	private Integer order;
	private String  starContents; //星级的id串 如：1,2,3,4,
	
	
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
	public String getStarContents() {
		return starContents;
	}
	public void setStarContents(String starContents) {
		this.starContents = starContents;
	}
	
}
