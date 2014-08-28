package com.ziteng.dto.query.travelGuide;

import com.ziteng.dto.query.base.Query;

/**
 * 攻略——车档次价格查询表
 * @author gyb
 * @date 2014-04-17
 *
 */
public class TravelGuide2CarDegreePriceQuery extends Query{
	private Integer id;
	private Integer travelGuideId;
	private Integer carDegreeId;
	private Float pricePerDay;
	private Float pricePerKm;
	private Float originalPrice;
	
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getTravelGuideId() {
		return travelGuideId;
	}

	public void setTravelGuideId(Integer travelGuideId) {
		this.travelGuideId = travelGuideId;
	}

	public Integer getCarDegreeId() {
		return carDegreeId;
	}

	public void setCarDegreeId(Integer carDegreeId) {
		this.carDegreeId = carDegreeId;
	}

	public Float getPricePerDay() {
		return pricePerDay;
	}

	public void setPricePerDay(Float pricePerDay) {
		this.pricePerDay = pricePerDay;
	}

	public Float getPricePerKm() {
		return pricePerKm;
	}

	public void setPricePerKm(Float pricePerKm) {
		this.pricePerKm = pricePerKm;
	}

	public Float getOriginalPrice() {
		return originalPrice;
	}

	public void setOriginalPrice(Float originalPrice) {
		this.originalPrice = originalPrice;
	}

}
