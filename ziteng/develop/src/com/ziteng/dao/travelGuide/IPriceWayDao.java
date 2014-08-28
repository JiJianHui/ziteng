package com.ziteng.dao.travelGuide;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.travelGuide.PriceWay;

/**
 * 价格类型dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface IPriceWayDao extends IBaseDao<PriceWay> {

	List<PriceWay> selectAll();

}
