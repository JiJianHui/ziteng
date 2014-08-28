package com.ziteng.dao.area;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.area.Area;

/**
 * 区域dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface IAreaDao extends IBaseDao<Area>{
	/**
	 * 获取全部区域
	 * @return
	 */
	public List<Area> getAll();

	}
