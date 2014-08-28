package com.ziteng.service.travelGuide.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ziteng.dao.area.IAreaDao;
import com.ziteng.dao.area.IRatioDao;
import com.ziteng.dao.car.ICarDegreeDao;
import com.ziteng.dao.car.ICarImageDao;
import com.ziteng.dao.car.ICarOrderDao;
import com.ziteng.dao.travelGuide.ITravelGuideCommentDao;
import com.ziteng.dao.travelGuide.ITravelGuideDao;
import com.ziteng.dao.user.IUserDao;
import com.ziteng.dto.query.area.RatioQuery;
import com.ziteng.dto.query.travelGuide.TravelGuide2CarDegreePriceQuery;
import com.ziteng.dto.query.travelGuide.TravelGuideQuery;
import com.ziteng.entity.area.Ratio;
import com.ziteng.entity.travelGuide.TravelGuide;
import com.ziteng.entity.travelGuide.TravelGuide2CarDegreePrice;
import com.ziteng.entity.travelGuide.TravelGuideComment;
import com.ziteng.entity.user.User;
import com.ziteng.service.travelGuide.ITravelGuide2CarDegreePriceService;
import com.ziteng.service.travelGuide.ITravelGuideService;
import com.ziteng.utils.DateUtils;

@Service
@Transactional
public class TravelGuideServiceImpl implements ITravelGuideService {
	public static int []PRICE_WAY_ID = {1,2,3,4};
	@Autowired
	private ITravelGuideDao travelGuideDao;

	@Autowired
	private IAreaDao areaDao;

	@Autowired
	private ICarOrderDao carOrderDao;
	
	@Autowired
	private ICarDegreeDao carDegreeDao;
	
	@Autowired
	private ITravelGuideCommentDao travelGuideCommentDao;

	@Autowired
	private IUserDao userDao;

	@Autowired
	private IRatioDao ratioDao;

	@Autowired
	private ITravelGuide2CarDegreePriceService travelGuide2CarDegreePriceService;

	@Override
	public boolean addTravelGuide(TravelGuide travelGuide) {
		travelGuide.setEditTime(new Date());
		travelGuide.setCreateTime(new Date());
		int code = travelGuideDao.insert(travelGuide);
		return code > 0;
	}

	@Override
	public boolean updateTravelGuide(TravelGuide travelGuide) {
		travelGuide.setEditTime(new Date());
		int code = travelGuideDao.update(travelGuide);
		return code > 0;
	}

	@Override
	public boolean deleteTravelGuide(TravelGuide travelGuide) {
		carOrderDao.deleteByGuideId(travelGuide.getId());
		travelGuideDao.delete(travelGuide);
		travelGuideCommentDao.deleteByGuideId(travelGuide.getId());
		travelGuide2CarDegreePriceService.deleteByGuideId(travelGuide.getId());
		return true;
	}

	@Override
	public boolean deleteTravelGuides(List<TravelGuide> travelGuides) {
		// TODO Auto-generated method stub
		for(TravelGuide p : travelGuides)
			travelGuideDao.delete(p);
		return true;
	}

	@Override
	public List<TravelGuide> queryTravelGuide(TravelGuideQuery query) {
		// TODO Auto-generated method stub
		List<TravelGuide> travelGuides = travelGuideDao.selectEntityList(query);
		for(TravelGuide tg:travelGuides){
			tg.setDepartAreaName(areaDao.selectById(tg.getDepartAreaId()).getName());
			tg.setArriveAreaName(areaDao.selectById(tg.getArriveAreaId()).getName());
			tg.setOrdersCount(carOrderDao.getOrderCountByTravelGuideId(tg.getId()));
			tg.setCommentsCount(travelGuideCommentDao.getCommentsCountByTravelGuideId(tg.getId()));
			TravelGuideComment tgc = travelGuideCommentDao.getLatestCommentByTravelGuideId(tg.getId());
			if(tgc!=null){
				tg.setLatestComment(tgc.getComment());
				tg.setLatestCommentTime(tgc.getCreateTime());
				User u = userDao.selectById(tgc.getUserId());
				tg.setLatestCommentUser(u.getUserName());
				tg.setLatestCommentUserCover(u.getAvatar());
			}

		}

		return travelGuides;
	}

	@Override
	public int queryTravelGuidesCount(TravelGuideQuery query) {
		// TODO Auto-generated method stub
		Integer count = travelGuideDao.selectEntityCount(query);
		count = count == null?0:count;
		return count;
	}

	@Override
	public TravelGuide queryTravelGuideById(Integer id) {
		// TODO Auto-generated method stub
		if(id==null)
			return null;
		TravelGuide tg = travelGuideDao.selectById(id);

		tg.setDepartAreaName(areaDao.selectById(tg.getDepartAreaId()).getName());
		tg.setArriveAreaName(areaDao.selectById(tg.getArriveAreaId()).getName());
		tg.setOrdersCount(carOrderDao.getOrderCountByTravelGuideId(tg.getId()));
		tg.setCommentsCount(travelGuideCommentDao.getCommentsCountByTravelGuideId(tg.getId()));
		return tg;
	}

