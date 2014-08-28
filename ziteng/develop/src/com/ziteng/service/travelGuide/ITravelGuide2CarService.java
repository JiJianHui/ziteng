package com.ziteng.service.travelGuide;

import java.util.List;

import com.ziteng.dto.query.travelGuide.TravelGuide2CarQuery;
import com.ziteng.entity.travelGuide.TravelGuide2Car;

public interface ITravelGuide2CarService {
    public boolean addTravelGuide2Car(TravelGuide2Car travelGuide2Car);
    public boolean updateTravelGuide2Car(TravelGuide2Car travelGuide2Car);
    public boolean deleteTravelGuide2Car(TravelGuide2Car travelGuide2Car);
    public boolean deleteTravelGuide2Cars(List<TravelGuide2Car> travelGuide2Cars);
    public List<TravelGuide2Car> queryTravelGuide2Car(TravelGuide2CarQuery query);
}
