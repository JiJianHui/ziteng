package com.ziteng.entity.travelGuide;

import java.util.Date;

import com.ziteng.utils.DateUtils;

/**
 * 攻略评论
 * @author gyb
 * @date 2014-04-15
 *
 */
public class TravelGuideComment {
	private Integer id;
	private Integer travelGuideId;
	private String comment;
	private Integer userId;
	private Date    createTime;
	private Date 	editTime;
	
	private String userName;
	private String userConver;
	
	public String getCreateTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(createTime);
	}
	public String getEditTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(editTime);
	}
	
	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

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
	public Integer getTravelGuideId() {
		return travelGuideId;
	}
	public void setTravelGuideId(Integer travelGuideId) {
		this.travelGuideId = travelGuideId;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserConver() {
		return userConver;
	}

	public void setUserConver(String userConver) {
		this.userConver = userConver;
	}
	
	
}
