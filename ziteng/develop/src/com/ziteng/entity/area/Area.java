package com.ziteng.entity.area;

import java.util.Date;

import com.ziteng.entity.base.FlexiJsonEntity;
import com.ziteng.utils.DateUtils;

/**
 * 区域表
 * @author gyb
 * @date 2014-04-15
 *
 */
public class Area implements FlexiJsonEntity{
	private Integer id;
	private String name;
	private Integer countOrder;
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

	public Integer getCountOrder() {
		return countOrder;
	}

	public void setCountOrder(Integer countOrder) {
		this.countOrder = countOrder;
	}
	
	public String getCreateTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(this.createTime);
	}
}
