package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelInfo;
import com.ziteng.dto.query.hotel.HotelInfoQuery;
import com.ziteng.entity.hotel.HotelInfo;
import com.ziteng.service.hotel.IHotelInfoService;

@Service
@Transactional
public class HotelInfoServiceImpl implements IHotelInfoService {
	 @Autowired
	 private IHotelInfo hotelInfoDao;

	@Override
	public boolean addHotelInfo(HotelInfo hotelInfo) {
		// TODO Auto-generated method stub
		Integer result = hotelInfoDao.insert(hotelInfo);
				
		return result > 0;
	}

	@Override
	public boolean updateHotelInfo(HotelInfo hotelInfo) {
		// TODO Auto-generated method stub
		Integer result = hotelInfoDao.update(hotelInfo);
		return result > 0;
	}

	@Override
	public boolean deleteHotelInfo(HotelInfo hotelInfo) {
		// TODO Auto-generated method stub
		hotelInfoDao.delete(hotelInfo);
		return true;
	}

	@Override
	public boolean deleteHotelInfos(String hotelIds) {
		// TODO Auto-generated method stub
		String hotelId[] = hotelIds.split(",");
		//System.out.println(" hotelid:::" + hotelId.length);
		for(int i = 0 ; i < hotelId.length; i ++)
		{
			HotelInfo hi = new HotelInfo();
			hi.setId(Integer.parseInt(hotelId[i]));
			//System.out.println(" hotelid+++" + Integer.parseInt(hotelId[i]));
			hotelInfoDao.delete(hi);
		}
		
		return true;
	}

	@Override
	public List<HotelInfo> queryHotelInfo(HotelInfoQuery query) {
		// TODO Auto-generated method stub
		List<HotelInfo> hotelLs = hotelInfoDao.selectEntityList(query);
		return hotelLs;
	}
	
	@Override
	public List<HotelInfo> queryIndexHotelInfo(HotelInfoQuery query) {
		// TODO Auto-generated method stub
		List<HotelInfo> hotelLs = hotelInfoDao.selectEntityListByTop(query);
		return hotelLs;
	}

	@Override
	public int queryHotelInfoCount(HotelInfoQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelInfoDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}
	 
	@Override
	public int getGeneralId(HotelInfoQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelInfoDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}

	@Override
	public HotelInfo queryHotelInfoDef(int id) {
		// TODO Auto-generated method stub
		HotelInfo hotelInfo = hotelInfoDao.selectById(id);
		return hotelInfo;
	}
}
