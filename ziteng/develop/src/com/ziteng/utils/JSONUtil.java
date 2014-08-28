package com.ziteng.utils;

import net.sf.json.JSONObject;

import com.ziteng.dto.biz.UploadResult;


public class JSONUtil {   
    /***
     * 
     * 获取JSON类型
     * 判断规则
     * 判断第一个字母是否为{或[ 如果都不是则不是一个JSON格式的文本
     *         
     * @param str
     * @return
     */
    public static boolean isJSONType(String str){
        if(str==null||str.trim().equals("")){
            return false;
        }
        str = str.trim();
        final char[] strChar = str.substring(0, 1).toCharArray();
        final char firstChar = strChar[0]; 
       // LogUtils.d(JSONUtil.class, "getJSONType", " firstChar = "+firstChar);
        System.out.println("firstChar:"+firstChar);
        if(firstChar == '{'||firstChar == '['){
            return true;
        }else{
            return false;
        }
    }
    
    /**
     * 功能描述: 解析资源文件上传后的返回json串<br/> 
     * @param str
     * @return 
     * @author shixiangjian
     * 日期:2013-11-27 下午08:33:06
     */
    public static UploadResult parseUploadResponseJson(String str){
    	UploadResult rest = new UploadResult();
    	JSONObject jsonObj = JSONObject.fromObject(str);
    	String result = jsonObj.get("result").toString();
    	String name = jsonObj.get("name").toString();
    	rest.setName(name);
    	rest.setResult(result);
    	if(StringUtil.isNotBlank(result)&&result.trim().equals("success")){
    		rest.setSuccess(true);
    	}else {
    		rest.setSuccess(false);
    	}
    	return rest;
    }
    
}
