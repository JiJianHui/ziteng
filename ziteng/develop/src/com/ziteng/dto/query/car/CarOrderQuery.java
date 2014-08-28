package com.ziteng.dto.query.car;

import java.util.Date;

import com.ziteng.dto.query.base.Query;
import com.ziteng.utils.DateUtils;

/**
 * 包车订单查询类
 * @author gyb
 * @date 2014-04-17
 *
 */
public class CarOrderQuery extends Query{
	private Integer id;
	private Integer userId;
	private String tel;
	private Integer travelGuideId;
	private Integer carId;
	private Integer carAmount;
	private Date beginTime;
	private Date endtime;
	private Integer status;
	private Date    createTime;
	private Date 	editTime;
	private String contacter;		//联系人姓名
	private String flowId;
	private String carDegreeId;
	
	
	
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

	public Date getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(Date beginTime) {
		this.beginTime = beginTime;
	}

	public Date getEndtime() {
		return endtime;
	}

	public void setEndtime(Date endtime) {
		this.endtime = endtime;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}
	
	public void setCreateTimeString(String createTimeStr){
		this.createTime = DateUtils.yyyy_MM_dd2Date(createTimeStr);
	}

	public String getContacter() {
		return contacter;
	}

	public void setContacter(String contacter) {
		this.contacter = contacter;
	}

	public String getFlowId() {
		return flowId;
	}

	public void setFlowId(String flowId) {
		this.flowId = flowId;
	}

	public String getCarDegreeId() {
		return carDegreeId;
	}

	public void setCarDegreeId(String carDegreeId) {
		this.carDegreeId = carDegreeId;
	}
	
	
	
}
