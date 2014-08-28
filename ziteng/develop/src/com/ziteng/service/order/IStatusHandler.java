package com.ziteng.service.order;

import java.util.List;

import com.ziteng.dto.biz.Result;
import com.ziteng.entity.car.CarOrder;

public interface IStatusHandler {
	public Result handle();
	public void setOrder(CarOrder order);
	public String getStatusName();
	public List<Integer> getNextAvailableState();
}
