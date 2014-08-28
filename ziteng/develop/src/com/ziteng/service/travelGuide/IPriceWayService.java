package com.ziteng.service.travelGuide;

import java.util.List;

import com.ziteng.dto.query.travelGuide.PriceWayQuery;
import com.ziteng.entity.travelGuide.PriceWay;

public interface IPriceWayService {
    public boolean addPriceWay(PriceWay priceWay);
    public boolean updatePriceWay(PriceWay priceWay);
    public boolean deletePriceWay(PriceWay priceWay);
    public boolean deletePriceWays(List<PriceWay> priceWays);
    public List<PriceWay> queryPriceWay(PriceWayQuery query);
	public List<PriceWay> getAllPriceWays();
	public boolean deletePriceWayById(Integer valueOf);
}
