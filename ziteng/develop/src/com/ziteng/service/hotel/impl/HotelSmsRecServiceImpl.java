package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelSmsRec;
import com.ziteng.dto.query.hotel.HotelSmsRecQuery;
import com.ziteng.entity.hotel.HotelSmsRec;
import com.ziteng.service.hotel.IHotelSmsRecService;

@Service
@Transactional
public class HotelSmsRecServiceImpl implements IHotelSmsRecService {

	@Autowired
	private IHotelSmsRec hotelSmsRecDao;
	@Override
	public boolean addHotelSmsRec(HotelSmsRec hotelSmsRec) {
		// TODO Auto-generated method stub
		Integer result = hotelSmsRecDao.insert(hotelSmsRec);		
		return result > 0;
	}

	@Override
	public boolean updateHotelSmsRec(HotelSmsRec hotelSmsRec) {
		// TODO Auto-generated method stub
		Integer result = hotelSmsRecDao.update(hotelSmsRec);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelSmsRec(HotelSmsRec hotelSmsRec) {
		// TODO Auto-generated method stub
		hotelSmsRecDao.delete(hotelSmsRec);		
		return true;
	}

	@Override
	public boolean deleteHotelSmsRecs(String hotelSmsRecs) {
		// TODO Auto-generated method stub
		String smsRecId[] = hotelSmsRecs.split(",");
		for(int i = 0 ; i < smsRecId.length; i ++)
		{
			HotelSmsRec hi = new HotelSmsRec();
			hi.setId(Integer.parseInt(smsRecId[i]));
			hotelSmsRecDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelSmsRec> queryHotelSmsRec(HotelSmsRecQuery query) {
		// TODO Auto-generated method stub
		List<HotelSmsRec> hotelLs = hotelSmsRecDao.selectEntityList(query);
		return hotelLs;
	}

	@Override
	public int queryHotelSmsRecCount(HotelSmsRecQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelSmsRecDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelSmsRecQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelSmsRecDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
}
