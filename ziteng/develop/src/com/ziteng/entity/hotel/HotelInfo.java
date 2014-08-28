package com.ziteng.entity.hotel;

import java.util.Date;
import java.util.List;

/**
 * 酒店信息类
 * @author yuyajie
 * @date   2014/4/10 
 * 
 **/
public class HotelInfo{

	private Integer id;
	private String	hotelName;
	private String	hotelAddress;
	private String	hotelManger;
	private String	hotelMgnPhone;
	private String	hotelStar;
	private String	hotelType;
	private String	ownProvince;
	private String	ownArea;
	private String	addressDesc;
	private String	roomPrice;
	private Integer roomNum;
	private String	landMarks;
	private String	hotelContent;
	private String	hotelServices;
	private String	hotelImgUrl;
	private String	messageConfirm;
	private Integer	hotelOrder;
	private Date	modifyDate;
	private Integer	browseNum;
	private Integer	reserveNum;
	private Integer	hotelGood;
	private Integer	hotelBad;
	private String	remarks;
	private String	expandCol1; //酒店特别提示
	private String	expandCol2; //地图坐标
	private String	expandCol3;
	private String	expandCol4; //
	private String	expandCol5; //折扣率 
	 
	private List<HotelRoom> rooms;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getHotelAddress() {
		return hotelAddress;
	}
	public void setHotelAddress(String hotelAddress) {
		this.hotelAddress = hotelAddress;
	}
	public String getHotelManger() {
		return hotelManger;
	}
	public void setHotelManger(String hotelManger) {
		this.hotelManger = hotelManger;
	}
	public String getHotelMgnPhone() {
		return hotelMgnPhone;
	}
	public void setHotelMgnPhone(String hotelMgnPhone) {
		this.hotelMgnPhone = hotelMgnPhone;
	}
	public String getHotelStar() {
		return hotelStar;
	}
	public void setHotelStar(String hotelStar) {
		this.hotelStar = hotelStar;
	}
	public String getHotelType() {
		return hotelType;
	}
	public void setHotelType(String hotelType) {
		this.hotelType = hotelType;
	}
	public String getOwnProvince() {
		return ownProvince;
	}
	public void setOwnProvince(String ownProvince) {
		this.ownProvince = ownProvince;
	}
	public String getOwnArea() {
		return ownArea;
	}
	public void setOwnArea(String ownArea) {
		this.ownArea = ownArea;
	}
	public String getAddressDesc() {
		return addressDesc;
	}
	public void setAddressDesc(String addressDesc) {
		this.addressDesc = addressDesc;
	}
	public String getRoomPrice() {
		return roomPrice;
	}
	public void setroomPrice(String roomPrice) {
		this.roomPrice = roomPrice;
	}
	public Integer getRoomNum() {
		return roomNum;
	}
	public void setRoomNum(Integer roomNum) {
		this.roomNum = roomNum;
	}
	public String getLandMarks() {
		return landMarks;
	}
	public void setLandMarks(String landMarks) {
		this.landMarks = landMarks;
	}
	public String getHotelContent() {
		return hotelContent;
	}
	public void setHotelContent(String hotelContent) {
		this.hotelContent = hotelContent;
	}
	public String getHotelServices() {
		return hotelServices;
	}
	public void setHotelServices(String hotelServices) {
		this.hotelServices = hotelServices;
	}
	public String getHotelImgUrl() {
		return hotelImgUrl;
	}
	public void setHotelImgUrl(String hotelImgUrl) {
		this.hotelImgUrl = hotelImgUrl;
	}
	public String getMessageConfirm() {
		return messageConfirm;
	}
	public void setMessageConfirm(String messageConfirm) {
		this.messageConfirm = messageConfirm;
	}
	public Integer getHotelOrder() {
		return hotelOrder;
	}
	public void setHotelOrder(Integer hotelOrder) {
		this.hotelOrder = hotelOrder;
	}
	public Integer getBrowseNum() {
		return browseNum;
	}
	public void setBrowseNum(Integer browseNum) {
		this.browseNum = browseNum;
	}
	public Integer getReserveNum() {
		return reserveNum;
	}
	public void setReserveNum(Integer reserveNum) {
		this.reserveNum = reserveNum;
	}
	public Integer getHotelGood() {
		return hotelGood;
	}
	public void setHotelGood(Integer hotelGood) {
		this.hotelGood = hotelGood;
	}
	public Integer getHotelBad() {
		return hotelBad;
	}
	public void setHotelBad(Integer hotelBad) {
		this.hotelBad = hotelBad;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
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
	public Date getModifyDate() {
		return modifyDate;
	}
	public void setModifyDate(Date modifyDate) {
		this.modifyDate = modifyDate;
	}
	public List<HotelRoom> getRooms() {
		return rooms;
	}
	public void setRooms(List<HotelRoom> rooms) {
		this.rooms = rooms;
	}
	
}
