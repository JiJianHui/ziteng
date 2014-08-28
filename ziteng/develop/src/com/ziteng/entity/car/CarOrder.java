package com.ziteng.entity.car;

import java.util.Date;

import com.ziteng.utils.DateUtils;

/**
 * 包车订单
 * @author gyb
 * @date 2014-04-15
 *
 */
public class CarOrder {
	
	public static final int S_INIT    = 1;			//1 等待支付
	public static final int S_CHECKING = 2;			//2 已支付等待审核
	public static final int S_CHECK_FAILED = 3;		//3 审核不通过，等待退款
	public static final int S_CHECHED = 4;			//4 审核通过，等待签收
	public static final int S_CONFIRM = 5;			//5 已签收
	public static final int S_ERROR = 6;			//6 订单错误
	public static final int S_REFUNED_FAILED = 7;	//7 退款失败
	public static final int S_USELESS = 8;			//8 退款废弃订单
	public static final int S_OUTTIME = 9; 			//9 未支付无效订单
	
	private Integer id;
	private Integer userId;
	private String contacter;
	private String tel;
	private Integer travelGuideId;
	private Integer carDegreeId;
	private Integer carId;
	private Integer carAmount;
	private Integer peopleAmount;
	private Date beginTime;
	private Date endTime;
	private Float price;
	private Integer status;
	private Date    createTime;
	private Date 	editTime;
	private String	flowId;			//订单流水号
	
	
	private String guideName;
	private String carDegreeName;
	private String carName;
	private Integer days;
	
	public Integer getPeopleAmount() {
		return peopleAmount;
	}

	public void setPeopleAmount(Integer peopleAmount) {
		this.peopleAmount = peopleAmount;
	}

	public void setCreateTimeString(String date) {
		this.createTime = DateUtils.yyyy_MM_dd2Date(date);
	}
	
	public void setEditTimeString(String date) {
		this.editTime = DateUtils.yyyy_MM_dd2Date(date);
	}
	public void setBeginTimeString(String date) {
		System.out.println("setting car order beigin time date:"+date);
		this.beginTime = DateUtils.yyyy_MM_dd2Date(date);
	}
	public void setEndTimeString(String date) {
		this.endTime = DateUtils.yyyy_MM_dd2Date(date);
	}
	
	public String getBeginTimeString(){
		return DateUtils.yyyy_MM_dd(this.beginTime);
	}
	
	public String getEndTimeString(){
		return DateUtils.yyyy_MM_dd(this.endTime);
	}
	public String getCreateTimeString(){
		return DateUtils.yyyy_MM_dd(this.createTime);
	}
	
	
	public Date getCreateTime() {
		return createTime;
	}
 
	public Date getEditTime() {
		return editTime;
	}
 
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

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public Integer getTravelGuideId() {
		return travelGuideId;
	}

	public void setTravelGuideId(Integer travelGuideId) {
		this.travelGuideId = travelGuideId;
	}

	public Integer getCarDegreeId() {
		return carDegreeId;
	}

	public void setCarDegreeId(Integer carDegreeId) {
		this.carDegreeId = carDegreeId;
	}

	public Integer getCarId() {
		return carId;
	}

	public void setCarId(Integer carId) {
		this.carId = carId;
	}

	public Integer getCarAmount() {
		return carAmount;
	}

	public void setCarAmount(Integer carAmount) {
		this.carAmount = carAmount;
	}

	public Float getPrice() {
		return price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Date getBeginTime() {
		return beginTime;
	}
 
	public Date getEndtime() {
		return endTime;
	}
 
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public String getContacter() {
		return contacter;
	}

	public void setContacter(String contacter) {
		this.contacter = contacter;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getGuideName() {
		return guideName;
	}

	public void setGuideName(String guideName) {
		this.guideName = guideName;
	}

	public String getCarDegreeName() {
		return carDegreeName;
	}

	public void setCarDegreeName(String carDegreeName) {
		this.carDegreeName = carDegreeName;
	}

	public String getCarName() {
		return carName;
	}

	public void setCarName(String carName) {
		this.carName = carName;
	}

	public Integer getDays() {
		return days;
	}

	public void setDays(Integer days) {
		this.days = days;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public void setEditTime(Date editTime) {
		this.editTime = editTime;
	}

	public String getFlowId() {
		return flowId;
	}

	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}

	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}
	
	public int getBeginTimeDayOfWeek(){
		if(this.beginTime==null){return 0;}
		return DateUtils.getWeekOfDay(this.beginTime);
	}
	public int getEndTimeDayOfWeek(){
		if(this.endTime==null){return 0;}
		return DateUtils.getWeekOfDay(this.endTime);
	}
	
}
