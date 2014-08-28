package com.ziteng.web.controller.car;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.Result;
import com.ziteng.entity.car.CarImage;
import com.ziteng.service.car.ICarImageService;
import com.ziteng.service.car.ICarImageService;
import com.ziteng.utils.Regex;

/**
 * car controller.
 * @author lusar
 *
 */
@Controller
public class CarImageController {

	@Autowired
	private ICarImageService carImageService;
	
	/**
	 * get all carImage info.
	 * @return
	 */
	@RequestMapping("/car/getAllCarImages.do")
	@ResponseBody
	public String getAllCarImages(){
		Result result = new Result();
		List<CarImage> cars = carImageService.getAllCarImages();
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
	@RequestMapping("/car/deleteCarImageById.do")
	@ResponseBody
	public String deleteCarImage(String carId){
		Result result = new Result();
		if(! Regex.regex(Regex.sint, carId)){
			return result.setErrorMsg("类型不正确").toJsonString();
		}
		boolean flag = carImageService.deleteCarImageById(Integer.valueOf(carId));
		result.setSuccess(flag);
		result.setMsg(flag ? "删除成功" : "删除失败");
		return result.toJsonString();
	}
	
	/**
	 * add new car.
	 * @param car
	 * @return
	 */
	@RequestMapping("/car/addCarImage.do")
	@ResponseBody
	public String addNewCarImage(CarImage carImage){
		Result result = new Result();
		boolean flag = carImageService.addCarImage(carImage);
		result.setSuccess(flag);
		result.setMsg(flag ? "创建成功" : "创建失败");
		return result.toJsonString();
	}
	
	
}
