package com.ziteng.dto.query.travelGuide;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

/**
 * 攻略评论查询类
 * @author gyb
 * @date 2014-04-17
 *
 */
public class TravelGuideCommentQuery extends Query{
	private Integer id;
	private Integer travelGuideId;
	private Date time;
	private String comment;
	private Integer userId;
	
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
	public Date getTime() {
		return time;
	}
	public void setTime(Date time) {
		this.time = time;
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
}
