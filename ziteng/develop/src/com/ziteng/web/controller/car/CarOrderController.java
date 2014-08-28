package com.ziteng.web.controller.car;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.common.KeyGenerator;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.car.CarOrderQuery;
import com.ziteng.dto.query.travelGuide.TravelGuideQuery;
import com.ziteng.entity.car.Car;
import com.ziteng.entity.car.CarDegree;
import com.ziteng.entity.car.CarOrder;
import com.ziteng.entity.travelGuide.TravelGuide;
import com.ziteng.entity.user.User;
import com.ziteng.service.car.ICarDegreeService;
import com.ziteng.service.car.ICarOrderService;
import com.ziteng.service.car.ICarService;
import com.ziteng.service.travelGuide.ITravelGuideService;
import com.ziteng.utils.DateUtils;
import com.ziteng.utils.Regex;

/**
 * car order controller
 * @author gyb
 *
 */
@Controller
public class CarOrderController {
	@Autowired
	private ICarOrderService carOrderService;
	
	@Autowired
	private ICarDegreeService carDegreeService;
	
	@Autowired
	private ITravelGuideService travelGuideService;
	
	@Autowired
	private ICarService carService;
	
	@Autowired
	private ITravelGuideService guideService;
	
	/**
	 * get all car degree info.
	 * @return
	 */
	@RequestMapping("/car/getAllCarOrders.do")
	@ResponseBody
	public String getAllCarOrders(){
		Result result = new Result();
		List<CarOrder> carOrders = carOrderService.getAllCarOrders();
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("total",carOrders.size());
		result.putObject("cars", carOrders);
		return result.toJsonString();
	}
    
	/**
	 * delete car degree by id.
	 * @param carId
	 * @return
	 */
	@RequestMapping("/car/deleteCarOrderById.do")
	@ResponseBody
	public String deleteCarOrderById(String carId){
		Result result = new Result();
		if(! Regex.regex(Regex.sint, carId)){
			return result.setErrorMsg("类型不正确").toJsonString();
		}
		CarOrder carOrder=new CarOrder();
		carOrder.setId(Integer.valueOf(carId));
		boolean flag = carOrderService.deleteCarOrder(carOrder);
		result.setSuccess(flag);
		result.setMsg(flag ? "删除成功" : "删除失败");
		return result.toJsonString();
	}
	
	/**
	 * add new car degree.
	 * @param car
	 * @return
	 */
	@RequestMapping("/car/addNewCarOrder.do")
	@ResponseBody
	public String addNewCarOrder(HttpSession session,CarOrder carOrder){
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if(user==null){
			return result.setErrorMsg("请登录！").toJsonString();
		}else{
			System.out.println("time:"+carOrder.getBeginTime());
			carOrder.setUserId(user.getId());
			carOrder.setFlowId(KeyGenerator.getNextCarOrderId(user.getId()));
			carOrder.setStatus(CarOrder.S_INIT);
			TravelGuide guide = guideService.getTravelGuideById(carOrder.getTravelGuideId());
			Calendar calendar = Calendar.getInstance();
			calendar.setTime(carOrder.getBeginTime());
			System.out.println("begintime = "+DateUtils.yyyy_MM_dd(carOrder.getBeginTime()));
			calendar.add(Calendar.DATE, Math.round(guide.getDays()));
			Date endDate = calendar.getTime();
			carOrder.setEndTime(endDate);
			//计算价格
			carOrder.setPrice(carOrder.getCarAmount()*travelGuideService.getPriceByTravelGuideId(carOrder.getTravelGuideId(), carOrder.getBeginTime(), carOrder.getCarDegreeId()));
			boolean flag = carOrderService.addCarOrder(carOrder);
			carOrder.getId();
			result.setSuccess(flag);
			result.putObject("orderId", carOrder.getId());
			result.setMsg(flag ? "创建成功" : "创建失败");
			return result.toJsonString();
		}
	}
	
	

	/**
	 * get search conditions.
	 * @return
	 */
	@RequestMapping("/v/w/carOrder/searchConditions.do")
	@ResponseBody
	public String getSearchConditions(){
		Result result = new Result();
		TravelGuideQuery guideQuery = new TravelGuideQuery();
		List<TravelGuide> guides = travelGuideService.queryTravelGuide(guideQuery);
		List<Car> cars = carService.getAllCars();
		result.setSuccess(true);
		result.putObject("guides", guides);
		result.putObject("cars", cars);
		return result.toJsonString();
		
		
	}
	
