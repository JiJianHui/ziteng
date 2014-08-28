package com.ziteng.service.travelGuide;

import java.util.Date;
import java.util.List;
import java.util.Map;

import com.ziteng.dto.query.travelGuide.TravelGuideQuery;
import com.ziteng.entity.travelGuide.TravelGuide;
import com.ziteng.entity.travelGuide.TravelGuideComment;

public interface ITravelGuideService {
    public boolean addTravelGuide(TravelGuide travelGuide);
    public boolean updateTravelGuide(TravelGuide travelGuide);
    public boolean deleteTravelGuide(TravelGuide travelGuide);
    public boolean deleteTravelGuides(List<TravelGuide> travelGuides);
    public List<TravelGuide> queryTravelGuide(TravelGuideQuery query);
	public int queryTravelGuidesCount(TravelGuideQuery query);
	public TravelGuide queryTravelGuideById(Integer id);
	public List<TravelGuideComment> queryCommentsByTravelGuideId(Integer id);
	public Map<String, Object> getPriceByTravelGuideId(Integer travelGuideId,Date date);
	//查看具体价格
	public float getPriceByTravelGuideId(Integer travelGuideId,Date date,Integer carDegreeId);
	
	public List<TravelGuide> getAllGuideForAdm();
	
	public TravelGuide getTravelGuideById(Integer id);
	
	/**
	 * get all simple guide.
	 * @return
	 */
	public List<TravelGuide> getSimpleAllGuide();
}
