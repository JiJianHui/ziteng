package com.ziteng.dto.query.area;

import java.util.Date;

import com.ziteng.dto.query.base.Query;


/**
 * 系数表查询类
 * @author gyb
 * @date 2014-04-17
 *
 */
public class RatioQuery extends Query{
	private Integer id;
	private Integer areaId;
	private Date date;
	private Float ratio;
	private Integer month;
	private Integer year;
	
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
	public Integer getMonth() {
		return month;
	}
	public void setMonth(Integer month) {
		this.month = month;
	}
	public Integer getYear() {
		return year;
	}
	public void setYear(Integer year) {
		this.year = year;
	}
	
	
}
