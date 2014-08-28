package com.ziteng.service.area;

import java.util.List;

import com.ziteng.dto.query.area.AreaQuery;
import com.ziteng.entity.area.Area;

public interface IAreaService {
	
	/**
	 * 添加区域
	 * @param area
	 * @return
	 */
    public boolean addArea(Area area);
    
    /**
     * 更新区域
     * @param area
     * @return
     */
    public boolean updateArea(Area area);
    
    /**
     * 删除区域
     * @param area
     * @return
     */
    public boolean deleteArea(Area area);
    
    /**
     * 删去区域列表
     * @param areas
     * @return
     */
    public boolean deleteAreas(List<Area> areas);
    public List<Area> queryArea(AreaQuery query);

	public List<Area> getAll();
	
	public boolean deleteAreaById(Integer areaId);
}
