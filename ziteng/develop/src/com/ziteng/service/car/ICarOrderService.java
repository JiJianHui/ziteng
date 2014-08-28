package com.ziteng.service.car;

import java.util.List;

import com.ziteng.dto.query.car.CarOrderQuery;
import com.ziteng.entity.car.CarOrder;

public interface ICarOrderService {
    public boolean addCarOrder(CarOrder carOrder);
    public boolean updateCarOrder(CarOrder carOrder);
    public boolean deleteCarOrder(CarOrder carOrder);
    public CarOrder getCarOderById(Integer id);
    public boolean deleteCarOrders(List<CarOrder> carOrders);
	public List<CarOrder> getAllCarOrders();
	
	public int queryCarOrderCount(CarOrderQuery query);
    public List<CarOrder> queryCarOrder(CarOrderQuery query);

}
