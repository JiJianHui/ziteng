package com.ziteng.dto.query.hotel;

import com.ziteng.dto.query.base.Query;

public class HotelEvaluateQuery extends Query {
	private Integer	id;
	private Integer	hotelId;
	private String	hotelName;
	private String	evaluativeContent;
	private String	evaContent;  //用来保存删除的id串，  如： 1,2,3,4,
	private String	hotelStep;
	private String	otherInfo;
	private String	expandCol1;
	private String	expandCol2;
	private String	expandCol3;
	private String	expandCol4;
	private String	expandCol5;
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
	public String getHotelName() {
		return hotelName;
	}
	public void setHotelName(String hotelName) {
		this.hotelName = hotelName;
	}
	public String getEvaluativeContent() {
		return evaluativeContent;
	}
	public void setEvaluativeContent(String evaluativeContent) {
		this.evaluativeContent = evaluativeContent;
	}
	public String getHotelStep() {
		return hotelStep;
	}
	public void setHotelStep(String hotelStep) {
		this.hotelStep = hotelStep;
	}
	public String getOtherInfo() {
		return otherInfo;
	}
	public void setOtherInfo(String otherInfo) {
		this.otherInfo = otherInfo;
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
	public String getEvaContent() {
		return evaContent;
	}
	public void setEvaContent(String evaContent) {
		this.evaContent = evaContent;
	}
	
}
