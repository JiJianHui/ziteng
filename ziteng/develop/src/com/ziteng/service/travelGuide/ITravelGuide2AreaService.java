package com.ziteng.service.travelGuide;

import java.util.List;

import com.ziteng.dto.query.travelGuide.TravelGuide2AreaQuery;
import com.ziteng.entity.travelGuide.TravelGuide2Area;

public interface ITravelGuide2AreaService {
    public boolean addTravelGuide2Area(TravelGuide2Area travelGuide2Area);
    public boolean updateTravelGuide2Area(TravelGuide2Area travelGuide2Area);
    public boolean deleteTravelGuide2Area(TravelGuide2Area travelGuide2Area);
    public boolean deleteTravelGuide2Areas(List<TravelGuide2Area> travelGuide2Areas);
    public List<TravelGuide2Area> queryTravelGuide2Area(TravelGuide2AreaQuery query);
}
