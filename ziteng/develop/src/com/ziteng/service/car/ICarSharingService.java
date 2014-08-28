package com.ziteng.service.car;

import java.util.List;

import com.ziteng.dto.query.car.CarSharingQuery;
import com.ziteng.entity.car.CarSharing;

/**
 * 拼车服务接口
 * @author yangzuo
 * @date 2014-04-19
 *
 */
public interface ICarSharingService {
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     createCarSharingInfo 发布新的拼车信息
	 * @param carsharing
	 * @return 成功true, 失败false
	 */
	public boolean createCarSharingInfo(CarSharing carsharing);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     updateCarSharingInfo 修改拼车信息
	 * @param carsharing
	 * @return 成功true, 失败false
	 */
	public boolean updateCarSharingInfo(CarSharing carsharing);
	
	/**
	 * 
	 * <b>Summary: <b>
	 *     deleteCarSharingInfo 删除拼车信息
	 * @param carsharing
	 */
	public void deleteCarSharingInfo(CarSharing carsharing);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     findCarSharingInfoById 根据拼车信息id查询
	 * @param id
	 * @return CarSharing
	 */
	public CarSharing findCarSharingInfoById(Integer id);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     queryCarSharingInfos 查询拼车信息
	 * @param query
	 * @return 返回非NULL的集合
	 */
	public List<CarSharing> queryCarSharingInfos(CarSharingQuery query);
	
	/**
	 * 
	 * <b>Summary: </b>
	 *     queryCarSharingInfoCount 查询数量
	 * @param query
	 * @return
	 */
	public int queryCarSharingInfoCount(CarSharingQuery query);

}
