package com.ziteng.dao.hotel;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.hotel.HotelInfo;

public interface IHotelInfo extends IBaseDao<HotelInfo> {
	/**
	 * 查询前几条列表
	 * @param object
	 * @return
	 */
	public List<HotelInfo> selectEntityListByTop(Object query);
	
}
