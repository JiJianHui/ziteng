package com.ziteng.service.order;

import java.util.List;

import com.ziteng.dto.biz.Result;
import com.ziteng.entity.car.CarOrder;

public class InitStateHandler implements IStatusHandler {

	@Override
	public Result handle() {
		return null;
	}

	@Override
	public void setOrder(CarOrder order) {

	}

	@Override
	public String getStatusName() {
		return null;
	}

	@Override
	public List<Integer> getNextAvailableState() {
		return null;
	}

}
