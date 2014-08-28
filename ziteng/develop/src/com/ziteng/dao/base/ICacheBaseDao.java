package com.ziteng.dao.base;

/**
 * cache base dao
 * @author lusar
 *
 * @param <T>
 */
public interface ICacheBaseDao<T> {
	/**
	 * 功能描述: 插入<br/> 
	 * @param t
	 * @return 
	 * @author lusar
	 */
	public Integer insert(T t);
	
	/**
	 * 功能描述: 更新实体<br/> 
	 * @param t 
	 * 创建人：lusar
	 */
	public Integer update(T t);
	
	/**
	 * 功能描述: 根据ID号删除单个实体<br/> 
	 * @param id
	 * @return 
	 * @author lusar
	 */
	public void deleteById(Integer id);
	
	/**
	 * 功能描述: 删除实体<br/> 
	 * @param t 
	 * @author lusar
	 */
	public void delete(T t);
	
	/**
	 * 根据ID号查询单个实体
	 * @param obj
	 */
	public T selectById(Integer id);
}
