package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelEvaluate;
import com.ziteng.dto.query.hotel.HotelEvaluateQuery;
import com.ziteng.entity.hotel.HotelEvaluate;
import com.ziteng.service.hotel.IHotelEvaluateService;

@Service
@Transactional
public class HotelEvaluateServiceImpl implements IHotelEvaluateService {

	IHotelEvaluate hotelEvaluateDao;
	@Override
	public boolean addHotelEvaluate(HotelEvaluate hotelEvaluate) {
		// TODO Auto-generated method stub
		Integer result = hotelEvaluateDao.insert(hotelEvaluate);		
		return result > 0;
	}

	@Override
	public boolean updateHotelEvaluate(HotelEvaluate hotelEvaluate) {
		// TODO Auto-generated method stub
		Integer result = hotelEvaluateDao.update(hotelEvaluate);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelEvaluate(HotelEvaluate hotelEvaluate) {
		// TODO Auto-generated method stub
		hotelEvaluateDao.delete(hotelEvaluate);
		return true;
	}

	@Override
	public boolean deleteHotelEvaluates(String hotelEvaluates) {
		// TODO Auto-generated method stub
		String evaId[] = hotelEvaluates.split(",");
		for(int i = 0 ; i < evaId.length; i ++)
		{
			HotelEvaluate hi = new HotelEvaluate();
			hi.setId(Integer.parseInt(evaId[i]));
			hotelEvaluateDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelEvaluate> queryHotelEvaluate(HotelEvaluateQuery query) {
		// TODO Auto-generated method stub
		
		List<HotelEvaluate> hotelEvaluateLs = hotelEvaluateDao.selectEntityList(query);
		return hotelEvaluateLs;
	}

	@Override
	public int queryHotelEvaluateCount(HotelEvaluateQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelEvaluateDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelEvaluateQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelEvaluateDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
}
