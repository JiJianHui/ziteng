package com.ziteng.service.travel;

import com.ziteng.entity.travelGuide.TravelGuide;

/**
 * 攻略信息服务类
 * @author lusar
 * @date 2014-04-17
 *
 */
public interface ITravelService {
	/**
	 * 添加攻略
	 * @param travel
	 * @return
	 */
	public boolean add(TravelGuide travel);
	
	
	
}