	@Override
	public List<TravelGuideComment> queryCommentsByTravelGuideId(Integer id) {
		// TODO Auto-generated method stub
		if(id==null)
			return null;
		List<TravelGuideComment> cs = travelGuideCommentDao.getCommentsByTravelGuideId(id);
		if(cs==null)
			return null;
		for(TravelGuideComment c:cs){
			User u = userDao.selectById(c.getUserId());
			c.setUserName(u.getUserName());
			c.setUserConver(u.getAvatar());
		}
		return cs;
	}
	/**
	 * 获取该攻略的价格
	 */
	@Override
	public Map<String, Object> getPriceByTravelGuideId(Integer travelGuideId,Date date) {
		if(travelGuideId==null){
			System.out.println("travel guide id = null");
			return null;
		}
		TravelGuide tg = travelGuideDao.selectById(travelGuideId);
		if(tg==null||date==null){
			System.out.println("travel date = null");
			return null;
		}else{
			RatioQuery rq = new RatioQuery();
			rq.setAreaId(tg.getDepartAreaId());
			rq.setDate(date);
			Ratio ratio = ratioDao.selectByEntity(rq);
			List<TravelGuide2CarDegreePrice> travelGuide2CarDegreePrices = travelGuide2CarDegreePriceService.queryTravelGuide2CarDegreePriceByTravelGuideId(tg.getId());
			if(travelGuide2CarDegreePrices.size()<1)
				return null;
			Map<String, Object> prices = new HashMap<String,Object>();
			if(PRICE_WAY_ID[0]==tg.getPriceWayId()){
				for(TravelGuide2CarDegreePrice p:travelGuide2CarDegreePrices){
					prices.put(p.getCarDegreeId().toString(), tg.getDays()*p.getPricePerDay()*ratio.getRatio()+"");
				}
			}else if(PRICE_WAY_ID[1]==tg.getPriceWayId()){
				for(TravelGuide2CarDegreePrice p:travelGuide2CarDegreePrices){
					prices.put(p.getCarDegreeId().toString(), tg.getKms()*p.getPricePerKm()*ratio.getRatio()+"");
				}
			}else if(PRICE_WAY_ID[2]==tg.getPriceWayId()){
				
				for(TravelGuide2CarDegreePrice p:travelGuide2CarDegreePrices){
					//System.out.println("degreeId:"+p.getCarDegreeId());
					//System.out.println("p.getOriginalPrice():"+p.getOriginalPrice());
					//System.out.println("ratio.getRatio():"+ratio.getRatio());
					prices.put(p.getCarDegreeId().toString(),p.getOriginalPrice()*ratio.getRatio()+"");
				}
			}else if(PRICE_WAY_ID[3]==tg.getPriceWayId()){
				for(TravelGuide2CarDegreePrice p:travelGuide2CarDegreePrices){
					prices.put(p.getCarDegreeId().toString(),p.getOriginalPrice()+"");
				}
			}	
			return prices;
		}
	}

	@Override
	public float getPriceByTravelGuideId(Integer travelGuideId, Date date,
			Integer carDegreeId) {
		Map<String, Object> prices = getPriceByTravelGuideId(travelGuideId,date);
		String price = (String) prices.get(String.valueOf(carDegreeId));
		if(price==null){
			System.out.println("get price travelGuideId = " + travelGuideId +" carDegreeId = "+carDegreeId);
			System.out.println("date = "+DateUtils.yyyy_MM_dd(date));
		}
		return Float.parseFloat(price);
	}

	@Override
	public List<TravelGuide> getAllGuideForAdm() {
		TravelGuideQuery query = new TravelGuideQuery();
		List<TravelGuide> guides = travelGuideDao.selectEntityList(query);
		guides = guides==null ? new ArrayList<TravelGuide>(0) : guides;
		for(TravelGuide travelGuide : guides){
			travelGuide.setDepartAreaName(areaDao.selectById(travelGuide.getDepartAreaId()).getName());
			travelGuide.setArriveAreaName(areaDao.selectById(travelGuide.getArriveAreaId()).getName());
			travelGuide.setOrdersCount(carOrderDao.getOrderCountByTravelGuideId(travelGuide.getId()));
		}
		
		return guides;
	}

	@Override
	public TravelGuide getTravelGuideById(Integer id) {
		TravelGuideQuery query = new TravelGuideQuery();
		query.setId(id);
		List<TravelGuide> guides = travelGuideDao.selectEntityList(query);
		if(guides==null ||guides.isEmpty()){
			return null;
		}
		return guides.get(0);
	}

	@Override
	public List<TravelGuide> getSimpleAllGuide() {
		List<TravelGuide> guides = travelGuideDao.getSimpleAllGuide();
		return guides==null?new ArrayList<TravelGuide>(0) : guides;
	}
}
