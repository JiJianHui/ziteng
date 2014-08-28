package com.ziteng.dto.query.car;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

/**
 * @author yangzuo
 * @date 2014-4-19
 */
public class CarSharingQuery extends Query {
	private Integer id;            // 拼车信息id
	private Integer userId;        // 发布拼车用户ID
	private String  title;         // 拼车信息标题
	private String  startArea;     // 出发区域
	private String  endArea;
	private Date    startTime;     // 出发日期
	private Date    returnTime;    // 返回时间
	private Integer playDays;      // 游玩天数
	private String  description;   // 路线描述
	private String  contactMethod; // 联系方式
	private String  details;       // 路线详情
	private Integer status;        // 路线状态
	private String  picture;       // 图片
	private Date    createTime;    // 创建日期
	private Date    modifyTime;    // 修改日期
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getStartArea() {
		return startArea;
	}
	public void setStartArea(String startArea) {
		this.startArea = startArea;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getReturnTime() {
		return returnTime;
	}
	public void setReturnTime(Date returnTime) {
		this.returnTime = returnTime;
	}
	public Integer getPlayDays() {
		return playDays;
	}
	public void setPlayDays(Integer playDays) {
		this.playDays = playDays;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getContactMethod() {
		return contactMethod;
	}
	public void setContactMethod(String contactMethod) {
		this.contactMethod = contactMethod;
	}
	public String getDetails() {
		return details;
	}
	public void setDetails(String details) {
		this.details = details;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
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
	public String getEndArea() {
		return endArea;
	}
	public void setEndArea(String endArea) {
		this.endArea = endArea;
	}
}
