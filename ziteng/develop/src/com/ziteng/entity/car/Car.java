package com.ziteng.entity.car;

import java.util.Date;
import java.util.List;

import com.ziteng.entity.base.FlexiJsonEntity;
import com.ziteng.utils.DateUtils;

/**
 * 车信息
 * 
 * @author gyb
 * @date 2014-04-15
 * 
 */
public class Car implements FlexiJsonEntity{
	private Integer id;
	private String name;
	private String carDegreeId;
	private Integer volume;
	private Date    createTime;
	private Date 	editTime;
	private Float 	price;
	
	private String carDegreeName;
	private String carImageUrl;
	
	private List<CarImage> carImages;
	
	
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCarDegreeId() {
		return carDegreeId;
	}

	public void setCarDegreeId(String carDegreeId) {
		this.carDegreeId = carDegreeId;
	}

	public Integer getVolume() {
		return volume;
	}

	public void setVolume(Integer volume) {
		this.volume = volume;
	}

	public List<CarImage> getCarImages() {
		return carImages;
	}

	public void setCarImages(List<CarImage> carImages) {
		this.carImages = carImages;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}
	
	public String getCreateTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(this.createTime);
	}

	public String getCarDegreeName() {
		return carDegreeName;
	}

	public void setCarDegreeName(String carDegreeName) {
		this.carDegreeName = carDegreeName;
	}

	public String getCarImageUrl() {
		return carImageUrl;
	}

	public void setCarImageUrl(String carImageUrl) {
		this.carImageUrl = carImageUrl;
	}
	
}
