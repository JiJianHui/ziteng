package com.ziteng.web.controller.travelGuide;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.travelGuide.TravelGuideQuery;
import com.ziteng.entity.area.Area;
import com.ziteng.entity.area.Ratio;
import com.ziteng.entity.car.Car;
import com.ziteng.entity.car.CarDegree;
import com.ziteng.entity.travelGuide.TravelGuide;
import com.ziteng.entity.travelGuide.TravelGuide2Car;
import com.ziteng.entity.travelGuide.TravelGuide2CarDegreePrice;
import com.ziteng.entity.travelGuide.TravelGuideComment;
import com.ziteng.entity.user.User;
import com.ziteng.service.area.IAreaService;
import com.ziteng.service.area.IRatioService;
import com.ziteng.service.car.ICarDegreeService;
import com.ziteng.service.car.ICarService;
import com.ziteng.service.travelGuide.IPriceWayService;
import com.ziteng.service.travelGuide.ITravelGuide2AreaService;
import com.ziteng.service.travelGuide.ITravelGuide2CarDegreePriceService;
import com.ziteng.service.travelGuide.ITravelGuide2CarService;
import com.ziteng.service.travelGuide.ITravelGuideCommentService;
import com.ziteng.service.travelGuide.ITravelGuideService;
import com.ziteng.service.travelGuide.impl.TravelGuideServiceImpl;
import com.ziteng.service.user.IUserService;

/**
 * travel guide controller.
 * @author gyb
 *
 */
@Controller
public class TravelGuideController {

	@Autowired
	private ITravelGuideService travelGuideService;

	@Autowired
	private ITravelGuideCommentService commentService;

	@Autowired
	private IPriceWayService priceService;

	@Autowired
	private ITravelGuide2AreaService guide2AreaService;

	@Autowired
	private ITravelGuide2CarDegreePriceService carDegreePriceService;

	@Autowired
	private ICarService icarService;
	
	@Autowired 
	private ITravelGuide2CarService carService;

	@Autowired
	private IUserService userService;
	
	@Autowired
	private IRatioService ratioService;
	
	@Autowired
	private IAreaService areaService;
	
	@Autowired
	private ICarDegreeService	carDegreeService;
	

	@RequestMapping("/travelGuide/getAllTravelGuides.do")
	@ResponseBody
	public String getSearchTravelGuide(TravelGuideQuery query){
		Result result = new Result();
		int total = travelGuideService.queryTravelGuidesCount(query);
		List<TravelGuide> travelGuides  = travelGuideService.queryTravelGuide(query);
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("total", total);  
		result.putObject("travelGuides", travelGuides);
		result.putObject("pageNo",query.getPageNo());
		result.putObject("pageSize", query.getPageSize());
		return result.toJsonString();
	}

	@RequestMapping("/travelGuide/getTravelGuideById.do")
	@ResponseBody
	public String getTravelGuideById(Integer id){
		Result result = new Result();
		TravelGuide tg = travelGuideService.queryTravelGuideById(id);
		if(tg==null){
			result.setSuccess(false);
			result.setMsg("没有该攻略！");
		}else{
			result.setSuccess(true);
			result.setMsg("查询成功");
			result.putObject("travelGuide", tg);
		}
		return result.toJsonString();
	}

	@RequestMapping("/travelGuide/getCommentsByTravelGuideId.do")
	@ResponseBody
	public String getCommentsByTravelGuideId(Integer id){
		Result result = new Result();
		List<TravelGuideComment> cs = travelGuideService.queryCommentsByTravelGuideId(id);
		if(cs==null){
			result.setSuccess(false);
			result.setMsg("没有评论！");
		}else{
			result.setSuccess(true);
			result.setMsg("查询成功");
			result.putObject("travelGuideComments", cs);
		}
		
		return result.toJsonString();	
	}

	@RequestMapping("/travelGuide/poseComment.do")
	@ResponseBody
	public String poseComment(HttpSession session,Integer travelGuideId,String comment){
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if(user==null){
			result.setSuccess(false);
			result.setMsg("请登录！");
		}else{
			TravelGuideComment c = new TravelGuideComment();
			c.setUserId(user.getId());
			c.setComment(comment);
			c.setTravelGuideId(travelGuideId);
			c.setCreateTime(new Date());
			c.setEditTime(c.getCreateTime());
			boolean re = commentService.addTravelGuideComment(c);
			if(re==false){
				result.setSuccess(false);
				result.setMsg("评论不成功！");
			}else{
				result.setSuccess(true);
				result.setMsg("评论成功！");
				c.setUserConver(userService.selectById(c.getUserId()).getAvatar());
				result.putObject("travelGuideComment", c);
			}
		}
		return result.toJsonString();
	}
	
	

