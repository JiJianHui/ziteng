package com.ziteng.service.area;

import java.util.List;

import com.ziteng.dto.query.area.RatioQuery;
import com.ziteng.entity.area.Ratio;

public interface IRatioService {
    public boolean addRatio(Ratio ratio);
    public boolean updateRatio(Ratio ratio);
    public boolean deleteRatio(Ratio ratio);
    public boolean deleteRatios(List<Ratio> ratios);
    public List<Ratio> queryRatio(RatioQuery query);
	public boolean deleteRatioById(Integer id);
	public int queryRatioCount(RatioQuery query);
	public List<Ratio> getAll();
	
	
	public List<Ratio> getOneAreaAMonthRatio(Integer areaId, Integer year, Integer month);
	
	public boolean insertBatch(List<Ratio> ratios);
}
