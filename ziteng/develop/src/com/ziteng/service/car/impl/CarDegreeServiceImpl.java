package com.ziteng.service.car.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarDegreeDao;
import com.ziteng.dto.query.car.CarDegreeQuery;
import com.ziteng.entity.car.CarDegree;
import com.ziteng.service.car.ICarDegreeService;

@Service
@Transactional
public class CarDegreeServiceImpl implements ICarDegreeService {

	@Autowired
	private ICarDegreeDao carDegreeDao;

	@Override
	public boolean addCarDegree(CarDegree carDegree) {
		carDegree.setCreateTime(new Date());
		carDegree.setEditTime(new Date());
		int code = carDegreeDao.insert(carDegree);
		return code > 0;
	}

	@Override
	public boolean updateCarDegree(CarDegree carDegree) {
		int code = carDegreeDao.update(carDegree);
		return code > 0;
	}

	@Override
	public boolean deleteCarDegree(CarDegree carDegree) {
		carDegreeDao.delete(carDegree);
		return true;
	}

	@Override
	public boolean deleteCarDegrees(List<CarDegree> carDegrees) {
		for(CarDegree c : carDegrees)
			carDegreeDao.delete(c);
		return true;
	}

	@Override
	public List<CarDegree> queryCarDegree(CarDegreeQuery query) {
		List<CarDegree> carDegrees = carDegreeDao.selectEntityList(query);
		return carDegrees;
	}

	@Override
	public List<CarDegree> getAllCarDegrees() {
		List<CarDegree> carDegrees = carDegreeDao.selectAll();
		carDegrees = carDegrees==null ? new ArrayList<CarDegree>(0) : carDegrees;
		return carDegrees;
	}

	@Override
	public CarDegree selectById(int id) {
		return carDegreeDao.selectById(id);
	}

	@Override
	public CarDegree getCarDegreeById(Integer carDegreeId) {
		return carDegreeDao.selectById(carDegreeId);
	}

}
