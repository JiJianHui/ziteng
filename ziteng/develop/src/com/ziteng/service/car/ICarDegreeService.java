package com.ziteng.service.car;

import java.util.List;

import com.ziteng.dto.query.car.CarDegreeQuery;
import com.ziteng.entity.car.CarDegree;

public interface ICarDegreeService {
    public boolean addCarDegree(CarDegree carDegree);
    public boolean updateCarDegree(CarDegree carDegree);
    public boolean deleteCarDegree(CarDegree carDegree);
    public boolean deleteCarDegrees(List<CarDegree> carDegrees);
    public List<CarDegree> queryCarDegree(CarDegreeQuery query);
	public List<CarDegree> getAllCarDegrees();
	public CarDegree selectById(int id);
	public CarDegree getCarDegreeById(Integer carDegreeId);
	
}
