package com.ziteng.web.controller.area;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.dto.biz.FlexiGridJson;
import com.ziteng.dto.biz.Result;
import com.ziteng.entity.area.Area;
import com.ziteng.service.area.IAreaService;
import com.ziteng.utils.Regex;

/**
 * 
 * area controller
 * @author lusar
 *
 */
@Controller
public class AreaController {
	
	@Autowired
	private IAreaService areaService;
	
	/**
	 * get all areas
	 * @return
	 */
	@RequestMapping("/area/getAllAreas.do")
	@ResponseBody
	public String getAllAreas(){
		Result result = new Result();
		List<Area> areas = areaService.getAll();
		result.setSuccess(true);
		result.putObject("total", areas);
		result.putObject("areas", areas);
		return result.toJsonString();
	}
	
	/**
	 * get all areas
	 * @return
	 */
	@RequestMapping("/area/getAllAreasForFlexi.do")
	@ResponseBody
	public String getAllAreasForFlexi(){
		List<Area> areas = areaService.getAll();
		FlexiGridJson flexigrid = new FlexiGridJson(1,areas.size(), areas);
		return flexigrid.toJson();
	}
	
	/**
	 * delete area by id.
	 * @param areaId
	 * @return
	 */
	@RequestMapping("/v/w/area/deleteAreaById.do")
	@ResponseBody
	public String deleteAreaById(String areaId){
		Result result= new Result();
		if(! Regex.regex(Regex.sint, areaId)){
			return result.setErrorMsg("类型不正确").toJsonString();
		}
		boolean flag = areaService.deleteAreaById(Integer.valueOf(areaId));
		result.setSuccess(flag);
		result.setMsg(flag ? "删除成功" : "删除失败");
		return result.toJsonString();
	}
	
	/**
	 * add new area.
	 * @param area
	 * @return
	 */
	@RequestMapping("/v/w/area/addNewArea.do")
	@ResponseBody
	public String addNewArea(Area area){
		Result result = new Result();
		boolean flag = areaService.addArea(area);
		result.setSuccess(flag);
		result.setMsg(flag ? "创建成功" : "创建失败");
		return result.toJsonString();
	}
	
}
