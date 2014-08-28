package com.ziteng.dao.area;

import java.util.List;

import com.ziteng.dao.base.IBaseDao;
import com.ziteng.entity.area.Ratio;

/**
 * 价格系数表dao层
 * @author gyb
 * @date 2014-04-15
 *
 */
public interface IRatioDao extends IBaseDao<Ratio>{
	/**
	 * 获取全部系数
	 * @return
	 */
	public List<Ratio> getAll();
	
	/**
	 * insert batch.
	 * @param list
	 * @return
	 */
	public int insertBatch(List<Ratio> list);
}