	/**
	 * search user  order.
	 * @param query
	 * @return
	 */
	@RequestMapping("/v/carOrder/searchUserOrder.do")
	@ResponseBody
	public String getUserOrder(HttpSession session, CarOrderQuery query){
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if(user==null){
			Result result = new Result();
			return result.setErrorMsg("请登录！").toJsonString();
		}else{
			query.setUserId(user.getId());
			return searchCarOrder(query);
		}
	}
	
	
	/**
	 * search car order.
	 * @param query
	 * @return
	 */
	@RequestMapping("/v/w/carOrder/search.do")
	@ResponseBody
	public String searchCarOrder(CarOrderQuery query){
		Result result = new Result();
		if(query==null){
			System.err.print("query == null !!!!!!");
			query = new CarOrderQuery();
		}
		
		System.out.println(query.getTravelGuideId()+"-carId:"+query.getCarId()+"-status:"+query.getStatus());
		
		int count = carOrderService.queryCarOrderCount(query);
		List<CarOrder> orders = carOrderService.queryCarOrder(query);
		
		HashMap<String, Object> map = new HashMap<String, Object>(4 * 15);
		
		String		 key;
		TravelGuide  guide;
		Car			 car;
		CarDegree	 carDegree;
		try{
			for(CarOrder order : orders){
				key = "guide_"+order.getTravelGuideId();
				guide = (TravelGuide) (map.containsKey(key) ? map.get(key) : travelGuideService.getTravelGuideById(order.getTravelGuideId()));
				map.put(key, guide);
				key = "car_"+order.getCarId();
				car = (Car) (map.containsKey(key) ? map.get(key) : carService.getCarById(order.getCarId()));
				map.put(key, car);
				key = "degree_"+car.getCarDegreeId();
				carDegree = (CarDegree) (map.containsKey(key) ? map.get(key) : carDegreeService.getCarDegreeById(Integer.valueOf(car.getCarDegreeId())));
				map.put(key, carDegree);
				
				order.setGuideName(guide.getName());
				order.setDays(Math.round(guide.getDays()));
				order.setCarName(car.getName());
				order.setCarDegreeName(carDegree.getName());
			}
			result.setSuccess(true);
		}catch(Exception err){
			err.printStackTrace();
			result.setSuccess(false);
			result.setMsg("查询攻略和车辆信息时出错了");
		}
		result.putObject("total", count);
		result.putObject("orders", orders);
		return result.toJsonString();
	}
	
	
	
	/**
	 * search car order.
	 * @param query
	 * @return
	 */
	@RequestMapping("/v/carOrder/updateStatus.do")
	@ResponseBody
	public String updateOrderStatus(Integer orderId, Integer gotoStatus){
		Result result = new Result();
		if(orderId == null || gotoStatus == null){
			return result.setErrorMsg("参数为空").toJsonString();
		}
		CarOrder order = carOrderService.getCarOderById(orderId);
		if(order==null){
			return result.setErrorMsg("无效的订单id").toJsonString();
		}
		if(order.getStatus()==null){
			return result.setErrorMsg("查询的订单的状态无效").toJsonString();
		}
		System.out.println("order status = " + order.getStatus());
		switch(order.getStatus()){
			case 1:
				if(gotoStatus==2){
					order.setStatus(gotoStatus);
					boolean flag = carOrderService.updateCarOrder(order);
					result.setSuccess(flag);
					result.setMsg(flag?"操作成功":"操作失败");
					return result.toJsonString();
				}else{
					return result.setErrorMsg("不可以进行该操作").toJsonString();
				}
			case 2:
				if(gotoStatus==3 || gotoStatus==4){
					order.setStatus(gotoStatus);
					boolean flag = carOrderService.updateCarOrder(order);
					result.setSuccess(flag);
					result.setMsg(flag?"操作成功":"操作失败");
					return result.toJsonString();
				}else{
					return result.setErrorMsg("不可以进行该操作").toJsonString();
				}
			case 3:
				return result.setErrorMsg("该状态下不可以人为操作").toJsonString();
			case 4:
				if(gotoStatus==5 || gotoStatus==6){
					order.setStatus(gotoStatus);
					boolean flag = carOrderService.updateCarOrder(order);
					result.setSuccess(flag);
					result.setMsg(flag?"操作成功":"操作失败");
					return result.toJsonString();
				}else{
					return result.setErrorMsg("不可以进行该操作").toJsonString();
				}
			case 5:
				return result.setErrorMsg("该状态下不可以人为操作").toJsonString();
			case 6:
				return result.setErrorMsg("该状态下不可以人为操作").toJsonString();
			case 7:
				if(gotoStatus==8){
					order.setStatus(gotoStatus);
					boolean flag = carOrderService.updateCarOrder(order);
					result.setSuccess(flag);
					result.setMsg(flag?"操作成功":"操作失败");
					return result.toJsonString();
				}else{
					return result.setErrorMsg("不可以进行该操作").toJsonString();
				}
			case 8:
				return result.setErrorMsg("该状态下不可以人为操作").toJsonString();
			case 9:
				return result.setErrorMsg("该状态下不可以人为操作").toJsonString();
			default:
				return result.setErrorMsg("未识别的操作").toJsonString();
		}
	}
	
	
	/**
	 * get car order to pay. 
	 * @return
	 */
	@RequestMapping("/v/car/getOrderInfoToPay.do")
	@ResponseBody
	public String getCarOrderInfoToPay(HttpSession session,Integer orderId){
		Result result = new Result();
		User user = (User) session.getAttribute(Constants.USER_INFO);
		if(user==null){
			return result.setErrorMsg("请登录！").toJsonString();
		}
		if(orderId==null){
			return result.setErrorMsg("缺少orderId参数！").toJsonString();
		}
		
		CarOrder order = carOrderService.getCarOderById(orderId);
		if(order.getUserId()!=user.getId()){
			return result.setErrorMsg("非该订单的用户不可以查看支付信息！").toJsonString();
		}
		
		TravelGuide guide =travelGuideService.getTravelGuideById(order.getTravelGuideId());
		order.setGuideName(guide.getName());
		order.setDays(Math.round(guide.getDays()));
		Car car = carService.getCarById(order.getCarId());
		order.setCarName(car.getName());
		CarDegree carDegree = carDegreeService.getCarDegreeById(Integer.valueOf(car.getCarDegreeId()));
		order.setCarDegreeName(carDegree.getName());
		
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("order", order);
		return result.toJsonString();
	}
}
