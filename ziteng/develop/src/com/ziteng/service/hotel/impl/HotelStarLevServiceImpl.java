package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelStarLev;
import com.ziteng.dto.query.hotel.HotelStarLevQuery;
import com.ziteng.entity.hotel.HotelStarLev;
import com.ziteng.service.hotel.IHotelStarLevService;

@Service
@Transactional
public class HotelStarLevServiceImpl implements IHotelStarLevService {

	@Autowired
	private IHotelStarLev hotelStarLevDao;
	@Override
	public boolean addHotelStarLev(HotelStarLev hotelStarLev) {
		// TODO Auto-generated method stub
		Integer result = hotelStarLevDao.insert(hotelStarLev);		
		return result > 0;
	}

	@Override
	public boolean updateHotelStarLev(HotelStarLev hotelStarLev) {
		// TODO Auto-generated method stub
		Integer result = hotelStarLevDao.update(hotelStarLev);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelStarLev(HotelStarLev hotelStarLev) {
		// TODO Auto-generated method stub
		hotelStarLevDao.delete(hotelStarLev);		
		return true;
	}

	@Override
	public boolean deleteHotelStarLevs(String hotelStarLevs) {
		// TODO Auto-generated method stub
		
		String smsRecId[] = hotelStarLevs.split(",");
		for(int i = 0 ; i < smsRecId.length; i ++)
		{
			HotelStarLev hi = new HotelStarLev();
			hi.setId(Integer.parseInt(smsRecId[i]));
			hotelStarLevDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelStarLev> queryHotelStarLev(HotelStarLevQuery query) {
		// TODO Auto-generated method stub
		List<HotelStarLev> hotelLs = hotelStarLevDao.selectEntityList(query);
		return hotelLs;
	}

	@Override
	public int queryHotelStarLevCount(HotelStarLevQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelStarLevDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelStarLevQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelStarLevDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
}
