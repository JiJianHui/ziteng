package com.ziteng.dao.base;

import java.util.Collection;
import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.transaction.annotation.Transactional;

public interface IBaseDao<T> {
    
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
	
	
	/**
	 * 功能描述: 根据实体(查询条件)对象查询<br/> 
	 * @param t
	 * @return 
	 * @author lusar
	 * 日期:2013-7-17 下午01:47:55
	 */
	public T selectByEntity(Object query);
	
	
	/**
	 * 查询列表
	 * @param object
	 * @return
	 */
	public List<T> selectEntityList(Object query);
	
	/**
	 * 查询总个数
	 * @param object
	 * @return
	 */
	public Integer selectEntityCount(Object query);
	
	/**
	 * 返回要插入的id取值
	 * 
	 * @return
	 */
	public Integer getGeneralId();
	
	/**
	 * 功能描述: 通过ID查找<br/> 
	 * @param ids
	 * @return 
	 * @author lusar
	 * 日期:2013-8-22 上午09:15:31
	 */
	public List<T> selectEntityByIds(@Param(value="ids")Collection<Integer> ids);
}
