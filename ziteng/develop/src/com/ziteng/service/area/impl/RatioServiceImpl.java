package com.ziteng.service.area.impl;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.common.Constants;
import com.ziteng.dao.area.IRatioDao;
import com.ziteng.dto.query.area.RatioQuery;
import com.ziteng.entity.area.Area;
import com.ziteng.entity.area.Ratio;
import com.ziteng.service.area.IRatioService;
import com.ziteng.utils.DateUtils;

@Service
@Transactional
public class RatioServiceImpl implements IRatioService {

	@Autowired
	private IRatioDao ratioDao;

	@Override
	public boolean addRatio(Ratio ratio) {
		ratio.setCreateTime(new Date());
		ratio.setEditTime(new Date());
		int code = ratioDao.insert(ratio);
		return code > 0;
	}

	@Override
	public boolean updateRatio(Ratio ratio) {
		ratio.setEditTime(new Date());
		int code = ratioDao.update(ratio);
		return code > 0;
	}

	@Override
	public boolean deleteRatio(Ratio ratio) {
		ratioDao.delete(ratio);
		return true;
	}

	@Override
	public boolean deleteRatios(List<Ratio> ratios) {
		for(Ratio c : ratios)
			ratioDao.delete(c);
		return true;
	}

	@Override
	public List<Ratio> queryRatio(RatioQuery query) {
		List<Ratio> ratios = ratioDao.selectEntityList(query);
		return ratios == null ? new ArrayList<Ratio>(0) : ratios;
	}
	
	@Override
	public int queryRatioCount(RatioQuery query){
		Integer result = ratioDao.selectEntityCount(query);
		return result == null ? 0 : result;
	}

	@Override
	public boolean deleteRatioById(Integer id) {
		Ratio ratio = new Ratio();
		ratio.setId(id);
		return deleteRatio(ratio);
	}

	@Override
	public List<Ratio> getAll() {
		List<Ratio> ratios = ratioDao.getAll();
		return ratios == null ? new ArrayList<Ratio>(0) : ratios;
	}
	@Override
	public boolean insertBatch(List<Ratio> ratios){
		return ratioDao.insertBatch(ratios) > 0;
	}

	@Override
	public List<Ratio> getOneAreaAMonthRatio(Integer areaId,Integer year, Integer month) {
		Calendar ca = Calendar.getInstance();
		if(year==null){
			year = ca.get(Calendar.YEAR);
		}
		if(month==null){
			month = ca.get(Calendar.MONTH) + 1;	
		}
		
		ca.set(Calendar.YEAR, year);
		ca.set(Calendar.MONTH, month-1);
		
		RatioQuery query = new RatioQuery();
		query.setAreaId(areaId);
		query.setYear(year);
		query.setMonth(month);
		query.isUsePagination(false);
		query.setSortname("date");
		query.setSortorder("asc");
		List<Ratio> ratios = queryRatio(query);
		if(ratios.isEmpty()){		//if the area's ratio has not setting, then we set default value for it.
			int days = ca.getActualMaximum(Calendar.DATE);
			for(int i = 1; i <= days; i++){
				Ratio ratio = new Ratio();
				ratio.setAreaId(areaId);
				ratio.setRatio(Constants.DEFAULT_RATIO);
				ratio.setDate(DateUtils.yyyyMMdd2Date(String.format("%d%02d%02d", year, month, i)));
				ratio.setCreateTime(new Date());
				ratio.setEditTime(new Date());
				ratios.add(ratio);
			}
			insertBatch(ratios);
		}
		return ratios;
	}
}
