package com.ziteng.web.controller.car;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.FlexiGridJson;
import com.ziteng.dto.biz.Result;
import com.ziteng.entity.car.Car;
import com.ziteng.entity.car.CarDegree;
import com.ziteng.service.car.ICarDegreeService;
import com.ziteng.service.car.ICarService;
import com.ziteng.utils.Regex;

/**
 * car degree controller
 * @author lusar
 *
 */
@Controller
public class CarDegreeController {
	@Autowired
	private ICarDegreeService carDegreeService;
	@Autowired
	private ICarService carServcie;
	
	/**
	 * get all car degree info.
	 * @return
	 */
	@RequestMapping("/car/getAllCarDegrees.do")
	@ResponseBody
	public String getAllCarDegrees(){
		Result result = new Result();
		List<CarDegree> carDegrees = carDegreeService.getAllCarDegrees();
		result.setSuccess(true);
		result.putObject("total", carDegrees.size());
		result.putObject("carDegrees", carDegrees);
		return result.toJsonString(); 
	}
	
	/**
	 * 
	 * @return
	 */
	@RequestMapping("/car/getAllCarDegreesAndCars.do")
	@ResponseBody
	public String getAllCarDegreesAndCars(){
		Result result = new Result();
		List<CarDegree> carDegrees = carDegreeService.getAllCarDegrees();
		List<Car> cars = carServcie.getAllCars();
		System.out.println("car size = " + cars.size());
		for(CarDegree carDegree : carDegrees){
			System.out.println("car degree id = " + carDegree.getId());
			for(Car car:cars){
				System.out.println("car id = " + car.getCarDegreeId());
				if(Integer.valueOf(car.getCarDegreeId())==carDegree.getId()){
					System.out.println("find ok " + car.getId());
					carDegree.addCar(car);
				}
			}
		}
		result.setSuccess(true);
		result.putObject("total", carDegrees.size());
		result.putObject("carDegrees", carDegrees);
		return result.toJsonString(); 
	}
	
	/**
	 * get all car degree info.
	 * @return
	 */
	@RequestMapping("/car/getAllCarDegreesForFlexi.do")
	@ResponseBody
	public String getAllCarDegreesForFlexi(){
		List<CarDegree> carDegrees = carDegreeService.getAllCarDegrees();
		FlexiGridJson flexigrid = new FlexiGridJson(1,carDegrees.size(), carDegrees);
		return flexigrid.toJson(); 
	}
    
	/**
	 * delete car degree by id.
	 * @param carId
	 * @return
	 */
	@RequestMapping("/v/w/car/deleteCarDegreeById.do")
	@ResponseBody
	public String deleteCarDegreeById(String carId){
		Result result = new Result();
		if(! Regex.regex(Regex.sint, carId)){
			return result.setErrorMsg("类型不正确").toJsonString();
		}
		CarDegree carDegree=new CarDegree();
		carDegree.setId(Integer.valueOf(carId));
		boolean flag = carDegreeService.deleteCarDegree(carDegree);
		result.setSuccess(flag);
		result.setMsg(flag ? "删除成功" : "删除失败");
		return result.toJsonString();
	}
	
	/**
	 * add new car degree.
	 * @param car
	 * @return
	 */
	@RequestMapping("/v/w/car/addCarDegree.do")
	@ResponseBody
	public String addNewCar(CarDegree carDegree){
		Result result = new Result();
		boolean flag = carDegreeService.addCarDegree(carDegree);
		result.setSuccess(flag);
		result.setMsg(flag ? "创建成功" : "创建失败");
		return result.toJsonString();
	}
}
