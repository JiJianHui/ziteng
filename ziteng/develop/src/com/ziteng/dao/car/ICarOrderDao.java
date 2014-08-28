package com.ziteng.dao.car;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.car.CarOrder;


/**
 * 车订单dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface ICarOrderDao extends IBaseDao<CarOrder> {

	List<CarOrder> selectAll();
    public Integer getOrderCountByTravelGuideId(Integer travelGuideId);
    
    /**
     * delete order by guideId.
     * @param id
     */
	void deleteByGuideId(Integer guideId);
}
