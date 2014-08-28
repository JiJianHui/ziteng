package com.ziteng.dto.query.car;

import com.ziteng.dto.query.base.Query;

/**
 * 车图片查询类
 * 
 * @author gyb
 * @date 2014-04-17
 * 
 */
public class CarImageQuery extends Query{
	private Integer id;
	private Integer carID;
	private String name;
	private String address;
	

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getCarID() {
		return carID;
	}

	public void setCarID(Integer carID) {
		this.carID = carID;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
}
