package com.ziteng.dao.hotel;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.hotel.HotelInfo;
import com.ziteng.entity.hotel.HotelOrder;

public interface IHotelOrder extends IBaseDao<HotelOrder> {
	/**
	 * 更新订单状态
	 * @param object
	 * @return
	 */
	public Integer updateState(Object query);
}
