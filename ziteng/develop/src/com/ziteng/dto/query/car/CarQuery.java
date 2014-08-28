package com.ziteng.dto.query.car;

import com.ziteng.dto.query.base.Query;

/**
 * 车信息查询类
 * 
 * @author gyb
 * @date 2014-04-17
 * 
 */
public class CarQuery extends Query{
	private Integer id;
	private String name;
	private String carDegreeId;
	private Integer volume;

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
}
