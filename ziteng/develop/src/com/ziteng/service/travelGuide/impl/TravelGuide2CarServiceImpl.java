package com.ziteng.service.travelGuide.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.travelGuide.ITravelGuide2CarDao;
import com.ziteng.dto.query.travelGuide.TravelGuide2CarQuery;
import com.ziteng.entity.travelGuide.TravelGuide2Car;
import com.ziteng.service.travelGuide.ITravelGuide2CarService;

@Service
@Transactional
public class TravelGuide2CarServiceImpl implements ITravelGuide2CarService {

	@Autowired
	private ITravelGuide2CarDao travelGuide2CarDao;

	@Override
	public boolean addTravelGuide2Car(TravelGuide2Car travelGuide2Car) {
		travelGuide2Car.setEditTime(new Date());
		travelGuide2Car.setCreateTime(new Date());
		int code = travelGuide2CarDao.insert(travelGuide2Car);
		return code > 0;
	}

	@Override
	public boolean updateTravelGuide2Car(TravelGuide2Car travelGuide2Car) {
		// TODO Auto-generated method stub
		int code = travelGuide2CarDao.update(travelGuide2Car);
		return code > 0;
	}

	@Override
	public boolean deleteTravelGuide2Car(TravelGuide2Car travelGuide2Car) {
		// TODO Auto-generated method stub
		travelGuide2CarDao.delete(travelGuide2Car);
		return true;
	}

	@Override
	public boolean deleteTravelGuide2Cars(List<TravelGuide2Car> travelGuide2Cars) {
		// TODO Auto-generated method stub
		for(TravelGuide2Car p : travelGuide2Cars)
			travelGuide2CarDao.delete(p);
		return true;
	}

	@Override
	public List<TravelGuide2Car> queryTravelGuide2Car(TravelGuide2CarQuery query) {
		// TODO Auto-generated method stub
		List<TravelGuide2Car> travelGuide2Cars = travelGuide2CarDao.selectEntityList(query);
		return travelGuide2Cars;
	}

}
