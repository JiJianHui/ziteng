package com.ziteng.entity.car;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ziteng.entity.base.FlexiJsonEntity;
import com.ziteng.utils.DateUtils;

/**
 * 车档次
 * 
 * @author gyb
 * @date 2014-04-15
 * 
 */
public class CarDegree implements FlexiJsonEntity{
	private Integer id;
	private String name;
	private Date    createTime;
	private Date 	editTime;
	
	private List<Car> cars;
	
	public CarDegree(){
		cars = new ArrayList<Car>(0);
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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	
	
	public List<Car> getCars() {
		return cars;
	}

	public void setCars(List<Car> cars) {
		this.cars = cars;
	}
	
	public void addCar(Car car){
		if(cars==null){cars = new ArrayList<Car>(0);}
		cars.add(car);
	}
	
	
	public String getCreateTimeString(){
		return DateUtils.yyyy_MM_dd_HH_mm(this.createTime);
	}
}
