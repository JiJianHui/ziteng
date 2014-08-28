package com.ziteng.dto.query.hotel;

import java.util.Date;

import com.ziteng.dto.query.base.Query;

public class HotelRoomQuery extends Query {
	private Integer	id;
	private Integer	hotelId;
	private String	roomName;
	private String	roomType;
	private String	roomPrice;
	private String	recommendRoom;
	private String	breakfastType;
	private String	wideType;
	private String  roomContents; // 房间的id 串  如 1,2,3,4,
	private Integer	roomNum;
	private String	roomDesc;
	private String	roomRemarks;
	private String	roomPhoto1;
	private String	roomPhoto2;
	private String	roomPhoto3;
	private String	expandCol1;
	private String	expandCol2;
	private String	expandCol3;
	private String	expandCol4;
	private String	expandCol5;
	private Date	modifyDate;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getHotelId() {
		return hotelId;
	}
	public void setHotelId(Integer hotelId) {
		this.hotelId = hotelId;
	}
	public String getRoomName() {
		return roomName;
	}
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	public String getRoomType() {
		return roomType;
	}
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	public String getRoomPrice() {
		return roomPrice;
	}
	public void setRoomPrice(String roomPrice) {
		this.roomPrice = roomPrice;
	}
	public String getRecommendRoom() {
		return recommendRoom;
	}
	public void setRecommendRoom(String recommendRoom) {
		this.recommendRoom = recommendRoom;
	}
	public String getBreakfastType() {
		return breakfastType;
	}
	public void setBreakfastType(String breakfastType) {
		this.breakfastType = breakfastType;
	}
	public String getWideType() {
		return wideType;
	}
	public void setWideType(String wideType) {
		this.wideType = wideType;
	}
	public Integer getRoomNum() {
		return roomNum;
	}
	public void setRoomNum(Integer roomNum) {
		this.roomNum = roomNum;
	}
	public String getRoomDesc() {
		return roomDesc;
	}
	public void setRoomDesc(String roomDesc) {
		this.roomDesc = roomDesc;
	}
	public String getRoomRemarks() {
		return roomRemarks;
	}
	public void setRoomRemarks(String roomRemarks) {
		this.roomRemarks = roomRemarks;
	}
	public String getRoomPhoto1() {
		return roomPhoto1;
	}
	public void setRoomPhoto1(String roomPhoto1) {
		this.roomPhoto1 = roomPhoto1;
	}
	public String getRoomPhoto2() {
		return roomPhoto2;
	}
	public void setRoomPhoto2(String roomPhoto2) {
		this.roomPhoto2 = roomPhoto2;
	}
	public String getRoomPhoto3() {
		return roomPhoto3;
	}
	public void setRoomPhoto3(String roomPhoto3) {
		this.roomPhoto3 = roomPhoto3;
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
	public String getRoomContents() {
		return roomContents;
	}
	public void setRoomContents(String roomContents) {
		this.roomContents = roomContents;
	}
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = new Date();
	}
}
