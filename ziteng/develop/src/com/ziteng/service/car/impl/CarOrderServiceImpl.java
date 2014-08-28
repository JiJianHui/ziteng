package com.ziteng.service.car.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarOrderDao;
import com.ziteng.dto.query.car.CarOrderQuery;
import com.ziteng.entity.car.CarOrder;
import com.ziteng.service.car.ICarOrderService;

@Service
@Transactional
public class CarOrderServiceImpl implements ICarOrderService {

	@Autowired
	private ICarOrderDao carOrderDao;

	@Override
	public boolean addCarOrder(CarOrder carOrder) {
		carOrder.setEditTime(new Date());
		carOrder.setCreateTime(new Date());
		int code = carOrderDao.insert(carOrder);
		return code > 0;
	}

	@Override
	public boolean updateCarOrder(CarOrder carOrder) {
		carOrder.setEditTime(new Date());
		int code = carOrderDao.update(carOrder);
		return code > 0;
	}

	@Override
	public boolean deleteCarOrder(CarOrder carOrder) {
		// TODO Auto-generated method stub
		carOrderDao.delete(carOrder);
		return true;
	}

	@Override
	public boolean deleteCarOrders(List<CarOrder> carOrders) {
		for(CarOrder c : carOrders)
			carOrderDao.delete(c);
		return true;
	}

	@Override
	public List<CarOrder> queryCarOrder(CarOrderQuery query) {
		List<CarOrder> carOrders = carOrderDao.selectEntityList(query);
		return carOrders==null ? new ArrayList<CarOrder>(0) : carOrders;
	}

	@Override
	public List<CarOrder> getAllCarOrders() {
		List<CarOrder> carOrders = carOrderDao.selectAll();
		return carOrders==null ? new ArrayList<CarOrder>(0) : carOrders;
	}

	@Override
	public CarOrder getCarOderById(Integer id) {
		return carOrderDao.selectById(id);
	}

	@Override
	public int queryCarOrderCount(CarOrderQuery query) {
		return carOrderDao.selectEntityCount(query);
	}

}
