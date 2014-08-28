package com.ziteng.service.cache;

import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.dao.base.ICacheBaseDao;
import com.ziteng.dao.car.ICarOrderDao;
import com.ziteng.entity.car.CarOrder;
import com.ziteng.utils.JedisCacheTool;

public class OrderCacheDao implements IBaseDao<CarOrder>, ICacheBaseDao<CarOrder> {

	private final String car_order_prefix = "car_order_";
	
	@Autowired
	private ICarOrderDao carOrderDao;
	
	@Autowired
	private JedisCacheTool jedis;
	
	@Override
	public Integer insert(CarOrder order) {
		Integer result = carOrderDao.insert(order);
		if(result>0){
			jedis.putIntoCache(car_order_prefix, order.getId(), order);
		}
		return result;
	}

	@Override
	public Integer update(CarOrder order) {
		Integer result = carOrderDao.update(order);
		if(result>0){
			jedis.putIntoCache(car_order_prefix, order.getId(), order);
		}
		return result;
	}

	@Override
	public void deleteById(Integer id) {
		carOrderDao.deleteById(id);
		jedis.del(car_order_prefix + id);
	}

	@Override
	public void delete(CarOrder order) {
		carOrderDao.delete(order);
		jedis.del(car_order_prefix + order.getId());
	}

	@Override
	public CarOrder selectById(Integer id) {
		CarOrder order = (CarOrder) jedis.get(car_order_prefix + id); 
		if(order==null){
			order = carOrderDao.selectById(id);
			if(order!=null){
				jedis.putIntoCache(car_order_prefix, id, order);
			}
		}
		return order;
	}

	
	/////////////////////////////////////////
	
	@Override
	public CarOrder selectByEntity(Object query) {
		return carOrderDao.selectByEntity(query);
	}

	@Override
	public List<CarOrder> selectEntityList(Object query) {
		return carOrderDao.selectEntityList(query);
	}

	@Override
	public Integer selectEntityCount(Object query) {
		return carOrderDao.selectEntityCount(query);
	}

	@Override
	public Integer getGeneralId() {
		return carOrderDao.getGeneralId();
	}

	@Override
	public List<CarOrder> selectEntityByIds(Collection<Integer> ids) {
		return carOrderDao.selectEntityByIds(ids);
	}

}
