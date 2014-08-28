package com.ziteng.service.travelGuide;

import java.util.Date;
import java.util.List;

import com.ziteng.entity.travelGuide.TravelGuide;

public interface IPriceMode {
	public void setTravelGuide(TravelGuide guide);
	public float getPriceAt(Date date);
	public List<Float> getPricesAt(Date month);
	public String getPriceName();
	public String getPriceFormula();
}
