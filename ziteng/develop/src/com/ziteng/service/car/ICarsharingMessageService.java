package com.ziteng.service.car;

import java.util.List;

import com.ziteng.dto.query.car.CarsharingMessageQuery;
import com.ziteng.entity.car.CarsharingMessage;

/**
 * 拼车留言服务接口
 * @author yangzuo
 * @date 2014-04-19
 *
 */
public interface ICarsharingMessageService {
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     createCarsharingMessage 添加留言
	 * @param message
	 * @return 成功true, 失败false
	 */
	public boolean createCarsharingMessage(CarsharingMessage message);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     updateCarsharingMessage 修改留言
	 * @param message
	 * @return 成功true, 失败false
	 */
	public boolean updateCarsharingMessage(CarsharingMessage message);
	
	/**
	 * 
	 * <b>Summary: <b>
	 *     deleteCarsharingMessage 删除留言
	 * @param message
	 */
	public void deleteCarsharingMessage(CarsharingMessage message);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     queryCarsharingMessage 查询留言信息
	 * @param query
	 * @return 返回非NULL的集合
	 */
	public List<CarsharingMessage> queryCarsharingMessage(CarsharingMessageQuery query);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     queryCarsharingMessageCount 查询数量
	 * @param query
	 * @return
	 */
	public int queryCarsharingMessageCount(CarsharingMessageQuery query);

}