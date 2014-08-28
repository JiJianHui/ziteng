package com.ziteng.dto.query.area;

import com.ziteng.dto.query.base.Query;

/**
 * 区域表查询类
 * @author gyb
 * @date 2014-04-17
 *
 */
public class AreaQuery extends Query{
	private Integer id;
	private String name;
	private Integer countOrder;

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

	public Integer getCountOrder() {
		return countOrder;
	}

	public void setCountOrder(Integer countOrder) {
		this.countOrder = countOrder;
	}
}
