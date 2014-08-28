package com.ziteng.web.controller.area;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ziteng.common.Constants;
import com.ziteng.dto.biz.Result;
import com.ziteng.dto.query.area.RatioQuery;
import com.ziteng.entity.area.Area;
import com.ziteng.entity.area.Ratio;
import com.ziteng.service.area.IAreaService;
import com.ziteng.service.area.IRatioService;
import com.ziteng.utils.DateUtils;

/**
 * ratio controller.
 * @author lusar
 *
 */
@Controller
public class RatioController {
	
	@Autowired
	private IRatioService ratioService;
	
	@Autowired
	private IAreaService areaService;
	
	/**
	 * get all ratio
	 * @return
	 */
	@RequestMapping("/ratio/getAllRatios.do")
	@ResponseBody
	public String getAllRatio(){
		Result result = new Result();
		List<Ratio> ratios = ratioService.getAll();
		List<Area> areas = areaService.getAll();
		
		for(Ratio ratio : ratios){//find name.
			for(Area area:areas){
				if(area.getId() == ratio.getAreaId()){
					ratio.setAreaName(area.getName());
					break;
				}
			}
		}
		result.setSuccess(true);
		result.putObject("total", ratios.size());
		result.putObject("ratios", ratios);
		return result.toJsonString();
	}
	
	/**
	 * query ratio by year | month.
	 * @param year
	 * @param month
	 * @return
	 */
	@RequestMapping("/ratio/queryRatioByDate.do")
	@ResponseBody
	public String queryRatioByYearOrMonth(Integer year, Integer month){
		Result result = new Result();
		Calendar ca = Calendar.getInstance();
		if(year==null){
			year = ca.get(Calendar.YEAR);
		}
		if(month==null){
			month = ca.get(Calendar.MONTH) + 1;	
		}
		
		ca.set(Calendar.YEAR, year);
		ca.set(Calendar.MONTH, month-1);
		
		RatioQuery query = new RatioQuery();
		query.setYear(year);
		query.setMonth(month);
		query.isUsePagination(false);
		query.setSortname("date");
		query.setSortorder("asc");
		List<Ratio> ratios = ratioService.queryRatio(query);
		List<Area> areas = areaService.getAll();
		List<List<Ratio>> areasRatio = new ArrayList<List<Ratio>>(0);
		for(Area area:areas){
			List<Ratio> list = new ArrayList<Ratio>();
			for(Ratio ratio : ratios){//find name.
				if(area.getId() == ratio.getAreaId()){
					ratio.setAreaName(area.getName());
					list.add(ratio);
				}
			}
			if(list.isEmpty()){		//if the area's ratio has not setting, then we set default value for it.
				int days = ca.getActualMaximum(Calendar.DATE);
				for(int i = 1; i <= days; i++){
					Ratio ratio = new Ratio();
					ratio.setAreaId(area.getId());
					ratio.setRatio(Constants.DEFAULT_RATIO);
					ratio.setDate(DateUtils.yyyyMMdd2Date(String.format("%d%02d%02d", year, month, i)));
					ratio.setCreateTime(new Date());
					ratio.setEditTime(new Date());
					list.add(ratio);
				}
				ratioService.insertBatch(list);
			}
			areasRatio.add(list);
		}
		
		result.setSuccess(true);
		result.putObject("pageNo", query.getPageNo());
		result.putObject("pageSize", query.getPageSize());
		result.putObject("total", ratios.size());
		result.putObject("areaRatios", areasRatio);
		return result.toJsonString();
	}
	
	/**
	 * query ratio.
	 * @param query
	 * @return
	 */
	@RequestMapping("/ratio/queryRatio.do")
	@ResponseBody
	public String queryRatio(RatioQuery query){
		Result result = new Result();
		int count = ratioService.queryRatioCount(query);
		List<Ratio> ratios = ratioService.queryRatio(query);
		result.setSuccess(true);
		result.putObject("pageNo", query.getPageNo());
		result.putObject("pageSize", query.getPageSize());
		result.putObject("total", count);
		result.putObject("ratios", ratios);
		return result.toJsonString();
	}
	
	
	/**
	 * delete ratio by id.
	 * @param areaId
	 * @return
	 */
	@RequestMapping("/v/w/ratio/updateRatio.do")
	@ResponseBody
	public String updateRatio(Integer ratioId,Float ratio){
		Result result= new Result();
		if(ratioId == null){
			return result.setErrorMsg("缺少修改系数的id").toJsonString();
		}
		if(ratio == null){
			return result.setErrorMsg("缺少修改系数值").toJsonString();
		}
		Ratio updateRatio = new Ratio();
		updateRatio.setId(ratioId);
		updateRatio.setRatio(ratio);
		boolean flag = ratioService.updateRatio(updateRatio);
		result.setSuccess(flag);
		result.setMsg(flag ? "修改成功" : "修改失败");
		return result.toJsonString();
	}
}
