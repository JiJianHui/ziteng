package com.ziteng.service.car.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarSharingDao;
import com.ziteng.dto.query.car.CarSharingQuery;
import com.ziteng.entity.car.CarSharing;
import com.ziteng.service.car.ICarSharingService;

/**
 * 拼车服务接口实现类
 * @author yangzuo
 * @date 2014-04-19
 *
 */
@Service
@Transactional
public class CarSharingServiceImpl implements ICarSharingService {

	@Autowired
	private ICarSharingDao dao;
	
	@Override
	public boolean createCarSharingInfo(CarSharing carsharing) {
		Integer flag = dao.insert(carsharing);
		return flag != null && flag > 0;
	}

	@Override
	public boolean updateCarSharingInfo(CarSharing carsharing) {
		Integer flag = dao.update(carsharing);
		return flag != null && flag > 0;
	}

	@Override
	public void deleteCarSharingInfo(CarSharing carsharing) {
		dao.delete(carsharing);
	}

	@Override
	public CarSharing findCarSharingInfoById(Integer id) {
		return dao.selectById(id);
	}

	@Override
	public List<CarSharing> queryCarSharingInfos(CarSharingQuery query) {
		List<CarSharing> carSharings = dao.selectEntityList(query);
		carSharings = carSharings == null ? new ArrayList<CarSharing>(0) : carSharings;
		return carSharings;
	}

	@Override
	public int queryCarSharingInfoCount(CarSharingQuery query) {
		Integer count = dao.selectEntityCount(query);
		return (count == null ? 0 : count);
	}

}
