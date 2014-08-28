package com.ziteng.entity.car;

import java.util.Date;

import com.ziteng.utils.DateUtils;

/**
 * 拼车留言信息
 * @author yangzuo
 * @date 2014-4-16
 *
 */
public class CarsharingMessage {
	private Integer id;            // 留言id
	private Integer carsharingId;  // 拼车信息id
	private Integer userId;        // 留言用户id
	private String  content;       // 留言内容
	private Date    msgTime;       // 日期
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCarsharingId() {
		return carsharingId;
	}
	public void setCarsharingId(Integer carsharingId) {
		this.carsharingId = carsharingId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getMsgTime() {
		return msgTime;
	}
	public void setMsgTime(Date msgTime) {
		this.msgTime = msgTime;
	}
	
	public String getMsgTimeString() {
		return DateUtils.yyyy_MM_dd(msgTime);
	}
}
