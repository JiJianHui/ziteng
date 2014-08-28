package com.ziteng.service.area.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.area.IAreaDao;
import com.ziteng.dto.query.area.AreaQuery;
import com.ziteng.entity.area.Area;
import com.ziteng.service.area.IAreaService;

@Service
@Transactional
public class AreaServiceImpl implements IAreaService {

	@Autowired
	private IAreaDao areaDao;

	@Override
	public boolean addArea(Area area) {
		area.setCreateTime(new Date());
		area.setEditTime(new Date());
		int code = areaDao.insert(area);
		return code > 0;
	}

	@Override
	public boolean updateArea(Area area) {
		int code = areaDao.update(area);
		return code > 0;
	}

	@Override
	public boolean deleteArea(Area area) {
		areaDao.delete(area);
		return true;
	}

	@Override
	public boolean deleteAreas(List<Area> areas) {
		for(Area c : areas)
			areaDao.delete(c);
		return true;
	}

	@Override
	public List<Area> queryArea(AreaQuery query) {
		List<Area> areas = areaDao.selectEntityList(query);
		return areas==null ? new ArrayList<Area>(0) : areas;
	}

	@Override
	public List<Area> getAll() {
		List<Area> areas = areaDao.getAll();
		return areas==null ? new ArrayList<Area>(0) : areas;
	}

	@Override
	public boolean deleteAreaById(Integer areaId) {
		Area area = new Area();
		area.setId( areaId);
		return deleteArea(area);
	}

}
