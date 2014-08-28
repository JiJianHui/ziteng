package com.ziteng.dao.car;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.car.CarDegree;


/**
 * 车订单dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface ICarDegreeDao extends IBaseDao<CarDegree> {
	public List<CarDegree> selectAll();
}
