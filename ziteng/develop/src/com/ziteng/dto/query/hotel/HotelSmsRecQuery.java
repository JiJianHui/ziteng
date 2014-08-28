package com.ziteng.dto.query.hotel;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

public class HotelSmsRecQuery extends Query {
	private Integer	id;
	private String	orderId;
	private String	sender;
	private String	senderPhone;
	private String	messageType;
	private String	Receive;
	private String	receivePhone;
	private String	messageContent;
	private String  smsRecContents; //短信的id串 如 11,2,3,4,
	private Date	createTime;
	private String	remarks;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getOrderId() {
		return orderId;
	}
	public void setOrderId(String orderId) {
		this.orderId = orderId;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getSenderPhone() {
		return senderPhone;
	}
	public void setSenderPhone(String senderPhone) {
		this.senderPhone = senderPhone;
	}
	public String getMessageType() {
		return messageType;
	}
	public void setMessageType(String messageType) {
		this.messageType = messageType;
	}
	public String getReceive() {
		return Receive;
	}
	public void setReceive(String receive) {
		Receive = receive;
	}
	public String getReceivePhone() {
		return receivePhone;
	}
	public void setReceivePhone(String receivePhone) {
		this.receivePhone = receivePhone;
	}
	public String getMessageContent() {
		return messageContent;
	}
	public void setMessageContent(String messageContent) {
		this.messageContent = messageContent;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = new Date();
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getSmsRecContents() {
		return smsRecContents;
	}
	public void setSmsRecContents(String smsRecContents) {
		this.smsRecContents = smsRecContents;
	}
}
