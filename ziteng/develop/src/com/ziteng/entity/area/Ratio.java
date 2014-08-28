package com.ziteng.entity.area;

import java.util.Date;

import com.ziteng.utils.DateUtils;


/**
 * 系数表
 * @author gyb
 * @date 2014-04-15
 *
 */
public class Ratio {
	private Integer id;
	private Integer areaId;
	private Date 	date;
	private Float 	ratio;
	private Date    createTime;
	private Date 	editTime;
	
	private String areaName;
	
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
	public Integer getAreaId() {
		return areaId;
	}
	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Float getRatio() {
		return ratio;
	}
	public void setRatio(Float ratio) {
		this.ratio = ratio;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
	
	public String getDateString(){
		return DateUtils.yyyy_MM_dd(date);
	}
}
