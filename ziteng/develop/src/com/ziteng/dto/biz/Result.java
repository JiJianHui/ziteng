package com.ziteng.dto.biz;

import java.util.HashMap;
import java.util.Map;

import net.sf.json.JSONObject;
/** 
 * <b>类描述：业务传输对象</b><br/>  
 * <b>@author </b>lusar<br/>  
 * <b>修改时间：</b>2013-1-18 下午02:48:14<br/> 
 * <b>修改备注：</b><br/> 
 *
 */
public class Result {
	private Boolean success;
	private String errCode="";
	private String msg="";
	private Map<String, Object> datas = new HashMap<String, Object>();
	
	public Boolean getSuccess() {
		return success;
	}
	public void setSuccess(Boolean success) {
		this.success = success;
	}
	public String getErrCode() {
		return errCode;
	}
	public void setErrCode(String errCode) {
		this.errCode = errCode;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	
	public Result setErrorMsg(String msg){
		this.msg = msg;
		this.success = false;
		return this;
	}
	
	public Map<String, Object> getDatas() {
		return datas;
	}
	public void setDatas(Map<String, Object> datas) {
		this.datas = datas;
	}
	
	/**
	 * 添加结果对象
	 * @param key
	 * @param val
	 */
	public void putObject(String key,Object val){
		datas.put(key, val);
	}
	
	/**
	 *Description : 添加结果对象MAP
	 *@param datas
	 *Datetime    : Apr 6, 2013 1:11:08 PM
	 */
	public void addMapDatas(Map<String, Object> datas){
		this.datas.putAll(datas);
	}
	/**
	 * 功能描述: 返回json串形式<br/> 
	 * @return 
	 * 日期:2013-1-16 下午02:58:24
	 */
	public String toJsonString(){
		JSONObject json = new JSONObject();
		json.put("success", this.getSuccess());
		json.put("errCode", this.getErrCode());
		json.put("msg", this.getMsg());
		json.put("datas", this.getDatas());
		return json.toString();
	}
}
