package com.ziteng.dto.query.car;

import com.ziteng.dto.query.base.Query;

/**
 * 车档次查询类
 * 
 * @author gyb
 * @date 2014-04-17
 * 
 */
public class CarDegreeQuery extends Query{
	private Integer id;
	private String name;


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
}
