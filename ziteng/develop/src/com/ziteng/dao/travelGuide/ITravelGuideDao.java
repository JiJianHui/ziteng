package com.ziteng.dao.travelGuide;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.travelGuide.TravelGuide;

public interface ITravelGuideDao extends IBaseDao<TravelGuide> {

	public List<TravelGuide> getSimpleAllGuide();
}
