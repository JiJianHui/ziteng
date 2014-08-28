package com.ziteng.dto.query.travelGuide;

import com.ziteng.dto.query.base.Query;

/**
 * 攻略--区域
 * @author gyb
 * @date 2014-04-15
 *
 */
public class TravelGuide2AreaQuery extends Query{
	private Integer id;
	private Integer travelGuideId;
	private Integer areaId;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getTravelGuideId() {
		return travelGuideId;
	}
	public void setTravelGuideId(Integer travelGuideId) {
		this.travelGuideId = travelGuideId;
	}
	public Integer getAreaId() {
		return areaId;
	}
	public void setAreaId(Integer areaId) {
		this.areaId = areaId;
	}

}
