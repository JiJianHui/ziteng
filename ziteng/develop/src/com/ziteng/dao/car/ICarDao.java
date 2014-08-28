package com.ziteng.dao.car;


import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.car.Car;


/**
 * 车dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface ICarDao extends IBaseDao<Car>{
	public List<Car> selectAll();

	public List<Car> getCarsByTravelGuideId(Integer travelGuideId);
	
}
