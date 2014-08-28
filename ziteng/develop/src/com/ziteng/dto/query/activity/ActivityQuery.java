package com.ziteng.dto.query.activity;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

/**
 * @author yangzuo
 * @date 2014-4-19
 */
public class ActivityQuery extends Query {
	private Integer id;             // 活动id
	private Integer createUserId;   // 创建人id
	private String  title;          // 活动标题
	private String  content;        // 活动内容
	private Float   price;          // 活动价格
	private String  city;           // 活动城市
	private Date    startTime;      // 活动开始日期
	private Date    endTime;        // 活动结束日期
	private Integer involvePeoples; // 活动参与人数
	private Integer totalPeoples;   // 活动总人数
	private String  picture;        // 活动图片
	private Date    releaseTime;    // 活动发布日期
	private Date    createTime;     // 创建日期
	private Date    modifyTime;     // 修改日期
	private Integer status;         // 活动状态 0表示活动结束, 1表示活动进行中
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCreateUserId() {
		return createUserId;
	}
	public void setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Integer getInvolvePeoples() {
		return involvePeoples;
	}
	public void setInvolvePeoples(Integer involvePeoples) {
		this.involvePeoples = involvePeoples;
	}
	public Integer getTotalPeoples() {
		return totalPeoples;
	}
	public void setTotalPeoples(Integer totalPeoples) {
		this.totalPeoples = totalPeoples;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public Date getReleaseTime() {
		return releaseTime;
	}
	public void setReleaseTime(Date releaseTime) {
		this.releaseTime = releaseTime;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getModifyTime() {
		return modifyTime;
	}
	public void setModifyTime(Date modifyTime) {
		this.modifyTime = modifyTime;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
}
