package com.ziteng.entity.travelGuide;

import java.util.Date;

/**
 * 攻略－－车
 * 
 * @author gyb
 * @date 2014-04-15
 * 
 */
public class TravelGuide2Car {
	private Integer id;
	private Integer travelGuideId;
	private Integer carId;
	private Date    createTime;
	private Date 	editTime;
	
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getEditTime() {
		return editTime;
	}

	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}
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
