package com.ziteng.web.controller.travelGuide;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.entity.travelGuide.PriceWay;
import com.ziteng.service.travelGuide.IPriceWayService;
import com.ziteng.utils.Regex;

/**
 * car controller.
 * @author gyb
 *
 */
@Controller
public class PriceWayController {

	@Autowired
	private IPriceWayService priceWayService;
	
	/**
	 * get all priceWay info.
	 * @return
	 */
	@RequestMapping("/priceWay/getAllPriceWays.do")
	@ResponseBody
	public String getAllPriceWays(){
		Result result = new Result();
		List<PriceWay> cars = priceWayService.getAllPriceWays();
		result.setSuccess(true);
		result.setMsg("查询成功");
		result.putObject("total", cars.size());
		result.putObject("cars", cars);
		return result.toJsonString();
	}
    
	/**
	 * delete car by id.
	 * @param carId
	 * @return
	 */
	@RequestMapping("/car/deletePriceWayById.do")
	@ResponseBody
	public String deletePriceWay(String carId){
		Result result = new Result();
		if(! Regex.regex(Regex.sint, carId)){
			return result.setErrorMsg("类型不正确").toJsonString();
		}
		boolean flag = priceWayService.deletePriceWayById(Integer.valueOf(carId));
		result.setSuccess(flag);
		result.setMsg(flag ? "删除成功" : "删除失败");
		return result.toJsonString();
	}
	
	/**
	 * add new car.
	 * @param car
	 * @return
	 */
	@RequestMapping("/car/addPriceWay.do")
	@ResponseBody
	public String addNewPriceWay(PriceWay car){
		Result result = new Result();
		boolean flag = priceWayService.addPriceWay(car);
		result.setSuccess(flag);
		result.setMsg(flag ? "创建成功" : "创建失败");
		return result.toJsonString();
	}
	
	
}
