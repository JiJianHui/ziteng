package com.ziteng.dto.biz;

import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONObject;

import com.ziteng.entity.base.FlexiJsonEntity;

/**
 * flexigrid page.
 * @author lusar
 *
 */
public class FlexiGridJson {
	private Integer page;
	private Integer total;
	private List<Cell> rows;
	
	public FlexiGridJson(Integer page, Integer total, List<? extends FlexiJsonEntity> objList){
		this.page  = page;
		this.total = total;
		rows = new ArrayList<Cell>(objList.size());
		for(FlexiJsonEntity entity : objList){
			Cell cell = new Cell(entity);
			rows.add(cell);
		}
	}
	
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	
	public List<Cell> getRows() {
		return rows;
	}
	
	public String toJson(){
		JSONObject json = new JSONObject();
		json.put("page", page);
		json.put("total", total);
		json.put("rows", rows);
		return json.toString();
	}
	
	public class Cell{
		private Integer id;
		private Object  cell;
		
		public Cell(FlexiJsonEntity obj){
			id = obj.getId();
			cell = obj;
		}
		
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public Object getCell() {
			return cell;
		}
		public void setCell(Object cell) {
			this.cell = cell;
		}
	}
}

