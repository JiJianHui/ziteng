package com.ziteng.dto.query.activity;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

/**
 * @author yangzuo
 * @date 2014-4-19
 *
 */
public class ActivityOrderQuery extends Query {
	private Integer id;           // 订单id
	private Integer userId;       // 提交订单用户id
	private Integer activityId;   // 活动id
	private Float   price;        // 活动价格
	private Integer status;       // 活动状态 0表示完成,1表示处理中
	private Date    createTime;   // 创建时间
	private Date    modifyTime;   // 修改时间
	
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
	public Integer getActivityId() {
		return activityId;
	}
	public void setActivityId(Integer activityId) {
		this.activityId = activityId;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
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
}
