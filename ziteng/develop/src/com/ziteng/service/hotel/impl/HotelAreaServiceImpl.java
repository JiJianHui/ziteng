package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelArea;
import com.ziteng.dto.query.hotel.HotelAreaQuery;
import com.ziteng.entity.hotel.HotelArea;
import com.ziteng.service.hotel.IHotelAreaService;

@Service
@Transactional
public class HotelAreaServiceImpl implements IHotelAreaService {
	@Autowired
	private IHotelArea hotelAreaDao;
	
	@Override
	public boolean addHotelArea(HotelArea hotelArea) {
		// TODO Auto-generated method stub
		Integer result = hotelAreaDao.insert(hotelArea);
		
		return result > 0;
	}

	@Override
	public boolean updateHotelArea(HotelArea hotelArea) {
		// TODO Auto-generated method stub
		Integer result = hotelAreaDao.update(hotelArea);
		
		return result > 0;
	}

	@Override
	public boolean deleteHotelArea(HotelArea hotelArea) {
		// TODO Auto-generated method stub
		hotelAreaDao.delete(hotelArea);		
		return true;
	}

	@Override
	public boolean deleteHotelAreas(String hotelAreas) {
		// TODO Auto-generated method stub
		
		String areaId[] = hotelAreas.split(",");
		//System.out.println(" hotelid:::" + hotelId.length);
		for(int i = 0 ; i < areaId.length; i ++)
		{
			HotelArea hi = new HotelArea();
			hi.setId(Integer.parseInt(areaId[i]));
			//System.out.println(" hotelid+++" + Integer.parseInt(hotelId[i]));
			hotelAreaDao.delete(hi);
		}
		
		
		return true;
	}

	@Override
	public List<HotelArea> queryHotelArea(HotelAreaQuery query) {
		// TODO Auto-generated method stub
		List<HotelArea> hotelAreaLs = hotelAreaDao.selectEntityList(query);
		return hotelAreaLs;
	}

	@Override
	public int queryHotelAreaCount(HotelAreaQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelAreaDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelAreaQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelAreaDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}

}
