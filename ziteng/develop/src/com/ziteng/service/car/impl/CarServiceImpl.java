package com.ziteng.service.car.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarDao;
import com.ziteng.dao.car.ICarImageDao;
import com.ziteng.dto.query.car.CarQuery;
import com.ziteng.entity.car.Car;
import com.ziteng.service.car.ICarService;

@Service
@Transactional
public class CarServiceImpl implements ICarService {

	@Autowired
	private ICarDao carDao;

	@Autowired
	private ICarImageDao carImageDao;

	@Override
	public boolean addCar(Car car) {
		car.setCreateTime(new Date());
		car.setEditTime(new Date());
		int code = carDao.insert(car);
		return code > 0;
	}

	@Override
	public boolean updateCar(Car car) {
		car.setEditTime(new Date());
		int code = carDao.update(car);
		return code > 0;
	}

	@Override
	public boolean deleteCar(Car car) {
		carDao.delete(car);
		return true;
	}

	@Override
	public boolean deleteCars(List<Car> cars) {
		for(Car c : cars)
			carDao.delete(c);
		return true;
	}

	@Override
	public List<Car> queryCar(CarQuery query) {
		List<Car> cars = carDao.selectEntityList(query);
		return cars==null ? new ArrayList<Car>(0) : cars;
	}

	@Override
	public List<Car> getAllCars() {
		List<Car> cars = carDao.selectAll();
		return cars==null ? new ArrayList<Car>(0) : cars;
	}

	@Override
	public boolean deleteCarById(Integer id) {
		Car car=new Car();
		car.setId(id);
		return deleteCar(car);
	}

	@Override
	public List<Car> getCarsByTravelGuideId(Integer travelGuideId) {
		if(travelGuideId==null)
			return new ArrayList<Car>(0);
		List<Car> cars = carDao.getCarsByTravelGuideId(travelGuideId);
		if(cars!=null){
			for(Car c:cars){
				c.setCarImages(carImageDao.getCarImagesByCarId(c.getId()));
			}
		}
		return cars;
	}

	@Override
	public Car getCarById(Integer carId) {
		return carDao.selectById(carId);
	}

}