	/**
	 * get all guide for admin
	 * @return
	 */
	@RequestMapping("/v/w/travelGuide/getAllTravelGuidesForAdm.do")
	@ResponseBody
	public String getAllTravelGuide(){
		Result result = new Result();
		List<TravelGuide> guides=travelGuideService.getAllGuideForAdm();
		result.setSuccess(true);
		result.putObject("total", guides);
		result.putObject("guides", guides);
		return result.toJsonString();
	}
	
	
	/**
	 * get travel guide one month price.
	 * @param guideId
	 * @return
	 */
	@RequestMapping("/v/travelGuide/getGuideOneMonthPrice.do")
	@ResponseBody
	public String getTravelGuideOneMonthPrice(Integer guideId,Integer year,Integer month){
		Result result=new Result();
		TravelGuide guide = travelGuideService.getTravelGuideById(guideId);
		Integer startAreaId = guide.getDepartAreaId();
		List<Ratio> ratios = ratioService.getOneAreaAMonthRatio(startAreaId, year, month);
		List<TravelGuide2CarDegreePrice> prices = carDegreePriceService.queryTravelGuide2CarDegreePriceByTravelGuideId(guideId);
		
		for(TravelGuide2CarDegreePrice carDegree: prices){
			List<Double> oneDegreeOneMonthPrice=new ArrayList<Double>(31);
			for(Ratio ratio: ratios){
				double realPrice = 0;
				if(TravelGuideServiceImpl.PRICE_WAY_ID[0]==guide.getPriceWayId()){
					//按照天数计算
					realPrice = carDegree.getPricePerDay()*ratio.getRatio()*guide.getDays();
				}else if(TravelGuideServiceImpl.PRICE_WAY_ID[1]==guide.getPriceWayId()){
					//按照里程计算
					realPrice = carDegree.getPricePerKm()*ratio.getRatio()*guide.getKms();
				}else if(TravelGuideServiceImpl.PRICE_WAY_ID[2]==guide.getPriceWayId()){
					//只按照系数计算
					realPrice = carDegree.getOriginalPrice()*ratio.getRatio();
				}else if(TravelGuideServiceImpl.PRICE_WAY_ID[3]==guide.getPriceWayId()){
					//固定价格
					realPrice = carDegree.getOriginalPrice();
				}	
				oneDegreeOneMonthPrice.add(realPrice);
			}
			carDegree.setOneMonthPrice(oneDegreeOneMonthPrice);
		}
		
		result.putObject("guide", guide);
		result.putObject("ratios", ratios);
		result.putObject("prices",prices);
		result.setSuccess(true);
		return result.toJsonString();
	}
	
	/**
	 * add guide.
	 * @param travelGuide
	 * @return
	 */
	@RequestMapping("/v/w/travelGuide/addGuide.do")
	@ResponseBody
	public String addTravelGuide(TravelGuide travelGuide){
		boolean flag = travelGuideService.addTravelGuide(travelGuide);
		Result result = new Result();
		result.setSuccess(flag);
		result.setMsg(flag?"添加成功":"添加失败");
		if(flag){
			List<Car> cars = icarService.getAllCars();
			for(Car car : cars){
				TravelGuide2Car travelGuide2Car = new TravelGuide2Car();
				travelGuide2Car.setCarId(car.getId());
				travelGuide2Car.setTravelGuideId(travelGuide.getId());
				//add car .
				carService.addTravelGuide2Car(travelGuide2Car);
			}
			result.putObject("guideId", travelGuide.getId());
		}
		return result.toJsonString();
	}
	
	/**
	 * add guide 2 price.
	 * @param travelGuide
	 * @return
	 */
	@RequestMapping("/v/w/travelGuide/addGuidePrice.do")
	@ResponseBody
	public String addTravel2Price(@RequestBody TravelGuide2CarDegreePrice[] carDegreePrices){
		
		System.out.println(carDegreePrices.length+"lx");
		for(TravelGuide2CarDegreePrice tc : carDegreePrices){
			System.out.println(tc.getTravelGuideId()+" "+tc.getCarDegreeId() +" "+tc.getPricePerDay());
		}
		boolean flag = carDegreePriceService.insertBatch( Arrays.asList(carDegreePrices));
		Result result = new Result();
		result.setSuccess(flag);
		result.setMsg(flag?"添加成功":"添加失败");
		return result.toJsonString();
	}
	
	/**
	 * add guide 2 price.
	 * @param travelGuide
	 * @return
	 */
	@RequestMapping("/v/w/travelGuide/deleteGuide.do")
	@ResponseBody
	public String deleteGuide(Integer guideId){
		TravelGuide travelGuide = new TravelGuide();
		travelGuide.setId(guideId);
		boolean flag = travelGuideService.deleteTravelGuide(travelGuide);
		Result result = new Result();
		result.setSuccess(flag);
		result.setMsg(flag?"删除成功":"删除失败");
		return result.toJsonString();
	}
	
	/**
	 * get travel guide info to modfiy.
	 * @param guideId
	 * @return
	 */
	@RequestMapping("/v/w/travelGuide/getGuideInfoToModify.do")
	@ResponseBody
	public String getGuideInfoToModify(Integer guideId){
		Result result = new Result();
		TravelGuide travelGuide = travelGuideService.getTravelGuideById(guideId);
		List<TravelGuide2CarDegreePrice> prices = carDegreePriceService.queryTravelGuide2CarDegreePriceByTravelGuideId(guideId);
		List<Area> areas = areaService.getAll();
		List<CarDegree> carDegrees = carDegreeService.getAllCarDegrees();
		
		result.setSuccess(travelGuide!=null);
		result.putObject("guide", travelGuide);
		result.putObject("prices", prices);
		result.putObject("areas", areas);
		result.putObject("carDegrees", carDegrees);
		
		return result.toJsonString();
	}
	
	
	/**
	 * modify guide info
	 * @param guide
	 * @param prices
	 * @return
	 */
	@RequestMapping("/v/w/travelGuide/modfiy.do")
	@ResponseBody
	public String modfiyGuideInfo(TravelGuide guide){
		Result result = new Result();
		boolean flag = travelGuideService.updateTravelGuide(guide);
		carDegreePriceService.deleteByGuideId(guide.getId());
		result.setSuccess(flag);
		result.setMsg(flag?"修改成功":"修改失败");
		return result.toJsonString();
	}
}
