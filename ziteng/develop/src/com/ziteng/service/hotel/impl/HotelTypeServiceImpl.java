package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelType;
import com.ziteng.dto.query.hotel.HotelTypeQuery;
import com.ziteng.entity.hotel.HotelType;
import com.ziteng.service.hotel.IHotelTypeService;

@Service
@Transactional
public class HotelTypeServiceImpl implements IHotelTypeService {

	@Autowired
	private IHotelType hotelTypeDao;
	@Override
	public boolean addHotelType(HotelType hotelType) {
		// TODO Auto-generated method stub
		Integer result = hotelTypeDao.insert(hotelType);		
		return result > 0;
	}

	@Override
	public boolean updateHotelType(HotelType hotelType) {
		// TODO Auto-generated method stub
		Integer result = hotelTypeDao.update(hotelType);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelType(HotelType hotelType) {
		// TODO Auto-generated method stub
		hotelTypeDao.delete(hotelType);		
		return true;
	}

	@Override
	public boolean deleteHotelTypes(String hotelTypes) {
		// TODO Auto-generated method stub
		String typeId[] = hotelTypes.split(",");
		for(int i = 0 ; i < typeId.length; i ++)
		{
			HotelType hi = new HotelType();
			hi.setId(Integer.parseInt(typeId[i]));
			hotelTypeDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelType> queryHotelType(HotelTypeQuery query) {
		// TODO Auto-generated method stub
		List<HotelType> hotelLs = hotelTypeDao.selectEntityList(query);
		return hotelLs;
	}

	@Override
	public int queryHotelTypeCount(HotelTypeQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelTypeDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}
	
	@Override
	public int getGeneralId(HotelTypeQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelTypeDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
}
