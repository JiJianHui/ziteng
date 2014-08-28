package com.ziteng.dto.query.travelGuide;

import com.ziteng.dto.query.base.Query;

/**
 * 计算价格方式查询类
 * @author gyb
 * @date 2014-04-17
 *
 */
public class PriceWayQuery extends Query{
	private Integer id;
	private String name;
	private String description;
	
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
