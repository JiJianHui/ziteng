package com.ziteng.dto.query.travelGuide;

import com.ziteng.dto.query.base.Query;

/**
 * 攻略－－车查询类
 * 
 * @author gyb
 * @date 2014-04-17
 * 
 */
public class TravelGuide2CarQuery extends Query {
	private Integer id;
	private Integer travelGuideId;
	private Integer carId;

	
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

	public Integer getCarId() {
		return carId;
	}

	public void setCarId(Integer carId) {
		this.carId = carId;
	}

}
