package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelRoom;
import com.ziteng.dto.query.hotel.HotelRoomQuery;
import com.ziteng.entity.hotel.HotelRoom;
import com.ziteng.service.hotel.IHotelRoomService;

@Service
@Transactional
public class HotelRoomServiceImpl implements IHotelRoomService {
	@Autowired
	private IHotelRoom hotelRoomDao;
	@Override
	public boolean addHotelRoom(HotelRoom hotelRoom) {
		// TODO Auto-generated method stub
		Integer result = hotelRoomDao.insert(hotelRoom);		
		return result > 0;
	}

	@Override
	public boolean updateHotelRoom(HotelRoom hotelRoom) {
		// TODO Auto-generated method stub
		Integer result = hotelRoomDao.update(hotelRoom);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelRoom(HotelRoom hotelRoom) {
		// TODO Auto-generated method stub
		hotelRoomDao.delete(hotelRoom);		
		return true;
	}

	@Override
	public boolean deleteHotelRooms(String hotelRooms) {
		// TODO Auto-generated method stub
		String roomId[] = hotelRooms.split(",");
		for(int i = 0 ; i < roomId.length; i ++)
		{
			HotelRoom hi = new HotelRoom();
			hi.setId(Integer.parseInt(roomId[i]));
			hotelRoomDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelRoom> queryHotelRoom(HotelRoomQuery query) {
		// TODO Auto-generated method stub
		List<HotelRoom> hotelLs = hotelRoomDao.selectEntityList(query);
		return hotelLs;
	}

	@Override
	public int queryHotelRoomCount(HotelRoomQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelRoomDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelRoomQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelRoomDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}

	@Override
	public HotelRoom queryRoomInfoDef(int id) {
		// TODO Auto-generated method stub
		HotelRoom hotelInfo = hotelRoomDao.selectById(id);
		return hotelInfo;
		
	}
}
