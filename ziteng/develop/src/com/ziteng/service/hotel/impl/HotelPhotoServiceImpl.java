package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelPhoto;
import com.ziteng.dto.query.hotel.HotelPhotoQuery;
import com.ziteng.entity.hotel.HotelPhoto;
import com.ziteng.service.hotel.IHotelPhotoService;

@Service
@Transactional
public class HotelPhotoServiceImpl implements IHotelPhotoService {
	@Autowired
	private IHotelPhoto hotelPhotoDao;
	@Override
	public boolean addHotelPhoto(HotelPhoto hotelPhoto) {
		// TODO Auto-generated method stub
		Integer result = hotelPhotoDao.insert(hotelPhoto);		
		return result > 0;
	}

	@Override
	public boolean updateHotelPhoto(HotelPhoto hotelPhoto) {
		// TODO Auto-generated method stub
		Integer result = hotelPhotoDao.update(hotelPhoto);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelPhoto(HotelPhoto hotelPhoto) {
		// TODO Auto-generated method stub
		hotelPhotoDao.delete(hotelPhoto);		
		return true;
	}

	@Override
	public boolean deleteHotelPhotos(String hotelPhotos) {
		// TODO Auto-generated method stub		
		String photoId[] = hotelPhotos.split(",");
		for(int i = 0 ; i < photoId.length; i ++)
		{
			HotelPhoto hi = new HotelPhoto();
			hi.setId(Integer.parseInt(photoId[i]));
			hotelPhotoDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelPhoto> queryHotelPhoto(HotelPhotoQuery query) {
		// TODO Auto-generated method stub
		List<HotelPhoto> hotelLs = hotelPhotoDao.selectEntityList(query);
		return hotelLs;
	}

	@Override
	public int queryHotelPhotoCount(HotelPhotoQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelPhotoDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelPhotoQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelPhotoDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
	
}
