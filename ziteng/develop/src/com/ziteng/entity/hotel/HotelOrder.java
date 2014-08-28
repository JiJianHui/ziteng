package com.ziteng.entity.hotel;

import java.util.Date;

import com.ziteng.utils.DateUtils;


/**
 * 酒店清单类
 * @author yuyajie
 * @date   2014/4/10
 * 
 * */
public class HotelOrder {
	
	private String	id;
	private Integer	hotelId;
	private String	hotelName;
	private Integer	roomId;
	private String	roomName;
	private String	visitorName;
	private String	phoneNum;
	private Date	reserveDate;
	private Date	intoDate;
	private Date	leaveDate;
	private Date	orderDate;
	private Integer	reserveCount;
	private String	totalPirce;
	private String	roomSource;
	private String	orderStatus;
	private String	expandCol1;
	private String	expandCol2;
	private String	expandCol3;
	private String	expandCol4;
	private String	expandCol5;
	
	
	public String getIntoDateString(){
		return DateUtils.yyyy_MM_dd_HH_mm_ss(intoDate);
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Integer getHotelId() {
		return hotelId;
	}
	public void setHotelId(Integer hotelId) {
		this.hotelId = hotelId;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public Integer getRoomId() {
		return roomId;
	}
	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public String getVisitorName() {
		return visitorName;
	}
	public void setVisitorName(String visitorName) {
		this.visitorName = visitorName;
	}
	public String getPhoneNum() {
		return phoneNum;
	}
	public void setPhoneNum(String phoneNum) {
		this.phoneNum = phoneNum;
	}
	public Date getReserveDate() {
		return reserveDate;
	}
	public void setReserveDate(Date reserveDate) {
		this.reserveDate = reserveDate;
	}
	public String getReserveDateString(){
		return DateUtils.yyyy_MM_dd_HH_mm_ss(reserveDate);
	}
	public Date getIntoDate() {
		return intoDate;
	}
	public void setIntoDate(Date intoDate) {
		this.intoDate = intoDate;
	}
	public Date getLeaveDate() {
		return leaveDate;
	}
	public String getLeaveDateString(){
		return DateUtils.yyyy_MM_dd_HH_mm_ss(leaveDate);
	}
	public void setLeaveDate(Date leaveDate) {
		this.leaveDate = leaveDate;
	}
	public Integer getReserveCount() {
		return reserveCount;
	}
	public void setReserveCount(Integer reserveCount) {
		this.reserveCount = reserveCount;
	}
	public String getTotalPirce() {
		return totalPirce;
	}
	public void setTotalPirce(String totalPirce) {
		this.totalPirce = totalPirce;
	}
	public String getRoomSource() {
		return roomSource;
	}
	public void setRoomSource(String roomSource) {
		this.roomSource = roomSource;
	}
	public String getOrderStatus() {
		return orderStatus;
	}
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}
	public String getExpandCol1() {
		return expandCol1;
	}
	public void setExpandCol1(String expandCol1) {
		this.expandCol1 = expandCol1;
	}
	public String getExpandCol2() {
		return expandCol2;
	}
	public void setExpandCol2(String expandCol2) {
		this.expandCol2 = expandCol2;
	}
	public String getExpandCol3() {
		return expandCol3;
	}
	public void setExpandCol3(String expandCol3) {
		this.expandCol3 = expandCol3;
	}
	public String getExpandCol4() {
		return expandCol4;
	}
	public void setExpandCol4(String expandCol4) {
		this.expandCol4 = expandCol4;
	}
	public String getExpandCol5() {
		return expandCol5;
	}
	public void setExpandCol5(String expandCol5) {
		this.expandCol5 = expandCol5;
	}
	public Date getOrderDate() {
		return orderDate;
	}
	public String getOrderDateString(){
		return DateUtils.yyyy_MM_dd_HH_mm_ss(orderDate);
	}
	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}
	

}
