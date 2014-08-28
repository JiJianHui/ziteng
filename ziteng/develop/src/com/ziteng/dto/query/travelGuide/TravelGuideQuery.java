package com.ziteng.dto.query.travelGuide;

import com.ziteng.dto.query.base.Query;

/**
 * 攻略查询类
 * @author gyb
 * @date 2014-04-17
 *
 */
public class TravelGuideQuery extends Query{
	private Integer id;
	private String name;
	private Integer priceWayId;
	private Integer departAreaId;
	private Integer arriveAreaId;
	private Float kms;
	private Float days;
	private String detail;
	private Integer countOrder;
	private Integer searchAreaId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getPriceWayId() {
		return priceWayId;
	}
	public void setPriceWayId(Integer priceWayId) {
		this.priceWayId = priceWayId;
	}
	public Integer getDepartAreaId() {
		return departAreaId;
	}
	public void setDepartAreaId(Integer departAreaId) {
		this.departAreaId = departAreaId;
	}
	public Integer getArriveAreaId() {
		return arriveAreaId;
	}
	public void setArriveAreaId(Integer arriveAreaId) {
		this.arriveAreaId = arriveAreaId;
	}
	public Float getKms() {
		return kms;
	}
	public void setKms(Float kms) {
		this.kms = kms;
	}
	public Float getDays() {
		return days;
	}
	public void setDays(Float days) {
		this.days = days;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public Integer getCountOrder() {
		return countOrder;
	}
	public void setCountOrder(Integer countOrder) {
		this.countOrder = countOrder;
	}
	public Integer getSearchAreaId() {
		return searchAreaId;
	}
	public void setSearchAreaId(Integer searchAreaId) {
		this.searchAreaId = searchAreaId;
	}
}
