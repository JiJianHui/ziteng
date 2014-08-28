package com.ziteng.service.travelGuide.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.travelGuide.ITravelGuide2AreaDao;
import com.ziteng.dto.query.travelGuide.TravelGuide2AreaQuery;
import com.ziteng.entity.travelGuide.TravelGuide2Area;
import com.ziteng.service.travelGuide.ITravelGuide2AreaService;

@Service
@Transactional
public class TravelGuide2AreaServiceImpl implements ITravelGuide2AreaService {

	@Autowired
	private ITravelGuide2AreaDao travelGuide2AreaDao;

	@Override
	public boolean addTravelGuide2Area(TravelGuide2Area travelGuide2Area) {
		int code = travelGuide2AreaDao.insert(travelGuide2Area);
		return code > 0;
	}

	@Override
	public boolean updateTravelGuide2Area(TravelGuide2Area travelGuide2Area) {
		// TODO Auto-generated method stub
		int code = travelGuide2AreaDao.update(travelGuide2Area);
		return code > 0;
	}

	@Override
	public boolean deleteTravelGuide2Area(TravelGuide2Area travelGuide2Area) {
		// TODO Auto-generated method stub
		travelGuide2AreaDao.delete(travelGuide2Area);
		return true;
	}

	@Override
	public boolean deleteTravelGuide2Areas(List<TravelGuide2Area> travelGuide2Areas) {
		// TODO Auto-generated method stub
		for(TravelGuide2Area p : travelGuide2Areas)
			travelGuide2AreaDao.delete(p);
		return true;
	}

	@Override
	public List<TravelGuide2Area> queryTravelGuide2Area(TravelGuide2AreaQuery query) {
		// TODO Auto-generated method stub
		List<TravelGuide2Area> travelGuide2Areas = travelGuide2AreaDao.selectEntityList(query);
		return travelGuide2Areas;
	}

}
