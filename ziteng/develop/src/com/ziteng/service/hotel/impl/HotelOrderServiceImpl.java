package com.ziteng.service.hotel.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.hotel.IHotelOrder;
import com.ziteng.dto.query.hotel.HotelOrderQuery;
import com.ziteng.entity.hotel.HotelOrder;
import com.ziteng.service.hotel.IHotelOrderService;

@Service
@Transactional
public class HotelOrderServiceImpl implements IHotelOrderService {
	@Autowired
	private IHotelOrder hotelOrderDao;
	@Override
	public boolean addHotelOrder(HotelOrder hotelOrder) {
		// TODO Auto-generated method stub
		Integer result = hotelOrderDao.insert(hotelOrder);		
		return result > 0;
	}

	@Override
	public boolean updateHotelOrder(HotelOrder hotelOrder) {
		// TODO Auto-generated method stub
		Integer result = hotelOrderDao.update(hotelOrder);		
		return result > 0;
	}
	
	@Override
	public boolean updateHotelOrderState(HotelOrder hotelOrder) {
		// TODO Auto-generated method stub
		Integer result = hotelOrderDao.updateState(hotelOrder);		
		return result > 0;
	}

	@Override
	public boolean deleteHotelOrder(HotelOrder hotelOrder) {
		// TODO Auto-generated method stub
		hotelOrderDao.delete(hotelOrder);		
		return true;
	}

	@Override
	public boolean deleteHotelOrders(String hotelOrders) {
		// TODO Auto-generated method stub
		String orderId[] = hotelOrders.split(",");
		for(int i = 0 ; i < orderId.length; i ++)
		{
			HotelOrder hi = new HotelOrder();
			hi.setId(orderId[i]);
			hotelOrderDao.delete(hi);
		}
		return true;
	}

	@Override
	public List<HotelOrder> queryHotelOrder(HotelOrderQuery query) {
		// TODO Auto-generated method stub
		List<HotelOrder> hotelLs = hotelOrderDao.selectEntityList(query);
		return hotelLs;
	}

	@Override
	public int queryHotelOrderCount(HotelOrderQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelOrderDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public int getGeneralId(HotelOrderQuery query) {
		// TODO Auto-generated method stub
		Integer result = hotelOrderDao.getGeneralId();
		return result == null ? 1 : result + 1;
	}
}
