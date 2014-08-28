package com.ziteng.entity.travelGuide;

import java.util.Date;

/**
 * 计算价格方式
 * @author gyb
 * @date 2014-04-15
 *
 */
public class PriceWay {
	private Integer id;
	private String name;
	private String description;
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
