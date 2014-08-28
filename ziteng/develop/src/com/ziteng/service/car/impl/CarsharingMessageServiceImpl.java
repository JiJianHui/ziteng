package com.ziteng.service.car.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.car.ICarsharingMessageDao;
import com.ziteng.dto.query.car.CarsharingMessageQuery;
import com.ziteng.entity.car.CarsharingMessage;
import com.ziteng.service.car.ICarsharingMessageService;

/**
 * 拼车留言服务接口实现类
 * @author yangzuo
 * @date 2014-04-19
 *
 */
@Service
@Transactional
public class CarsharingMessageServiceImpl implements ICarsharingMessageService {

	@Autowired
	private ICarsharingMessageDao dao;
	
	@Override
	public boolean createCarsharingMessage(CarsharingMessage message) {
		Integer flag = dao.insert(message);
		return (flag != null && flag > 0);
	}

	@Override
	public boolean updateCarsharingMessage(CarsharingMessage message) {
		Integer flag = dao.update(message);
		return (flag != null && flag > 0);
	}

	@Override
	public void deleteCarsharingMessage(CarsharingMessage message) {
		dao.delete(message);
	}

	@Override
	public List<CarsharingMessage> queryCarsharingMessage(CarsharingMessageQuery query) {
		List<CarsharingMessage> messages = dao.selectEntityList(query);
		messages = messages == null ? new ArrayList<CarsharingMessage>(0) : messages;
		return messages;
	}

	@Override
	public int queryCarsharingMessageCount(CarsharingMessageQuery query) {
		Integer count = dao.selectEntityCount(query);
		return (count == null ? 0 : count);
	}

}
