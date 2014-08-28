package com.ziteng.service.travelGuide;

import java.util.List;

import com.ziteng.dto.query.travelGuide.TravelGuide2CarDegreePriceQuery;
import com.ziteng.entity.travelGuide.TravelGuide2CarDegreePrice;

public interface ITravelGuide2CarDegreePriceService {
	public boolean addTravelGuide2CarDegreePrice(TravelGuide2CarDegreePrice travelGuide2CarDegreePrice);
	public boolean updateTravelGuide2CarDegreePrice(TravelGuide2CarDegreePrice travelGuide2CarDegreePrice);
	public boolean deleteTravelGuide2CarDegreePrice(TravelGuide2CarDegreePrice travelGuide2CarDegreePrice);
	public boolean deleteTravelGuide2CarDegreePrices(List<TravelGuide2CarDegreePrice> travelGuide2CarDegreePrices);
	public List<TravelGuide2CarDegreePrice> queryTravelGuide2CarDegreePriceList(
			TravelGuide2CarDegreePriceQuery priceQuery);
	public List<TravelGuide2CarDegreePrice> queryTravelGuide2CarDegreePriceByTravelGuideId(Integer travelGuideId);
	
	
	/**
	 * get all car degree price.
	 * @return List<TravelGuide2CarDegreePrice>
	 * @author lusar
	 * @date 2014-05-12
	 */
	public List<TravelGuide2CarDegreePrice> getAllCarDegreePrice();
	
	/**
	 * add 
	 * @param carDegrees
	 * @return
	 */
	public boolean insertBatch(List<TravelGuide2CarDegreePrice> carDegrees);
	
	/**
	 * delete by guide id.
	 * @param id
	 */
	public void deleteByGuideId(Integer id);
}
