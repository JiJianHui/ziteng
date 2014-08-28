package com.ziteng.entity.travelGuide;

import java.util.Date;
import java.util.List;

/**
 * 攻略——车档次价格
 * @author gyb
 * @date 2014-04-15
 *
 */
public class TravelGuide2CarDegreePrice {
	private Integer id;
	private Integer travelGuideId;
	private Integer carDegreeId;
	private Float pricePerDay;
	private Float pricePerKm;
	private Float originalPrice;
	private Date    createTime;
	private Date 	editTime;
	
	private List<Double> oneMonthPrice;			//一个月的实际价额.
	private String	     carDegreeName;			//车辆档次名称
	
	public TravelGuide2CarDegreePrice(){
		
	}
	
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

	public List<Double> getOneMonthPrice() {
		return oneMonthPrice;
	}

	public void setOneMonthPrice(List<Double> oneMonthPrice) {
		this.oneMonthPrice = oneMonthPrice;
	}

	public String getCarDegreeName() {
		return carDegreeName;
	}

	public void setCarDegreeName(String carDegreeName) {
		this.carDegreeName = carDegreeName;
	}
	
	
}
