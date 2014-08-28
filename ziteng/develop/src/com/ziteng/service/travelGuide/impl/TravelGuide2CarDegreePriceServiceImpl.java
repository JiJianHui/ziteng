package com.ziteng.service.travelGuide.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarDegreeDao;
import com.ziteng.dao.travelGuide.ITravelGuide2CarDegreePriceDao;
import com.ziteng.dto.query.travelGuide.TravelGuide2CarDegreePriceQuery;
import com.ziteng.entity.car.CarDegree;
import com.ziteng.entity.travelGuide.TravelGuide2CarDegreePrice;
import com.ziteng.service.travelGuide.ITravelGuide2CarDegreePriceService;

@Service
@Transactional
public class TravelGuide2CarDegreePriceServiceImpl implements ITravelGuide2CarDegreePriceService {

	@Autowired
	private ITravelGuide2CarDegreePriceDao travelGuide2CarDegreePriceDao;
	
	@Autowired
	private ICarDegreeDao carDegreeDao;

	@Override
	public boolean addTravelGuide2CarDegreePrice(TravelGuide2CarDegreePrice travelGuide2CarDegreePrice) {
		int code = travelGuide2CarDegreePriceDao.insert(travelGuide2CarDegreePrice);
		return code > 0;
	}

	@Override
	public boolean updateTravelGuide2CarDegreePrice(TravelGuide2CarDegreePrice travelGuide2CarDegreePrice) {
		int code = travelGuide2CarDegreePriceDao.update(travelGuide2CarDegreePrice);
		return code > 0;
	}

	@Override
	public boolean deleteTravelGuide2CarDegreePrice(TravelGuide2CarDegreePrice travelGuide2CarDegreePrice) {
		travelGuide2CarDegreePriceDao.delete(travelGuide2CarDegreePrice);
		return true;
	}

	@Override
	public boolean deleteTravelGuide2CarDegreePrices(List<TravelGuide2CarDegreePrice> travelGuide2CarDegreePrices) {
		// TODO Auto-generated method stub
		for(TravelGuide2CarDegreePrice p : travelGuide2CarDegreePrices)
			travelGuide2CarDegreePriceDao.delete(p);
		return true;
	}

	@Override
	public List<TravelGuide2CarDegreePrice> queryTravelGuide2CarDegreePriceList(
			TravelGuide2CarDegreePriceQuery priceQuery) {
		// TODO Auto-generated method stub
		List<TravelGuide2CarDegreePrice> travelGuide2CarDegreePrices = travelGuide2CarDegreePriceDao.selectEntityList(priceQuery);
		
		return travelGuide2CarDegreePrices;
	}

	@Override
	public List<TravelGuide2CarDegreePrice> queryTravelGuide2CarDegreePriceByTravelGuideId(
			Integer travelGuideId) {
		List<CarDegree> carDegrees = carDegreeDao.selectAll();
		carDegrees = carDegrees==null?new ArrayList<CarDegree>(0):carDegrees;
		//System.out.println("service_travelGuideId:"+travelGuideId);
		List<TravelGuide2CarDegreePrice> travelGuide2CarDegreePrices = travelGuide2CarDegreePriceDao.selectByTravelGuideId(travelGuideId);
		travelGuide2CarDegreePrices=travelGuide2CarDegreePrices ==null?new ArrayList<TravelGuide2CarDegreePrice>(0) : travelGuide2CarDegreePrices;
		
		for(CarDegree carDegree : carDegrees){
			for(TravelGuide2CarDegreePrice price: travelGuide2CarDegreePrices){
				if(price.getCarDegreeId()==carDegree.getId()){
					price.setCarDegreeName(carDegree.getName());
				}
			}
		}
		
		return travelGuide2CarDegreePrices;
	}
	
	@Override
	public List<TravelGuide2CarDegreePrice> getAllCarDegreePrice(){
		List<TravelGuide2CarDegreePrice> result = travelGuide2CarDegreePriceDao.selectAll();
		return result==null?new ArrayList<TravelGuide2CarDegreePrice>(0):result;
	}

	@Override
	public boolean insertBatch(List<TravelGuide2CarDegreePrice> carDegrees) {
		Integer count = travelGuide2CarDegreePriceDao.insertBatch(carDegrees);
		return count >= carDegrees.size();
	}

	@Override
	public void deleteByGuideId(Integer guideId) {
		travelGuide2CarDegreePriceDao.deleteByGuideId(guideId); 
	}


}
