package com.ziteng.service.car;

import java.util.List;

import com.ziteng.dto.query.car.CarQuery;
import com.ziteng.entity.car.Car;

public interface ICarService {
    public boolean addCar(Car car);
    public boolean updateCar(Car car);
    public boolean deleteCar(Car car);
    public boolean deleteCarById(Integer id);
    public boolean deleteCars(List<Car> cars);
    public List<Car> queryCar(CarQuery query);
    public List<Car> getAllCars();
	public List<Car> getCarsByTravelGuideId(Integer travelGuideId);
	public Car getCarById(Integer carId);

}
